/**
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {
    BooleanWrapper,
    isArray,
    isBlank,
    isPresent,
    ListWrapper,
    MapWrapper,
    print,
    shiftLeft,
    StringJoiner
} from '@aribaui/core';
import {KeyData, MatchValue, Meta, PropertyManager, PropertyMap, RuleSet} from './meta';


/**
 * A Selector defines a sort of key/value predicate that must be satisfied for a
 * rule to apply.
 */
export class Selector
{

    private _matchArrayIdx: number = 0;
    private _matchValue: MatchValue;


    static fromMap(values: Map <string, any>): Array<Selector>
    {
        const result = new Array<Selector>();
        MapWrapper.iterable(values).forEach((value, key) =>
        {
            result.push(new Selector(key, value, false));
        });
        return result;
    }


    constructor(private _key: string, private _value: any, public isDecl: boolean = false)
    {
    }


    get key(): string
    {
        return this._key;
    }

    get value(): any
    {
        return this._value;
    }

    bindToKeyData(keyData: KeyData): void
    {
        this._matchArrayIdx = keyData._id;
        this._matchValue = keyData.matchValue(this._value);

    }

    matches(matchArray: Array<MatchValue>): boolean
    {
        // If we haven't been initialized with a matchValue, then we were indexed and don't need to
        // match
        if (isBlank(this._matchValue)) {
            return true;
        }


        const other: MatchValue = matchArray[this._matchArrayIdx];

        return isPresent(other) ? other.matches(this._matchValue) : false;
    }


    toString(): string
    {
        const sj = new StringJoiner([]);

        sj.add(this.key);
        sj.add('=');
        sj.add(this._value.toString());
        sj.add('(');
        sj.add(this.isDecl + '');
        sj.add(')');
        sj.add('[ ');
        sj.add(this._matchArrayIdx + ']');

        return sj.toString();
    }
}


/**
 * A Rule defines a map of properties that should apply in the event that a set of Selectors
 * are matched.  Given a rule base (Meta) and a set of asserted values (Context) a list of matching
 * rules can be computed (by matching their selectors against the values) and by successively (in
 * rank / priority order) applying (merging) their property maps a set of effective properties can
 * be computed.
 *
 */

export class Rule
{
    private _id: number;
    private _ruleSet: RuleSet;

    keyMatchesMask: number = 0;
    keyIndexedMask: number = 0;
    keyAntiMask: number = 0;

    static  merge(meta: Meta, src: Map<string, any>, dest: Map<string, any>,
                  declareKey: string): number
    {
        let updatedMask = 0;

        MapWrapper.iterable(src).forEach((value, key) =>
        {
            const propManager: PropertyManager = meta.managerForProperty(
                key);
            const orig = dest.get(key);
            const isDeclare: boolean = (isPresent(declareKey) && key === declareKey);
            const newVal = propManager.mergeProperty(key, orig, value, isDeclare);

            if (newVal !== orig) {
                dest.set(key, newVal);
                const keyData: KeyData = propManager._keyDataToSet;

                if (isPresent(keyData)) {
                    const keymask: number = shiftLeft(1, keyData._id);

                    if ((keymask & updatedMask) === 0 &&
                        (dest instanceof PropertyMap)) {
                        updatedMask |= keymask;
                        (<PropertyMap>dest).addContextKey(
                            propManager);
                    }
                }
            }
        });
        return updatedMask;
    }

    constructor(public _selectors: Array<Selector>, private _properties?: Map<string, any>,
                private _rank: number = -1,
                private _lineNumber: number = -1)
    {

    }


    matches(matchArray: Array<MatchValue>): boolean
    {
        for (let sel of this._selectors) {
            if (!sel.matches(matchArray)) {
                return false;
            }
        }
        return true;
    }

    /**
     * returns context keys modified
     */
    apply(meta: Meta, properties: PropertyMap, declareKey: string): number
    {
        if (this._rank === Number.MIN_VALUE) {
            return 0;
        }
        return Rule.merge(meta, this._properties, properties, declareKey);
    }

    disable(): void
    {
        this._rank = Number.MIN_VALUE;
    }

    disabled(): boolean
    {
        return this._rank === Number.MIN_VALUE;
    }

    get lineNumber(): number
    {
        return this._lineNumber;
    }

    set lineNumber(lineNumber)
    {
        this._lineNumber = lineNumber;
    }


    location(): string
    {
        let path: string = isPresent(this._ruleSet) ? this._ruleSet.filePath : 'Unknow';
        return (this._lineNumber >= 0 ) ? (new StringJoiner([
                path, ':', this._lineNumber + ''
            ])).toString() : path;
    }


    get selectors(): Array<Selector>
    {
        return this._selectors;
    }

    set selectors(value: Array<Selector>)
    {
        this._selectors = value;
    }

    get properties(): Map<string, any>
    {
        return this._properties;
    }

