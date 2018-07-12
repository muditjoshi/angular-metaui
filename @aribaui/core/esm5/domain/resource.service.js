/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
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
 *
 *
 */
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isEntity, isValue } from './domain-model';
import { AppConfig } from '../config/app-config';
import { ActionSegment, ContextSegment, HostSegment, IdentifierSegment, OfParentSegment, ResourceSegment, RestAction, RestSegmentType } from './url/segment';
import { DefaultRestBuilder } from './url/builder';
import { RestUrlGroup } from './url/url-group';
import { assert, isArray, isBlank, isDate, isPresent } from '../utils/lang';
/**
 * Response is the generic wrapper interface encapsulating a response from the micro service.
 * Currently we have only body field, but later on we need to extend it for different notifications,
 * errors, paging information and much more.
 *
 *
 *
 * @record
 * @template T
 */
export function Response() { }
function Response_tsickle_Closure_declarations() {
    /** @type {?} */
    Response.prototype.payload;
}
/**
 *
 * To simplify work with current HttpClient the Resource provides fluent API on top of it. You dont
 * assemble URL traditional way rather more fluent and functional way, working with real data types
 * such a Value and Entity.
 *
 * Entity and Value are two main key interfaces that all domain objects should inherit from if they
 * want to leverage this functionality.
 *
 * ###Example
 *
 * 1.  to simply assemble following URL http://api.ariba.com/myService/v1/requisitions/123 and
 *  and fetch Requisition data:
 *
 * ```ts
 *  let r: Resource
 *
 *  r.load()
 *   .resource(Requisition)
 *   .withId('123')
 *   .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 * ```
 * You you can simply read it: load resource Requisition with ID 123 and return this as Entity
 *
 * 2. Current fluent API also support partial updates and subcontext resource
 *  to load data from this REST API endpoint
 *      http://api.ariba.com/myService/v1/requisitions/123/suppliers
 * ```ts
 *  let r: Resource
 *
 *  r.load()
 *   .resource(Supplier)
 *   .of
 *   .resource(Requisition)
 *   .withId('123')
 *   .asEntity<Supplier>((r:  Supplier[]) => receivedR = r);
 *
 * ```
 *
 *  You can read above: Load all from resource Supplier of Requisition (or supplier belongs to
 *  Requisition)  with ID 123 and return this as Entity.
 *
 *
 * 3. To save data you follow the same syntax
 *      Save requisition so we are PUTting data to following URL
 *      http://api.ariba.com/myService/v1/requisitions/123
 *
 * ```ts
 *  let r: Resource
 *
 *          r
 *        .save()
 *        .resource(Requisition)
 *        .withId('123')
 *        .withData(pr)
 *        .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 *
 * ```
 *
 *  You can read above: Save resource Requisition with ID 123 and with Data .... and return it as
 *  a Entity
 *
 *
 *  4. API can also for you assemble and execute actions sometimes called interaction. Not all is
 *  about CRUD. Our current syntax for actions is
 *
 *                       http://api.ariba.com/myService/v1/requisitions/123/actions/approve
 *
 * ```ts
 *  let r: Resource
 *
 *        r
 *        .do('approve')
 *        .resource(Requisition)
 *        .withId('123')
 *        .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 *
 * ```
 *
 * To make it easily extensible they are 3 main pieces
 *  - Resource: This class just put together abstract structure URLSegment
 *  - URLSegments: More like AST style to assemble the URL
 *  - builder: that read this AST to assemble the URL
 *
 *
 * Later on we might want to expose builder as a provider and you can have your own implementation
 *
 *
 *
 *
 */
