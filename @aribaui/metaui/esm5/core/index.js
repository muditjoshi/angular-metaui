/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
 *
 */
export { AWMetaCoreModule } from './meta-core.module';
export { MetaContextComponent, ACTIVE_CNTX, MetaUIActionEvent } from './meta-context/meta-context.component';
export { Activation, Assignment, AssignmentSnapshot, Context, DeferredAssignment, ObjectMetaContext, PropertyAccessor, Snapshot, StaticRec, UIContext } from './context';
export { ItemProperties } from './item-properties';
export { Match, MatchResult, MatchWithUnion, UnionMatchResult } from './match';
export { Meta, KeyValueCount, PropertyManager, OverrideValue, KeyData, PropertyMap, PropertyMergerDynamic, PropertyMerger_Overwrite, PropertyMerger_List, PropertyMergerDeclareList, PropertyMergerDeclareListForTrait, PropertyMerger_And, PropertyMerger_Valid, RuleSet, ValueMatches, MultiMatchValue, KeyValueTransformer_KeyPresent, isPropertyMapAwaking } from './meta';
export { NestedMap } from './nested-map';
export { FieldTypeIntrospectionMetaProvider, IntrospectionMetaProvider, ObjectMeta, ObjectMetaPropertyMap, OMPropertyMerger_Valid } from './object-meta';
export { SystemPersistenceRules } from './persistence-rules';
export { DynamicPropertyValue, StaticallyResolvable, StaticDynamicWrapper, StaticallyResolvableWrapper, ContextFieldPath, isDynamicSettable, Expr, DeferredOperationChain, ValueConverter } from './property-value';
export { Rule, RuleWrapper, Selector } from './rule';
export { RuleLoaderService } from './rule-loader.service';
export { LocalizedString, UIMeta, ModuleInfo } from './uimeta';
export { SystemRules } from './widgets-rules';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxFQUNILG9CQUFvQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFDdkQsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvQyxPQUFPLEVBQ0gsVUFBVSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQzFGLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUNuRCxNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdFLE9BQU8sRUFDSCxJQUFJLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFDL0IscUJBQXFCLEVBQUUsd0JBQXdCLEVBQ3pGLG1CQUFtQixFQUFFLHlCQUF5QixFQUFFLGlDQUFpQyxFQUNqRixrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQWMsWUFBWSxFQUFFLGVBQWUsRUFDakQsOEJBQThCLEVBQ3pFLG9CQUFvQixFQUN2QixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQVcsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFDSCxrQ0FBa0MsRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQ3pFLHFCQUFxQixFQUFFLHNCQUFzQixFQUNoRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQ0gsb0JBQW9CLEVBQWdDLG9CQUFvQixFQUFFLG9CQUFvQixFQUM5RiwyQkFBMkIsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQzlGLGNBQWMsRUFDakIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDbkQsT0FBTyxFQUFhLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzdELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cblxuZXhwb3J0IHtBV01ldGFDb3JlTW9kdWxlfSBmcm9tICcuL21ldGEtY29yZS5tb2R1bGUnO1xuXG5leHBvcnQge1xuICAgIE1ldGFDb250ZXh0Q29tcG9uZW50LCBBQ1RJVkVfQ05UWCwgTWV0YVVJQWN0aW9uRXZlbnRcbn0gZnJvbSAnLi9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5leHBvcnQge1xuICAgIEFjdGl2YXRpb24sIEFzc2lnbm1lbnQsIEFzc2lnbm1lbnRTbmFwc2hvdCwgQ29udGV4dCwgRGVmZXJyZWRBc3NpZ25tZW50LCBPYmplY3RNZXRhQ29udGV4dCxcbiAgICBQcm9wZXJ0eUFjY2Vzc29yLCBTbmFwc2hvdCwgU3RhdGljUmVjLCBVSUNvbnRleHRcbn0gZnJvbSAnLi9jb250ZXh0JztcbmV4cG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4vaXRlbS1wcm9wZXJ0aWVzJztcbmV4cG9ydCB7SnNvblJ1bGUsIFNlbGVjdG9ySnNvbn0gZnJvbSAnLi9qc29uLXJ1bGUnO1xuZXhwb3J0IHtNYXRjaCwgTWF0Y2hSZXN1bHQsIE1hdGNoV2l0aFVuaW9uLCBVbmlvbk1hdGNoUmVzdWx0fSBmcm9tICcuL21hdGNoJztcbmV4cG9ydCB7XG4gICAgTWV0YSwgS2V5VmFsdWVDb3VudCwgUHJvcGVydHlNYW5hZ2VyLCBPdmVycmlkZVZhbHVlLCBLZXlEYXRhLCBQcm9wZXJ0eU1hcCxcbiAgICBQcm9wZXJ0eU1lcmdlcklzQ2hhaW5pbmcsIFByb3BlcnR5TWVyZ2VyLCBQcm9wZXJ0eU1lcmdlckR5bmFtaWMsIFByb3BlcnR5TWVyZ2VyX092ZXJ3cml0ZSxcbiAgICBQcm9wZXJ0eU1lcmdlcl9MaXN0LCBQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0LCBQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0Rm9yVHJhaXQsXG4gICAgUHJvcGVydHlNZXJnZXJfQW5kLCBQcm9wZXJ0eU1lcmdlcl9WYWxpZCwgUnVsZVNldCwgTWF0Y2hWYWx1ZSwgVmFsdWVNYXRjaGVzLCBNdWx0aU1hdGNoVmFsdWUsXG4gICAgVmFsdWVRdWVyaWVkT2JzZXJ2ZXIsIEtleVZhbHVlVHJhbnNmb3JtZXIsIEtleVZhbHVlVHJhbnNmb3JtZXJfS2V5UHJlc2VudCwgUHJvcGVydHlNYXBBd2FraW5nLFxuICAgIGlzUHJvcGVydHlNYXBBd2FraW5nXG59IGZyb20gJy4vbWV0YSc7XG5leHBvcnQge01hcEVudHJ5LCBOZXN0ZWRNYXB9IGZyb20gJy4vbmVzdGVkLW1hcCc7XG5leHBvcnQge1xuICAgIEZpZWxkVHlwZUludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIsIEludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIsIE9iamVjdE1ldGEsXG4gICAgT2JqZWN0TWV0YVByb3BlcnR5TWFwLCBPTVByb3BlcnR5TWVyZ2VyX1ZhbGlkXG59IGZyb20gJy4vb2JqZWN0LW1ldGEnO1xuZXhwb3J0IHtTeXN0ZW1QZXJzaXN0ZW5jZVJ1bGVzfSBmcm9tICcuL3BlcnNpc3RlbmNlLXJ1bGVzJztcbmV4cG9ydCB7XG4gICAgRHluYW1pY1Byb3BlcnR5VmFsdWUsIER5bmFtaWNTZXR0YWJsZVByb3BlcnR5VmFsdWUsIFN0YXRpY2FsbHlSZXNvbHZhYmxlLCBTdGF0aWNEeW5hbWljV3JhcHBlcixcbiAgICBTdGF0aWNhbGx5UmVzb2x2YWJsZVdyYXBwZXIsIENvbnRleHRGaWVsZFBhdGgsIGlzRHluYW1pY1NldHRhYmxlLCBFeHByLCBEZWZlcnJlZE9wZXJhdGlvbkNoYWluLFxuICAgIFZhbHVlQ29udmVydGVyXG59IGZyb20gJy4vcHJvcGVydHktdmFsdWUnO1xuZXhwb3J0IHtSdWxlLCBSdWxlV3JhcHBlciwgU2VsZWN0b3J9IGZyb20gJy4vcnVsZSc7XG5leHBvcnQge1J1bGVMb2FkZXIsIFJ1bGVMb2FkZXJTZXJ2aWNlfSBmcm9tICcuL3J1bGUtbG9hZGVyLnNlcnZpY2UnO1xuZXhwb3J0IHtMb2NhbGl6ZWRTdHJpbmcsIFVJTWV0YSwgTW9kdWxlSW5mb30gZnJvbSAnLi91aW1ldGEnO1xuZXhwb3J0IHtTeXN0ZW1SdWxlc30gZnJvbSAnLi93aWRnZXRzLXJ1bGVzJztcblxuXG5cblxuXG5cblxuXG4iXX0=