    set properties(value: Map<string, any>)
    {
        this._properties = value;
    }

    get rank(): number
    {
        return this._rank;
    }


    set rank(value: number)
    {
        this._rank = value;
    }

    get ruleSet(): RuleSet
    {
        return this._ruleSet;
    }


    set ruleSet(value: RuleSet)
    {
        this._ruleSet = value;
    }

    get id(): number
    {
        return this._id;
    }

    set id(value: number)
    {
        this._id = value;
    }

    isEditable(): boolean
    {
        return (this._ruleSet !== null) && (this._ruleSet.editableStart > 0) &&
            (this._id >= this._ruleSet.editableStart);
    }

    createDecl(): Rule
    {
        /*
         @field=dyno { value:${ some expr} } becomes
         declare { field:dyno }
         field=dyno { field:dyno; value:${ some expr} }
         */
        // add rule for declaration

        let selectors: Array<Selector> = this._selectors;
        let declPred: Selector = selectors[selectors.length - 1];
        let prePreds: Array<Selector> = this.convertKeyOverrides(
            selectors.slice(0, selectors.length - 1));

        if (isBlank(this._properties)) {
            this._properties = new Map<string, any>();
        }
        for (let p of selectors) {
            if (!(isArray(p.value))) {
                this._properties.set(p.key, p.value);
            }
        }
        // Flag the declaring rule as a property
        this._properties.set(Meta.DeclRule, new RuleWrapper(this));

        // check for override scope
        let hasOverrideScope = false;
        for (let p of prePreds) {
            if (p.key === declPred.key) {
                hasOverrideScope = true;
            }
        }

        // if decl key isn't scoped, then select on no scope
        if (!hasOverrideScope) {
            let overrideKey: string = Meta.overrideKeyForKey(declPred.key);
            prePreds.unshift(new Selector(overrideKey, Meta.NullMarker));
        }

        // The decl rule...
        prePreds.push(new Selector(Meta.KeyDeclare, declPred.key));

        let m = new Map<string, any>();
        m.set(declPred.key, declPred.value);
        return new Rule(prePreds, m, 0, -1);
    }

    /**
     *  rewrite any selector of the form "layout=L1, class=c, layout=L2" to
     *  "layout_o=L1 class=c, layout=L2"
     */

    convertKeyOverrides(orig: Array<Selector>): Array<Selector>
    {

        let result = orig;
        let count: number = orig.length;
        for (let i = 0; i < count; i++) {
            let p: Selector = orig[i];
            // See if overridded by same key later in selector
            for (let j = i + 1; j < count; j++) {
                let pNext: Selector = orig[j];

                if (pNext.key === p.key) {
                    // if we're overridden, we drop ours, and replace the next collision
                    // with one with our prefix

                    // make a copy if we haven't already
                    if (result === orig) {
                        result = orig.slice(0, i);
                    }
                    p = new Selector(Meta.overrideKeyForKey(p.key), p.value);
                    break;
                }
            }
            if (result !== orig) {
                result.push(p);
            }
        }
        return result;
    }

    toString(): string
    {
        let sj = new StringJoiner(['<Rule [']);
        sj.add(this._rank + '] ');

        if (isBlank(this.selectors)) {
            sj.add('null, null --> null >');
        } else {
            sj.add(ListWrapper.toString<Selector>(this._selectors));

            sj.add(' -> ');

            if (!this._properties) {
                sj.add('[,]' + ' >');
            } else {
                if (this._properties.has('declRule')) {

                }

                sj.add(MapWrapper.toString(this._properties) + ' >');
            }

            sj.add('[ ');
            sj.add(this.keyIndexedMask + ', ');
            sj.add(this.keyAntiMask + ', ');
            sj.add(this.keyMatchesMask + '');
            sj.add(' ]');

        }


        return sj.toString();
    }

    _checkRule(values: Map<string, any>, meta: Meta): void
    {
        ListWrapper.forEachWithIndex<Selector>(this.selectors, (p, i) =>
        {
            let contextValue = values.get(p.key);
            let keyData: KeyData = meta.keyData(p.key);

            if (isPresent(keyData._transformer)) {
                contextValue = keyData._transformer.tranformForMatch(contextValue);
            }

            if (isPresent(contextValue) &&
                ((Meta.KeyAny === p.value && BooleanWrapper.boleanValue(contextValue) ||
                Meta.objectEquals(contextValue, p.value) ||
                (isArray(p.value) && p.value.indexOf(contextValue) > -1) ||
                (isArray(p.value) && contextValue.indexOf(p.value) > -1 )))) {
                // okay
            } else {
                print('Possible bad rule match!  Rule: %s; selector: %s, context val: %s' + this +
                    ' ' + p + ' ' + contextValue);
            }
        });
    }


}

// here so logging of property map doesn't infinitely recurse
export class RuleWrapper
{


    constructor(public rule: Rule)
    {
    }
}