var Resource = /** @class */ (function () {
    function Resource(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    /**
     * Identifies GET operation
     *
     */
    /**
     * Identifies GET operation
     *
     * @return {?}
     */
    Resource.prototype.load = /**
     * Identifies GET operation
     *
     * @return {?}
     */
    function () {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Load));
        return this;
    };
    /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     */
    /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     * @return {?}
     */
    Resource.prototype.save = /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     * @return {?}
     */
    function () {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Save));
        return this;
    };
    /**
     * Identifies interaction. For this we use POST
     *
     */
    /**
     * Identifies interaction. For this we use POST
     *
     * @param {?} action
     * @return {?}
     */
    Resource.prototype.do = /**
     * Identifies interaction. For this we use POST
     *
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Do, action));
        return this;
    };
    /**
     *
     * TODO: Since query API is not yet implemented on the server side => TBD
     *
     * There where should be able to accepts individual query grammar. Similar style like rxjs
     * operators.
     *
     *  e.g.: Resource.prototype.contains = ....
     *        Resource.prototype.eq = ....
     *
     * You should be able to add dynamically let;s call it QuerySpecification
     *
     *      res
     *      .query()
     *      .resource(Requsition)
     *      .where( contains<string>(reqEntity.title(), '*asdf*' )
     *
     *  so it could look like something like:
     *
     *
     *  contains<T>(title: string, value: T): T
     *
     *  But since all these Specification would have a way to translate this key|value to the
     *  query so the where, would just list all the specification to bulid
     *  the query
     *
     *
     */
    /**
     *
     * TODO: Since query API is not yet implemented on the server side => TBD
     *
     * There where should be able to accepts individual query grammar. Similar style like rxjs
     * operators.
     *
     *  e.g.: Resource.prototype.contains = ....
     *        Resource.prototype.eq = ....
     *
     * You should be able to add dynamically let;s call it QuerySpecification
     *
     *      res
     *      .query()
     *      .resource(Requsition)
     *      .where( contains<string>(reqEntity.title(), '*asdf*' )
     *
     *  so it could look like something like:
     *
     *
     *  contains<T>(title: string, value: T): T
     *
     *  But since all these Specification would have a way to translate this key|value to the
     *  query so the where, would just list all the specification to bulid
     *  the query
     *
     *
     * @return {?}
     */
    Resource.prototype.query = /**
     *
     * TODO: Since query API is not yet implemented on the server side => TBD
     *
     * There where should be able to accepts individual query grammar. Similar style like rxjs
     * operators.
     *
     *  e.g.: Resource.prototype.contains = ....
     *        Resource.prototype.eq = ....
     *
     * You should be able to add dynamically let;s call it QuerySpecification
     *
     *      res
     *      .query()
     *      .resource(Requsition)
     *      .where( contains<string>(reqEntity.title(), '*asdf*' )
     *
     *  so it could look like something like:
     *
     *
     *  contains<T>(title: string, value: T): T
     *
     *  But since all these Specification would have a way to translate this key|value to the
     *  query so the where, would just list all the specification to bulid
     *  the query
     *
     *
     * @return {?}
     */
    function () {
        this.init();
        throw new Error('Not implemented');
    };
    /**
     * @return {?}
     */
    Resource.prototype.where = /**
     * @return {?}
     */
    function () {
        this.init();
        throw new Error('Not implemented');
    };
    /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     */
    /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    Resource.prototype.resource = /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    function (type) {
        this.urlGroup.push(new ResourceSegment(type));
        return this;
    };
    /**
     * Identifier IdentifierSegment
     *
     */
    /**
     * Identifier IdentifierSegment
     *
     * @param {?} identifier
     * @return {?}
     */
    Resource.prototype.withId = /**
     * Identifier IdentifierSegment
     *
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        this.urlGroup.push(new IdentifierSegment(identifier));
        return this;
    };
    /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     */
    /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     * @template T
     * @param {?} data
     * @return {?}
     */
    Resource.prototype.withData = /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     * @template T
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ urlSegment = this.urlGroup.lookup(RestSegmentType.Action);
        var /** @type {?} */ isSave = (/** @type {?} */ (urlSegment)).actionType === RestAction.Save;
        assert(isSave, 'withData can be used with SAVE operation only!');
        (/** @type {?} */ (urlSegment)).data = data;
        return this;
    };
    Object.defineProperty(Resource.prototype, "of", {
        /**
         * OF is just a syntactic suggar for better readability and to easier work with sub resources.
         * using OF we are able to tell that some resource belongs to other resource
         *
         */
        get: /**
         * OF is just a syntactic suggar for better readability and to easier work with sub resources.
         * using OF we are able to tell that some resource belongs to other resource
         *
         * @return {?}
         */
        function () {
            this.urlGroup.push(new OfParentSegment());
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * Once tell what you want this is the last call you want to make to return resources as actual
     * Entities or Values.
     *
     * Todo: Maybe rename a method name as we can return both Entity and Value.
     *
     * You have also option to insert HttpOption
     *
     */
    /**
     *
     * Once tell what you want this is the last call you want to make to return resources as actual
     * Entities or Values.
     *
     * Todo: Maybe rename a method name as we can return both Entity and Value.
     *
     * You have also option to insert HttpOption
     *
     * @template T
     * @param {?} subscriber
     * @param {?=} options
     * @return {?}
     */
    Resource.prototype.asEntity = /**
     *
     * Once tell what you want this is the last call you want to make to return resources as actual
     * Entities or Values.
     *
     * Todo: Maybe rename a method name as we can return both Entity and Value.
     *
     * You have also option to insert HttpOption
     *
     * @template T
     * @param {?} subscriber
     * @param {?=} options
     * @return {?}
     */
    function (subscriber, options) {
        var _this = this;
        if (options === void 0) { options = { observe: 'body' }; }
        var /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        var /** @type {?} */ observable;
        var /** @type {?} */ actionType = segment.value;
        switch (actionType) {
            case RestAction.Load:
                observable = this.http.get(this.url, options);
                break;
            case RestAction.Do:
                observable = this.http.post(this.url, {}, options);
                break;
            case RestAction.Save:
                // we dont have right now other usecase subcontext resource will be always some
                // array
                if (isEntity(segment.data)) {
                    if (isBlank((/** @type {?} */ (segment.data)).identity())) {
                        observable = this.http.post(this.url, segment.data, options);
                    }
                    else {
                        observable = this.http.put(this.url, segment.data, options);
                    }
                }
                else if (isValue(segment.data)) {
                    // we expect value will be always pushed
                    observable = this.http.put(this.url, segment.data, options);
                }
                break;
        }
        return observable.pipe(map(function (res) { return _this.convertToComposite(res, true, false); })).subscribe(subscriber);
    };
    /**
     * @template T
     * @param {?} subscriber
     * @param {?=} error
     * @param {?=} options
     * @return {?}
     */
    Resource.prototype.asHttpResponse = /**
     * @template T
     * @param {?} subscriber
     * @param {?=} error
     * @param {?=} options
     * @return {?}
     */
    function (subscriber, error, options) {
        var _this = this;
        if (options === void 0) { options = { observe: 'response' }; }
        var /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        var /** @type {?} */ observable;
        var /** @type {?} */ actionType = segment.value;
        switch (actionType) {
            case RestAction.Load:
                observable = this.http.get(this.url, options);
                break;
            case RestAction.Do:
                observable = this.http.post(this.url, {}, options);
                break;
            case RestAction.Save:
                // we dont have right now other usecase subcontext resource will be always some
                // array
                if (isEntity(segment.data)) {
                    if (isBlank((/** @type {?} */ (segment.data)).identity())) {
                        observable = this.http.post(this.url, segment.data, options);
                    }
                    else {
                        observable = this.http.put(this.url, segment.data, options);
                    }
                }
                else if (isValue(segment.data)) {
                    // we expect value will be always pushed
                    observable = this.http.put(this.url, segment.data, options);
                }
                break;
        }
        var /** @type {?} */ hasProgress = options.reportProgress || false;
        return observable.pipe(map(function (res) { return _this.convertToComposite(res, false, hasProgress); }))
            .subscribe(subscriber, error);
    };
    Object.defineProperty(Resource.prototype, "url", {
        /**
         *
         * Return assebled URL AST -> string
         *
         */
        get: /**
         *
         * Return assebled URL AST -> string
         *
         * @return {?}
         */
        function () {
            if (isBlank(this._url)) {
                var /** @type {?} */ isMocked = this.appConfig.getBoolean(AppConfig.ConnectionUseMockServer);
                this._url = this._urlBuilder.assembleUrl(isMocked);
            }
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "urlGroup", {
        /**
         * private
         *
         */
        get: /**
         * private
         *
         * @return {?}
         */
        function () {
            return this._urlGroup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "urlBuilder", {
        /**
         * private
         *
         */
        get: /**
         * private
         *
         * @return {?}
         */
        function () {
            return this._urlBuilder;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * private
     *
     * @return {?}
     */
    Resource.prototype.init = /**
     * private
     *
     * @return {?}
     */
    function () {
        this._urlGroup = new RestUrlGroup();
        this._urlBuilder = new DefaultRestBuilder(this._urlGroup);
        this._url = null;
        this.urlGroup.push(new HostSegment(this.appConfig.getRestApiHost()));
        this.urlGroup.push(new ContextSegment(this.appConfig.getRestApiContext()));
    };
    /**
     * Used inside .map to map JSON response or HttpResponse.body to actual type
     *
     * @template T
     * @param {?} res
     * @param {?} isComposite
     * @param {?} hasProgress
     * @return {?}
     */
    Resource.prototype.convertToComposite = /**
     * Used inside .map to map JSON response or HttpResponse.body to actual type
     *
     * @template T
     * @param {?} res
     * @param {?} isComposite
     * @param {?} hasProgress
     * @return {?}
     */
    function (res, isComposite, hasProgress) {
        if (hasProgress) {
            return res;
        }
        // unsorted segments will have have our target resource as first one
        var /** @type {?} */ sgm = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Resource));
        if (isComposite) {
            return this.deserialize((/** @type {?} */ (res)).payload, sgm.value);
        }
        else {
            var /** @type {?} */ httpRes = /** @type {?} */ (res);
            var /** @type {?} */ myResp = {
                payload: this.deserialize(httpRes.body.payload, sgm.value)
            };
            return httpRes.clone({ body: myResp });
        }
    };
    /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    Resource.prototype.serialize = /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return JSON.stringify(data);
    };
    /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     */
    /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     * @param {?} json
     * @param {?} clazz
     * @return {?}
     */
    Resource.prototype.deserialize = /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     * @param {?} json
     * @param {?} clazz
     * @return {?}
     */
    function (json, clazz) {
        if (isArray(json)) {
            var /** @type {?} */ instances = [];
            for (var /** @type {?} */ item in json) {
                instances.push(this.deserialize(json[item], clazz));
            }
            return instances;
        }
        else {
            var /** @type {?} */ instance = void 0;
            if (clazz === String) {
                instance = json.toString();
            }
            else if (clazz === Number) {
                instance = json;
            }
            else if (clazz === Boolean) {
                instance = json;
            }
            else {
                instance = new clazz();
                var /** @type {?} */ types = instance.getTypes();
                for (var /** @type {?} */ prop in json) {
                    if (!json.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (isPresent(types[prop]) && isPresent(json[prop]) && types[prop] !== Date) {
                        instance[prop] = this.deserialize(json[prop], types[prop]);
                    }
                    else if (isDate(types[prop])) {
                        instance[prop] = new types[prop](json[prop]);
                    }
                    else {
                        instance[prop] = json[prop];
                    }
                    // else if (isString(json[prop]) && isEntity(instance)
                    //     && prop === (<Entity>instance).identity()) {
                    //
                    //     const idString = (<Entity>instance).identity();
                    //     (<any>instance)[idString] = <string>json[prop];
                    //
                    // }
                }
            }
            return instance;
        }
    };
    Resource.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Resource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AppConfig }
    ]; };
    return Resource;
}());
export { Resource };
function Resource_tsickle_Closure_declarations() {
    /**
     * RestUrlGroup aggregates UrlSegments
     *
     * @type {?}
     */
    Resource.prototype._urlGroup;
    /**
     * Once all URL are assembled the builder returns final URL to be used for the HttpClient
     * @type {?}
     */
    Resource.prototype._urlBuilder;
    /**
     * Cached url, so we dont have to assemble this everytime somebody calls url
     * @type {?}
     */
    Resource.prototype._url;
    /** @type {?} */
    Resource.prototype.http;
    /** @type {?} */
    Resource.prototype.appConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJkb21haW4vcmVzb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE9BQU8sRUFBQyxVQUFVLEVBQU8sTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUNILFVBQVUsRUFNYixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBUyxRQUFRLEVBQUUsT0FBTyxFQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFDSCxhQUFhLEVBQ2IsY0FBYyxFQUNkLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGVBQWUsRUFDZixVQUFVLEVBQ1YsZUFBZSxFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtSXRFLGtCQUFvQixJQUFnQixFQUFVLFNBQW9CO1FBQTlDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO0tBQ2pFO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx1QkFBSTs7Ozs7SUFBSjtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjtJQUdEOzs7O09BSUc7Ozs7Ozs7SUFDSCx1QkFBSTs7Ozs7O0lBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7SUFHRDs7O09BR0c7Ozs7Ozs7SUFDSCxxQkFBRTs7Ozs7O0lBQUYsVUFBRyxNQUFjO1FBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVosSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjtJQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNILHdCQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVosTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3RDOzs7O0lBRUQsd0JBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3RDO0lBR0Q7Ozs7T0FJRzs7Ozs7Ozs7O0lBQ0gsMkJBQVE7Ozs7Ozs7O0lBQVIsVUFBbUMsSUFBYTtRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjtJQUVEOzs7T0FHRzs7Ozs7OztJQUNILHlCQUFNOzs7Ozs7SUFBTixVQUFPLFVBQWtCO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0gsMkJBQVE7Ozs7Ozs7SUFBUixVQUFtQyxJQUFPO1FBQ3RDLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQscUJBQUksTUFBTSxHQUFHLG1CQUFnQixVQUFVLEVBQUMsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQztRQUV4RSxNQUFNLENBQUMsTUFBTSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7UUFFakUsbUJBQWdCLFVBQVUsRUFBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO0lBUUQsc0JBQUksd0JBQUU7UUFMTjs7OztXQUlHOzs7Ozs7O1FBQ0g7WUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOzs7T0FBQTtJQUdEOzs7Ozs7Ozs7T0FTRzs7Ozs7Ozs7Ozs7Ozs7O0lBQ0gsMkJBQVE7Ozs7Ozs7Ozs7Ozs7O0lBQVIsVUFBbUMsVUFBa0MsRUFDbEMsT0FPcUI7UUFSeEQsaUJBNkNDO1FBNUNrQyx3QkFBQSxFQUFBLFlBT0ssT0FBTyxFQUFFLE1BQU0sRUFBQztRQUNwRCxxQkFBSSxPQUFPLHFCQUFrQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztRQUMxRixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLG1EQUFtRCxDQUFDLENBQUM7UUFFaEYscUJBQUksVUFBMkIsQ0FBQztRQUVoQyxxQkFBSSxVQUFVLEdBQWUsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssVUFBVSxDQUFDLElBQUk7Z0JBQ2hCLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBb0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDakUsS0FBSyxDQUFDO1lBRVYsS0FBSyxVQUFVLENBQUMsRUFBRTtnQkFDZCxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQW9CLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RSxLQUFLLENBQUM7WUFFVixLQUFLLFVBQVUsQ0FBQyxJQUFJOzs7Z0JBR2hCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQVMsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQW9CLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDakUsT0FBTyxDQUFDLENBQUM7cUJBQ2hCO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBb0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUNoRSxPQUFPLENBQUMsQ0FBQztxQkFDaEI7aUJBQ0o7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFFL0IsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFvQixJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ2xGO2dCQUNELEtBQUssQ0FBQztTQUNiO1FBR0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUE2QixVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQ3JGLElBQUksRUFBRSxLQUFLLENBQUMsRUFEOEMsQ0FDOUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzVDOzs7Ozs7OztJQUdELGlDQUFjOzs7Ozs7O0lBQWQsVUFDVyxVQUE4RSxFQUM5RSxLQUEwQyxFQUMxQyxPQUl5QjtRQVBwQyxpQkE4Q0M7UUEzQ1Usd0JBQUEsRUFBQSxZQUlLLE9BQU8sRUFBRSxVQUFVLEVBQUM7UUFFaEMscUJBQUksT0FBTyxxQkFBa0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7UUFDMUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxtREFBbUQsQ0FBQyxDQUFDO1FBRWhGLHFCQUFJLFVBQTJCLENBQUM7UUFFaEMscUJBQUksVUFBVSxHQUFlLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0MsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLFVBQVUsQ0FBQyxJQUFJO2dCQUNoQixVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQW9CLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2pFLEtBQUssQ0FBQztZQUVWLEtBQUssVUFBVSxDQUFDLEVBQUU7Z0JBQ2QsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFvQixJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDdEUsS0FBSyxDQUFDO1lBRVYsS0FBSyxVQUFVLENBQUMsSUFBSTs7O2dCQUdoQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0MsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFvQixJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQ2pFLE9BQU8sQ0FBQyxDQUFDO3FCQUNoQjtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQW9CLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDaEUsT0FBTyxDQUFDLENBQUM7cUJBQ2hCO2lCQUNKO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7b0JBRS9CLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBb0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUNsRjtnQkFDRCxLQUFLLENBQUM7U0FDYjtRQUVELHFCQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQztRQUNwRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDbEIsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQWhELENBQWdELENBQUMsQ0FBQzthQUM1RCxTQUFTLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JDO0lBUUQsc0JBQUkseUJBQUc7UUFMUDs7OztXQUlHOzs7Ozs7O1FBQ0g7WUFDSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUU1RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDcEI7OztPQUFBO0lBT0Qsc0JBQUksOEJBQVE7UUFKWjs7O1dBR0c7Ozs7OztRQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDekI7OztPQUFBO0lBTUQsc0JBQUksZ0NBQVU7UUFKZDs7O1dBR0c7Ozs7OztRQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7OztPQUFBOzs7Ozs7SUFNTyx1QkFBSTs7Ozs7O1FBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFHakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFRdkUscUNBQWtCOzs7Ozs7Ozs7Y0FBMkIsR0FDbUMsRUFDbkMsV0FBb0IsRUFDcEIsV0FBb0I7UUFDckUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDZDs7UUFFRCxxQkFBSSxHQUFHLHFCQUFxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztRQUUzRixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQWMsR0FBRyxFQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUVsRTtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0oscUJBQUksT0FBTyxxQkFBOEIsR0FBRyxDQUFBLENBQUM7WUFDN0MscUJBQUksTUFBTSxHQUFnQjtnQkFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUM3RCxDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUN4Qzs7Ozs7OztJQUlMLDRCQUFTOzs7OztJQUFULFVBQWEsSUFBTztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjtJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7Ozs7SUFDSCw4QkFBVzs7Ozs7Ozs7OztJQUFYLFVBQVksSUFBUyxFQUFFLEtBQWdCO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIscUJBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNuQixHQUFHLENBQUMsQ0FBQyxxQkFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0oscUJBQUksUUFBUSxTQUFBLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUM5QjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNuQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNuQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUN2QixxQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUVoQyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsUUFBUSxDQUFDO3FCQUNaO29CQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQzFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFFOUQ7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFFaEQ7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDL0I7Ozs7Ozs7O2lCQVdKO2FBQ0o7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ25CO0tBQ0o7O2dCQS9YSixVQUFVOzs7O2dCQXRJUCxVQUFVO2dCQVFOLFNBQVM7O21CQWxDakI7O1NBaUthLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0luamVjdGFibGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LFxuICAgIEh0dHBFcnJvclJlc3BvbnNlLFxuICAgIEh0dHBIZWFkZXJzLFxuICAgIEh0dHBQYXJhbXMsXG4gICAgSHR0cFByb2dyZXNzRXZlbnQsXG4gICAgSHR0cFJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7RW50aXR5LCBpc0VudGl0eSwgaXNWYWx1ZSwgVmFsdWV9IGZyb20gJy4vZG9tYWluLW1vZGVsJztcbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIEFjdGlvblNlZ21lbnQsXG4gICAgQ29udGV4dFNlZ21lbnQsXG4gICAgSG9zdFNlZ21lbnQsXG4gICAgSWRlbnRpZmllclNlZ21lbnQsXG4gICAgT2ZQYXJlbnRTZWdtZW50LFxuICAgIFJlc291cmNlU2VnbWVudCxcbiAgICBSZXN0QWN0aW9uLFxuICAgIFJlc3RTZWdtZW50VHlwZVxufSBmcm9tICcuL3VybC9zZWdtZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVmYXVsdFJlc3RCdWlsZGVyfSBmcm9tICcuL3VybC9idWlsZGVyJztcbmltcG9ydCB7UmVzdFVybEdyb3VwfSBmcm9tICcuL3VybC91cmwtZ3JvdXAnO1xuaW1wb3J0IHthc3NlcnQsIGlzQXJyYXksIGlzQmxhbmssIGlzRGF0ZSwgaXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcblxuXG4vKipcbiAqIFJlc3BvbnNlIGlzIHRoZSBnZW5lcmljIHdyYXBwZXIgaW50ZXJmYWNlIGVuY2Fwc3VsYXRpbmcgYSByZXNwb25zZSBmcm9tIHRoZSBtaWNybyBzZXJ2aWNlLlxuICogQ3VycmVudGx5IHdlIGhhdmUgb25seSBib2R5IGZpZWxkLCBidXQgbGF0ZXIgb24gd2UgbmVlZCB0byBleHRlbmQgaXQgZm9yIGRpZmZlcmVudCBub3RpZmljYXRpb25zLFxuICogZXJyb3JzLCBwYWdpbmcgaW5mb3JtYXRpb24gYW5kIG11Y2ggbW9yZS5cbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZTxUPiB7XG4gICAgcGF5bG9hZDogVDtcbn1cblxuXG4vKipcbiAqXG4gKiBUbyBzaW1wbGlmeSB3b3JrIHdpdGggY3VycmVudCBIdHRwQ2xpZW50IHRoZSBSZXNvdXJjZSBwcm92aWRlcyBmbHVlbnQgQVBJIG9uIHRvcCBvZiBpdC4gWW91IGRvbnRcbiAqIGFzc2VtYmxlIFVSTCB0cmFkaXRpb25hbCB3YXkgcmF0aGVyIG1vcmUgZmx1ZW50IGFuZCBmdW5jdGlvbmFsIHdheSwgd29ya2luZyB3aXRoIHJlYWwgZGF0YSB0eXBlc1xuICogc3VjaCBhIFZhbHVlIGFuZCBFbnRpdHkuXG4gKlxuICogRW50aXR5IGFuZCBWYWx1ZSBhcmUgdHdvIG1haW4ga2V5IGludGVyZmFjZXMgdGhhdCBhbGwgZG9tYWluIG9iamVjdHMgc2hvdWxkIGluaGVyaXQgZnJvbSBpZiB0aGV5XG4gKiB3YW50IHRvIGxldmVyYWdlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiAjIyNFeGFtcGxlXG4gKlxuICogMS4gIHRvIHNpbXBseSBhc3NlbWJsZSBmb2xsb3dpbmcgVVJMIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzIGFuZFxuICogIGFuZCBmZXRjaCBSZXF1aXNpdGlvbiBkYXRhOlxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IHI6IFJlc291cmNlXG4gKlxuICogIHIubG9hZCgpXG4gKiAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgLndpdGhJZCgnMTIzJylcbiAqICAgLmFzRW50aXR5PFJlcXVpc2l0aW9uPigocjogUmVxdWlzaXRpb24pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqIGBgYFxuICogWW91IHlvdSBjYW4gc2ltcGx5IHJlYWQgaXQ6IGxvYWQgcmVzb3VyY2UgUmVxdWlzaXRpb24gd2l0aCBJRCAxMjMgYW5kIHJldHVybiB0aGlzIGFzIEVudGl0eVxuICpcbiAqIDIuIEN1cnJlbnQgZmx1ZW50IEFQSSBhbHNvIHN1cHBvcnQgcGFydGlhbCB1cGRhdGVzIGFuZCBzdWJjb250ZXh0IHJlc291cmNlXG4gKiAgdG8gbG9hZCBkYXRhIGZyb20gdGhpcyBSRVNUIEFQSSBlbmRwb2ludFxuICogICAgICBodHRwOi8vYXBpLmFyaWJhLmNvbS9teVNlcnZpY2UvdjEvcmVxdWlzaXRpb25zLzEyMy9zdXBwbGllcnNcblxuXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICByLmxvYWQoKVxuICogICAucmVzb3VyY2UoU3VwcGxpZXIpXG4gKiAgIC5vZlxuICogICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gKiAgIC53aXRoSWQoJzEyMycpXG4gKiAgIC5hc0VudGl0eTxTdXBwbGllcj4oKHI6ICBTdXBwbGllcltdKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKiBgYGBcbiAqXG4gKiAgWW91IGNhbiByZWFkIGFib3ZlOiBMb2FkIGFsbCBmcm9tIHJlc291cmNlIFN1cHBsaWVyIG9mIFJlcXVpc2l0aW9uIChvciBzdXBwbGllciBiZWxvbmdzIHRvXG4gKiAgUmVxdWlzaXRpb24pICB3aXRoIElEIDEyMyBhbmQgcmV0dXJuIHRoaXMgYXMgRW50aXR5LlxuICpcbiAqXG4gKiAzLiBUbyBzYXZlIGRhdGEgeW91IGZvbGxvdyB0aGUgc2FtZSBzeW50YXhcbiAqICAgICAgU2F2ZSByZXF1aXNpdGlvbiBzbyB3ZSBhcmUgUFVUdGluZyBkYXRhIHRvIGZvbGxvd2luZyBVUkxcbiAqICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjNcbiAqXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICAgICAgICAgIHJcbiAqICAgICAgICAuc2F2ZSgpXG4gKiAgICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAgICAgIC53aXRoSWQoJzEyMycpXG4gKiAgICAgICAgLndpdGhEYXRhKHByKVxuICogICAgICAgIC5hc0VudGl0eTxSZXF1aXNpdGlvbj4oKHI6IFJlcXVpc2l0aW9uKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKlxuICogYGBgXG4gKlxuICogIFlvdSBjYW4gcmVhZCBhYm92ZTogU2F2ZSByZXNvdXJjZSBSZXF1aXNpdGlvbiB3aXRoIElEIDEyMyBhbmQgd2l0aCBEYXRhIC4uLi4gYW5kIHJldHVybiBpdCBhc1xuICogIGEgRW50aXR5XG4gKlxuICpcbiAqICA0LiBBUEkgY2FuIGFsc28gZm9yIHlvdSBhc3NlbWJsZSBhbmQgZXhlY3V0ZSBhY3Rpb25zIHNvbWV0aW1lcyBjYWxsZWQgaW50ZXJhY3Rpb24uIE5vdCBhbGwgaXNcbiAqICBhYm91dCBDUlVELiBPdXIgY3VycmVudCBzeW50YXggZm9yIGFjdGlvbnMgaXNcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjMvYWN0aW9ucy9hcHByb3ZlXG4gKlxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgICAgICAgclxuICogICAgICAgIC5kbygnYXBwcm92ZScpXG4gKiAgICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAgICAgIC53aXRoSWQoJzEyMycpXG4gKiAgICAgICAgLmFzRW50aXR5PFJlcXVpc2l0aW9uPigocjogUmVxdWlzaXRpb24pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBUbyBtYWtlIGl0IGVhc2lseSBleHRlbnNpYmxlIHRoZXkgYXJlIDMgbWFpbiBwaWVjZXNcbiAqICAtIFJlc291cmNlOiBUaGlzIGNsYXNzIGp1c3QgcHV0IHRvZ2V0aGVyIGFic3RyYWN0IHN0cnVjdHVyZSBVUkxTZWdtZW50XG4gKiAgLSBVUkxTZWdtZW50czogTW9yZSBsaWtlIEFTVCBzdHlsZSB0byBhc3NlbWJsZSB0aGUgVVJMXG4gKiAgLSBidWlsZGVyOiB0aGF0IHJlYWQgdGhpcyBBU1QgdG8gYXNzZW1ibGUgdGhlIFVSTFxuICpcbiAqXG4gKiBMYXRlciBvbiB3ZSBtaWdodCB3YW50IHRvIGV4cG9zZSBidWlsZGVyIGFzIGEgcHJvdmlkZXIgYW5kIHlvdSBjYW4gaGF2ZSB5b3VyIG93biBpbXBsZW1lbnRhdGlvblxuICpcbiAqXG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc291cmNlIHtcbiAgICAvKipcbiAgICAgKiBSZXN0VXJsR3JvdXAgYWdncmVnYXRlcyBVcmxTZWdtZW50c1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXJsR3JvdXA6IFJlc3RVcmxHcm91cDtcblxuICAgIC8qKlxuICAgICAqIE9uY2UgYWxsIFVSTCBhcmUgYXNzZW1ibGVkIHRoZSBidWlsZGVyIHJldHVybnMgZmluYWwgVVJMIHRvIGJlIHVzZWQgZm9yIHRoZSBIdHRwQ2xpZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXJsQnVpbGRlcjogRGVmYXVsdFJlc3RCdWlsZGVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FjaGVkIHVybCwgc28gd2UgZG9udCBoYXZlIHRvIGFzc2VtYmxlIHRoaXMgZXZlcnl0aW1lIHNvbWVib2R5IGNhbGxzIHVybFxuICAgICAqL1xuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgYXBwQ29uZmlnOiBBcHBDb25maWcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIEdFVCBvcGVyYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGxvYWQoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IEFjdGlvblNlZ21lbnQoUmVzdEFjdGlvbi5Mb2FkKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBQVVQgb3IgUE9TVCBvcGVyYXRpb24uIERlcGVuZGluZyBvbiB0aGUgb2JqZWN0LiBJZiB0aGUgb2JqZWN0IGhhcyBhbHJlYWR5XG4gICAgICogcG9wdWxhdGVkIGl0cyBpZGVudGlmaWVyLCB0aGVuIHdlIHVzZSBQVVQsIG90aGVyd2lzZSBQT1NUXG4gICAgICpcbiAgICAgKi9cbiAgICBzYXZlKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uU2F2ZSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgaW50ZXJhY3Rpb24uIEZvciB0aGlzIHdlIHVzZSBQT1NUXG4gICAgICpcbiAgICAgKi9cbiAgICBkbyhhY3Rpb246IHN0cmluZyk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uRG8sIGFjdGlvbikpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVE9ETzogU2luY2UgcXVlcnkgQVBJIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgb24gdGhlIHNlcnZlciBzaWRlID0+IFRCRFxuICAgICAqXG4gICAgICogVGhlcmUgd2hlcmUgc2hvdWxkIGJlIGFibGUgdG8gYWNjZXB0cyBpbmRpdmlkdWFsIHF1ZXJ5IGdyYW1tYXIuIFNpbWlsYXIgc3R5bGUgbGlrZSByeGpzXG4gICAgICogb3BlcmF0b3JzLlxuICAgICAqXG4gICAgICogIGUuZy46IFJlc291cmNlLnByb3RvdHlwZS5jb250YWlucyA9IC4uLi5cbiAgICAgKiAgICAgICAgUmVzb3VyY2UucHJvdG90eXBlLmVxID0gLi4uLlxuICAgICAqXG4gICAgICogWW91IHNob3VsZCBiZSBhYmxlIHRvIGFkZCBkeW5hbWljYWxseSBsZXQ7cyBjYWxsIGl0IFF1ZXJ5U3BlY2lmaWNhdGlvblxuICAgICAqXG4gICAgICogICAgICByZXNcbiAgICAgKiAgICAgIC5xdWVyeSgpXG4gICAgICogICAgICAucmVzb3VyY2UoUmVxdXNpdGlvbilcbiAgICAgKiAgICAgIC53aGVyZSggY29udGFpbnM8c3RyaW5nPihyZXFFbnRpdHkudGl0bGUoKSwgJyphc2RmKicgKVxuICAgICAqXG4gICAgICogIHNvIGl0IGNvdWxkIGxvb2sgbGlrZSBzb21ldGhpbmcgbGlrZTpcbiAgICAgKlxuICAgICAqXG4gICAgICogIGNvbnRhaW5zPFQ+KHRpdGxlOiBzdHJpbmcsIHZhbHVlOiBUKTogVFxuICAgICAqXG4gICAgICogIEJ1dCBzaW5jZSBhbGwgdGhlc2UgU3BlY2lmaWNhdGlvbiB3b3VsZCBoYXZlIGEgd2F5IHRvIHRyYW5zbGF0ZSB0aGlzIGtleXx2YWx1ZSB0byB0aGVcbiAgICAgKiAgcXVlcnkgc28gdGhlIHdoZXJlLCB3b3VsZCBqdXN0IGxpc3QgYWxsIHRoZSBzcGVjaWZpY2F0aW9uIHRvIGJ1bGlkXG4gICAgICogIHRoZSBxdWVyeVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBxdWVyeSgpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgd2hlcmUoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWRlbnRpZmllcyBSZXNvdXJjZVNlZ21lbnQgd2l0aCBzcGVjaWZpYyB0eXBlIHRoYXQgbXVzdCBiZSBlaXRoZXIgRW50aXR5IG9yIFZhbHVlXG4gICAgICpcbiAgICAgKi9cbiAgICByZXNvdXJjZTxUIGV4dGVuZHMgRW50aXR5IHwgVmFsdWU+KHR5cGU6IFR5cGU8VD4pOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgUmVzb3VyY2VTZWdtZW50KHR5cGUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBJZGVudGlmaWVyU2VnbWVudFxuICAgICAqXG4gICAgICovXG4gICAgd2l0aElkKGlkZW50aWZpZXI6IHN0cmluZyk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBJZGVudGlmaWVyU2VnbWVudChpZGVudGlmaWVyKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgYXJlIHNhdmluZyBkYXRhIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gaW5zZXJ0IGEgcGF5bG9hZCB0byB0aGUgQWN0aW9uU2VnbWVudFxuICAgICAqXG4gICAgICovXG4gICAgd2l0aERhdGE8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPihkYXRhOiBUKTogUmVzb3VyY2Uge1xuICAgICAgICBsZXQgdXJsU2VnbWVudCA9IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuICAgICAgICBsZXQgaXNTYXZlID0gKDxBY3Rpb25TZWdtZW50PnVybFNlZ21lbnQpLmFjdGlvblR5cGUgPT09IFJlc3RBY3Rpb24uU2F2ZTtcblxuICAgICAgICBhc3NlcnQoaXNTYXZlLCAnd2l0aERhdGEgY2FuIGJlIHVzZWQgd2l0aCBTQVZFIG9wZXJhdGlvbiBvbmx5IScpO1xuXG4gICAgICAgICg8QWN0aW9uU2VnbWVudD51cmxTZWdtZW50KS5kYXRhID0gZGF0YTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBPRiBpcyBqdXN0IGEgc3ludGFjdGljIHN1Z2dhciBmb3IgYmV0dGVyIHJlYWRhYmlsaXR5IGFuZCB0byBlYXNpZXIgd29yayB3aXRoIHN1YiByZXNvdXJjZXMuXG4gICAgICogdXNpbmcgT0Ygd2UgYXJlIGFibGUgdG8gdGVsbCB0aGF0IHNvbWUgcmVzb3VyY2UgYmVsb25ncyB0byBvdGhlciByZXNvdXJjZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IG9mKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBPZlBhcmVudFNlZ21lbnQoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPbmNlIHRlbGwgd2hhdCB5b3Ugd2FudCB0aGlzIGlzIHRoZSBsYXN0IGNhbGwgeW91IHdhbnQgdG8gbWFrZSB0byByZXR1cm4gcmVzb3VyY2VzIGFzIGFjdHVhbFxuICAgICAqIEVudGl0aWVzIG9yIFZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRvZG86IE1heWJlIHJlbmFtZSBhIG1ldGhvZCBuYW1lIGFzIHdlIGNhbiByZXR1cm4gYm90aCBFbnRpdHkgYW5kIFZhbHVlLlxuICAgICAqXG4gICAgICogWW91IGhhdmUgYWxzbyBvcHRpb24gdG8gaW5zZXJ0IEh0dHBPcHRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGFzRW50aXR5PFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4oc3Vic2NyaWJlcjogKHJlczogVCB8IFRbXSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZTogJ2JvZHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlPzogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ID0ge29ic2VydmU6ICdib2R5J30pOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICBsZXQgc2VnbWVudDogQWN0aW9uU2VnbWVudCA9IDxBY3Rpb25TZWdtZW50PiB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChzZWdtZW50KSwgJ01pc3NpbmcgSHR0cCBtZXRob2QuIE5vdCBzdXJlIGhvdyB0byBoYW5kbGUgdGhpcyEnKTtcblxuICAgICAgICBsZXQgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgICAgIGxldCBhY3Rpb25UeXBlOiBSZXN0QWN0aW9uID0gc2VnbWVudC52YWx1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uTG9hZDpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLmdldDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uRG86XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwge30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uU2F2ZTpcbiAgICAgICAgICAgICAgICAvLyB3ZSBkb250IGhhdmUgcmlnaHQgbm93IG90aGVyIHVzZWNhc2Ugc3ViY29udGV4dCByZXNvdXJjZSB3aWxsIGJlIGFsd2F5cyBzb21lXG4gICAgICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAoaXNFbnRpdHkoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCbGFuaygoPEVudGl0eT5zZWdtZW50LmRhdGEpLmlkZW50aXR5KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNWYWx1ZShzZWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGV4cGVjdCB2YWx1ZSB3aWxsIGJlIGFsd2F5cyBwdXNoZWRcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXA8UmVzcG9uc2U8VCB8IFRbXT4sIFQgfCBUW10+KHJlcyA9PiB0aGlzLmNvbnZlcnRUb0NvbXBvc2l0ZShyZXMsXG4gICAgICAgICAgICB0cnVlLCBmYWxzZSkpKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfVxuXG5cbiAgICBhc0h0dHBSZXNwb25zZTxUIGV4dGVuZHMgRW50aXR5IHxcbiAgICAgICAgVmFsdWU+KHN1YnNjcmliZXI6IChyZXM6IEh0dHBSZXNwb25zZTxSZXNwb25zZTxUIHwgVFtdPj4gfCBIdHRwUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgIGVycm9yPzogKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZT86ICdqc29uJywgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhblxuICAgICAgICAgICAgICAgfSA9IHtvYnNlcnZlOiAncmVzcG9uc2UnfSk6IFN1YnNjcmlwdGlvbiB7XG5cbiAgICAgICAgbGV0IHNlZ21lbnQ6IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD4gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoc2VnbWVudCksICdNaXNzaW5nIEh0dHAgbWV0aG9kLiBOb3Qgc3VyZSBob3cgdG8gaGFuZGxlIHRoaXMhJyk7XG5cbiAgICAgICAgbGV0IG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PjtcblxuICAgICAgICBsZXQgYWN0aW9uVHlwZTogUmVzdEFjdGlvbiA9IHNlZ21lbnQudmFsdWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkxvYWQ6XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkRvOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLlNhdmU6XG4gICAgICAgICAgICAgICAgLy8gd2UgZG9udCBoYXZlIHJpZ2h0IG5vdyBvdGhlciB1c2VjYXNlIHN1YmNvbnRleHQgcmVzb3VyY2Ugd2lsbCBiZSBhbHdheXMgc29tZVxuICAgICAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKGlzRW50aXR5KHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoKDxFbnRpdHk+c2VnbWVudC5kYXRhKS5pZGVudGl0eSgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzVmFsdWUoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBleHBlY3QgdmFsdWUgd2lsbCBiZSBhbHdheXMgcHVzaGVkXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoYXNQcm9ncmVzcyA9IG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MgfHwgZmFsc2U7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUoXG4gICAgICAgICAgICBtYXAocmVzID0+IHRoaXMuY29udmVydFRvQ29tcG9zaXRlKHJlcywgZmFsc2UsIGhhc1Byb2dyZXNzKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHN1YnNjcmliZXIsIGVycm9yKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0dXJuIGFzc2VibGVkIFVSTCBBU1QgLT4gc3RyaW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3VybCkpIHtcbiAgICAgICAgICAgIGxldCBpc01vY2tlZCA9IHRoaXMuYXBwQ29uZmlnLmdldEJvb2xlYW4oQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyKTtcblxuICAgICAgICAgICAgdGhpcy5fdXJsID0gdGhpcy5fdXJsQnVpbGRlci5hc3NlbWJsZVVybChpc01vY2tlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCB1cmxHcm91cCgpOiBSZXN0VXJsR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXJsR3JvdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHVybEJ1aWxkZXIoKTogRGVmYXVsdFJlc3RCdWlsZGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybEJ1aWxkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl91cmxHcm91cCA9IG5ldyBSZXN0VXJsR3JvdXAoKTtcbiAgICAgICAgdGhpcy5fdXJsQnVpbGRlciA9IG5ldyBEZWZhdWx0UmVzdEJ1aWxkZXIodGhpcy5fdXJsR3JvdXApO1xuICAgICAgICB0aGlzLl91cmwgPSBudWxsO1xuXG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBIb3N0U2VnbWVudCh0aGlzLmFwcENvbmZpZy5nZXRSZXN0QXBpSG9zdCgpKSk7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQ29udGV4dFNlZ21lbnQodGhpcy5hcHBDb25maWcuZ2V0UmVzdEFwaUNvbnRleHQoKSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBpbnNpZGUgLm1hcCB0byBtYXAgSlNPTiByZXNwb25zZSBvciBIdHRwUmVzcG9uc2UuYm9keSB0byBhY3R1YWwgdHlwZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9Db21wb3NpdGU8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPihyZXM6IFJlc3BvbnNlPFQgfCBUW10+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIdHRwUmVzcG9uc2U8UmVzcG9uc2U8VCB8IFRbXT4+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wb3NpdGU6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ncmVzczogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGlmIChoYXNQcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICAvLyB1bnNvcnRlZCBzZWdtZW50cyB3aWxsIGhhdmUgaGF2ZSBvdXIgdGFyZ2V0IHJlc291cmNlIGFzIGZpcnN0IG9uZVxuICAgICAgICBsZXQgc2dtOiBSZXNvdXJjZVNlZ21lbnQgPSA8UmVzb3VyY2VTZWdtZW50PnRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSk7XG5cbiAgICAgICAgaWYgKGlzQ29tcG9zaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXNlcmlhbGl6ZSgoPFJlc3BvbnNlPFQ+PnJlcykucGF5bG9hZCwgc2dtLnZhbHVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGh0dHBSZXMgPSA8SHR0cFJlc3BvbnNlPFJlc3BvbnNlPFQ+Pj5yZXM7XG4gICAgICAgICAgICBsZXQgbXlSZXNwOiBSZXNwb25zZTxUPiA9IHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB0aGlzLmRlc2VyaWFsaXplKGh0dHBSZXMuYm9keS5wYXlsb2FkLCBzZ20udmFsdWUpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXMuY2xvbmUoe2JvZHk6IG15UmVzcH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzZXJpYWxpemU8VD4oZGF0YTogVCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvbnZlcnRzIEpTT04gb2JqZWN0IHRvIGFjdHVhbCBUeXBlLiBXZSBkb24ndCBjYXJlIGFib3V0IHByaW1pdGl2ZSB0eXBlcyBhcyB3ZSBkb250IGhhdmUgdG9cbiAgICAgKiBkbyBhbnl0aGluZyB3aXRoIHRoZW0uIFdlIGRvIGluc3RhbnRpYXRlIG9iamVjdHMgb3IgY29tcGxleCB0eXBlcyBvbmx5LlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBkZXNlcmlhbGl6ZShqc29uOiBhbnksIGNsYXp6OiBUeXBlPGFueT4pOiBhbnkge1xuICAgICAgICBpZiAoaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBpbiBqc29uKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VzLnB1c2godGhpcy5kZXNlcmlhbGl6ZShqc29uW2l0ZW1dLCBjbGF6eikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChjbGF6eiA9PT0gU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXp6ID09PSBOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGpzb247XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXp6ID09PSBCb29sZWFuKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBjbGF6eigpO1xuICAgICAgICAgICAgICAgIGxldCB0eXBlcyA9IGluc3RhbmNlLmdldFR5cGVzKCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFqc29uLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodHlwZXNbcHJvcF0pICYmIGlzUHJlc2VudChqc29uW3Byb3BdKSAmJiB0eXBlc1twcm9wXSAhPT0gRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcF0gPSB0aGlzLmRlc2VyaWFsaXplKGpzb25bcHJvcF0sIHR5cGVzW3Byb3BdKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZSh0eXBlc1twcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BdID0gbmV3IHR5cGVzW3Byb3BdKGpzb25bcHJvcF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wXSA9IGpzb25bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIChpc1N0cmluZyhqc29uW3Byb3BdKSAmJiBpc0VudGl0eShpbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICYmIHByb3AgPT09ICg8RW50aXR5Pmluc3RhbmNlKS5pZGVudGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBpZFN0cmluZyA9ICg8RW50aXR5Pmluc3RhbmNlKS5pZGVudGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgKDxhbnk+aW5zdGFuY2UpW2lkU3RyaW5nXSA9IDxzdHJpbmc+anNvbltwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuIl19