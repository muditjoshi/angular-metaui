/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { MetaLayout } from '../meta-layout';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
import { UIMeta } from '../../core/uimeta';
/**
 *
 * Defines 4 sizes for the portlet size
 *
 */
const /** @type {?} */ PortletSizes = {
    'small': 'ui-md-3',
    'medium': 'ui-md-4',
    'wide': 'ui-md-6',
    'large': 'ui-md-12'
};
/**
 * Simple Dashboard implementation for the homePage. Just like we support inside MetaFormTable
 * different zones and distribute fields to them, we do the same with defined layouts.
 *
 * This dashboard supports 3 zones.
 *
 *    zToc: This is the place where usually all the actions or 2nd level navigation will go
 *    zTop,zBottom: is where the portlets are rendered.
 *
 *
 * To distribute layouts to different zones :
 *
 * ```
 * \@module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 * \@layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 * \@layout=Sport {
 *              after:Today;
 *              label: "Sport today!";
 *              component:StringComponent;
 *              bindings:{value:"The Texas Tech quarterback arrived at  " }
 *
 *           }
 *
 * ```
 *
 *  or Push actions to the zToc zone:
 *
 * ```
 * \@module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 * \@layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 * \@layout=Actions#ActionLinks {
 *               label:$[a004]Actions;
 *                after:zToc;
 *            }
 *
 *
 * \@actionCategory=Create {
 * \@action=NewBlog#pageAction { pageName:blogPage;}
 * \@action=NewChart#pageAction { pageName:chartPage;}
 *           }
 *
 * }
 *
 *
 *
 */
export class MetaDashboardLayoutComponent extends MetaLayout {
    /**
     * @param {?} metaContext
     * @param {?} env
     */
    constructor(metaContext, env) {
        super(metaContext, env);
        /**
         * Defines if sidebar is collapsed or expanded
         *
         */
        this.activeMenu = false;
        /**
         * Current Module name
         *
         */
        this.dashboardName = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.dashboardName = this.label();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleMenu(event) {
        this.activeMenu = !this.activeMenu;
    }
    /**
     * @return {?}
     */
    zones() {
        return MetaDashboardLayoutComponent.ZonesTB;
    }
    /**
     * @return {?}
     */
    topLayouts() {
        let /** @type {?} */ tops = this.layoutsByZones.get(UIMeta.ZoneTop);
        return isPresent(tops) ? tops : [];
    }
    /**
     * @param {?} name
     * @return {?}
     */
    portletWidth(name) {
        let /** @type {?} */ lContext = this.contextMap.get(name);
        let /** @type {?} */ width = lContext.propertyForKey('portletWidth');
        return isPresent(width) && isPresent(PortletSizes[width]) ? PortletSizes[width] :
            'ui-md-4';
    }
    /**
     * @return {?}
     */
    bottomLayouts() {
        let /** @type {?} */ bottom = this.layoutsByZones.get(UIMeta.ZoneBottom);
        return isPresent(bottom) ? bottom : [];
    }
    /**
     * @return {?}
     */
    zTocLayouts() {
        let /** @type {?} */ bottom = this.layoutsByZones.get(MetaDashboardLayoutComponent.ZoneToc);
        return isPresent(bottom) ? bottom : [];
    }
}
/**
 * New defined zone for Actions
 *
 */
MetaDashboardLayoutComponent.ZoneToc = 'zToc';
MetaDashboardLayoutComponent.ZonesTB = [
    MetaDashboardLayoutComponent.ZoneToc, UIMeta.ZoneTop,
    UIMeta.ZoneBottom
];
MetaDashboardLayoutComponent.decorators = [
    { type: Component, args: [{
                template: `<div>
    <span class="m-dashbord-name">{{dashboardName}} </span>
    <span class="m-dashbord-lbl"> Dashboard</span>
</div>


<div id="m-toggle-bar" *ngIf="zTocLayouts().length > 0">
    <aw-hyperlink (action)="toggleMenu($event)" [size]="'large'">
        <i class="fa fa-bars"></i>
    </aw-hyperlink>
</div>
<div id="m-toc" [class.active]="activeMenu" *ngIf="zTocLayouts().length > 0">
    <div class="ui-g ">
        <m-context *ngFor="let layout of zTocLayouts()"
                   [layout]="layout.name" (afterContextSet)="afterContextSet($event)"
                   (beforeContextSet)="beforeContextSet($event)">

            <div class="ui-g-12 " [ngClass]="portletWidth(layout.name)">
                <p-panel [header]="labelForContext(layout.name)">
                    <m-include-component></m-include-component>
                </p-panel>
            </div>
        </m-context>
    </div>
</div>

<div id="m-content">
    <div class="ui-g m-dashboard">
        <!-- top -->
        <div class="ui-g-12">
            <div class="ui-g ">
                <m-context *ngFor="let layout of topLayouts()"
                           [layout]="layout.name" (afterContextSet)="afterContextSet($event)"
                           (beforeContextSet)="beforeContextSet($event)">

                    <div class="ui-g-12 " [ngClass]="portletWidth(layout.name)">
                        <p-panel [header]="labelForContext(layout.name)" [toggleable]="true">
                            <m-include-component></m-include-component>
                        </p-panel>
                    </div>
                </m-context>
            </div>
        </div>

        <!-- bottom -->
        <div class="ui-g-12">
            <div class="ui-g ">
                <m-context *ngFor="let layout of bottomLayouts()"
                           [layout]="layout.name" (afterContextSet)="afterContextSet($event)"
                           (beforeContextSet)="beforeContextSet($event)">

                    <div class="ui-g-12 " [ngClass]="portletWidth(layout.name)">
                        <p-panel [header]="labelForContext(layout.name)" [toggleable]="true">
                            <m-include-component></m-include-component>
                        </p-panel>
                    </div>
                </m-context>
            </div>
        </div>
    </div>
</div>



`,
                styles: [`#m-toc{position:relative;float:left;z-index:99;width:15em;padding:.5em;box-shadow:6px 0 10px -4px rgba(0,0,0,.3)}#m-content{float:left;padding-top:1em;padding-left:1em;height:auto}#m-toggle-bar{box-sizing:border-box;border-bottom:1px solid #dde3e6;overflow:hidden;display:none;border-radius:5px;padding:.5em;width:2em;height:2.3em}#m-toggle-bar:focus,#m-toggle-bar:hover{background-color:#ececec}#m-toggle-bar:after{content:'';display:block;clear:both}.m-dashbord-name{font-weight:600}.ui-g{display:block}@media screen and (max-width:64em){#m-toc{display:none;overflow-y:auto;z-index:999}#m-toc.active{display:block}#m-toggle-bar{display:block;position:relative;z-index:1000;margin-right:1em}}`]
            },] },
];
/** @nocollapse */
MetaDashboardLayoutComponent.ctorParameters = () => [
    { type: MetaContextComponent },
    { type: Environment }
];
function MetaDashboardLayoutComponent_tsickle_Closure_declarations() {
    /**
     * New defined zone for Actions
     *
     * @type {?}
     */
    MetaDashboardLayoutComponent.ZoneToc;
    /** @type {?} */
    MetaDashboardLayoutComponent.ZonesTB;
    /**
     * Defines if sidebar is collapsed or expanded
     *
     * @type {?}
     */
    MetaDashboardLayoutComponent.prototype.activeMenu;
    /**
     * Current Module name
     *
     * @type {?}
     */
    MetaDashboardLayoutComponent.prototype.dashboardName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhc2hib2FyZC1sYXlvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtZGFzaGJvYXJkL21ldGFkYXNoYm9hcmQtbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7O0FBVXpDLHVCQUFNLFlBQVksR0FBMEI7SUFDeEMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLFNBQVM7SUFDbkIsTUFBTSxFQUFFLFNBQVM7SUFDakIsT0FBTyxFQUFFLFVBQVU7Q0FDdEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdJRixNQUFNLG1DQUFvQyxTQUFRLFVBQVU7Ozs7O0lBeUJ4RCxZQUFZLFdBQWlDLEVBQUUsR0FBZ0I7UUFFM0QsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7MEJBVk4sS0FBSzs7Ozs7NkJBTUgsRUFBRTtLQUt6Qjs7OztJQUdELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDckM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFFakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDdEM7Ozs7SUFFRCxLQUFLO1FBRUQsTUFBTSxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQztLQUMvQzs7OztJQUVELFVBQVU7UUFFTixxQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3RDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFZO1FBRXJCLHFCQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxxQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0UsU0FBUyxDQUFDO0tBQ2pCOzs7O0lBRUQsYUFBYTtRQUVULHFCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDMUM7Ozs7SUFHRCxXQUFXO1FBRVAscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzFDOzs7Ozs7dUNBcEVnQixNQUFNO3VDQUNOO0lBQ2IsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO0lBQ3BELE1BQU0sQ0FBQyxVQUFVO0NBQ3BCOztZQS9FSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBZ0ViO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHVyQkFBdXJCLENBQUM7YUFDcHNCOzs7O1lBdkpPLG9CQUFvQjtZQUZwQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhTGF5b3V0fSBmcm9tICcuLi9tZXRhLWxheW91dCc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi8uLi9jb3JlL3VpbWV0YSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uLy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge0l0ZW1Qcm9wZXJ0aWVzfSBmcm9tICcuLi8uLi9jb3JlL2l0ZW0tcHJvcGVydGllcyc7XG5cblxuLyoqXG4gKlxuICogRGVmaW5lcyA0IHNpemVzIGZvciB0aGUgcG9ydGxldCBzaXplXG4gKlxuICovXG5jb25zdCBQb3J0bGV0U2l6ZXM6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnc21hbGwnOiAndWktbWQtMycsXG4gICAgJ21lZGl1bSc6ICd1aS1tZC00JyxcbiAgICAnd2lkZSc6ICd1aS1tZC02JyxcbiAgICAnbGFyZ2UnOiAndWktbWQtMTInXG59O1xuXG4vKipcbiAqIFNpbXBsZSBEYXNoYm9hcmQgaW1wbGVtZW50YXRpb24gZm9yIHRoZSBob21lUGFnZS4gSnVzdCBsaWtlIHdlIHN1cHBvcnQgaW5zaWRlIE1ldGFGb3JtVGFibGVcbiAqIGRpZmZlcmVudCB6b25lcyBhbmQgZGlzdHJpYnV0ZSBmaWVsZHMgdG8gdGhlbSwgd2UgZG8gdGhlIHNhbWUgd2l0aCBkZWZpbmVkIGxheW91dHMuXG4gKlxuICogVGhpcyBkYXNoYm9hcmQgc3VwcG9ydHMgMyB6b25lcy5cbiAqXG4gKiAgICB6VG9jOiBUaGlzIGlzIHRoZSBwbGFjZSB3aGVyZSB1c3VhbGx5IGFsbCB0aGUgYWN0aW9ucyBvciAybmQgbGV2ZWwgbmF2aWdhdGlvbiB3aWxsIGdvXG4gKiAgICB6VG9wLHpCb3R0b206IGlzIHdoZXJlIHRoZSBwb3J0bGV0cyBhcmUgcmVuZGVyZWQuXG4gKlxuICpcbiAqIFRvIGRpc3RyaWJ1dGUgbGF5b3V0cyB0byBkaWZmZXJlbnQgem9uZXMgOlxuICpcbiAqIGBgYFxuICogICAgICAgQG1vZHVsZT1Ib21lIHtcbiAqICAgICAgICAgICBsYWJlbDpcIk15IEhvbWVcIjtcbiAqICAgICAgICAgICBwYWdlVGl0bGU6XCJZb3UgYXJlIG5vdyBvbiBIb21lcGFnZVwiO1xuICpcbiAqXG4gKiAgICAgICAgICAgQGxheW91dD1Ub2RheSB7XG4gKiAgICAgICAgICAgICAgYWZ0ZXI6elRvcDtcbiAqICAgICAgICAgICAgICBsYWJlbDogXCJTYWxlcyBHcmFwaFwiO1xuICogICAgICAgICAgICAgIGNvbXBvbmVudDpTYWxlc0dyYXBoQ29tcG9uZW50O1xuICpcbiAqICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgIEBsYXlvdXQ9U3BvcnQge1xuICogICAgICAgICAgICAgIGFmdGVyOlRvZGF5O1xuICogICAgICAgICAgICAgIGxhYmVsOiBcIlNwb3J0IHRvZGF5IVwiO1xuICogICAgICAgICAgICAgIGNvbXBvbmVudDpTdHJpbmdDb21wb25lbnQ7XG4gKiAgICAgICAgICAgICAgYmluZGluZ3M6e3ZhbHVlOlwiVGhlIFRleGFzIFRlY2ggcXVhcnRlcmJhY2sgYXJyaXZlZCBhdCAgXCIgfVxuICpcbiAqICAgICAgICAgICB9XG4gKlxuICogYGBgXG4gKlxuICogIG9yIFB1c2ggYWN0aW9ucyB0byB0aGUgelRvYyB6b25lOlxuICpcbiAqIGBgYFxuICogICAgICAgQG1vZHVsZT1Ib21lIHtcbiAqICAgICAgICAgICBsYWJlbDpcIk15IEhvbWVcIjtcbiAqICAgICAgICAgICBwYWdlVGl0bGU6XCJZb3UgYXJlIG5vdyBvbiBIb21lcGFnZVwiO1xuICpcbiAqXG4gKiAgICAgICAgICAgQGxheW91dD1Ub2RheSB7XG4gKiAgICAgICAgICAgICAgYWZ0ZXI6elRvcDtcbiAqICAgICAgICAgICAgICBsYWJlbDogXCJTYWxlcyBHcmFwaFwiO1xuICogICAgICAgICAgICAgIGNvbXBvbmVudDpTYWxlc0dyYXBoQ29tcG9uZW50O1xuICpcbiAqICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICBAbGF5b3V0PUFjdGlvbnMjQWN0aW9uTGlua3Mge1xuICogICAgICAgICAgICAgICBsYWJlbDokW2EwMDRdQWN0aW9ucztcbiAqICAgICAgICAgICAgICAgIGFmdGVyOnpUb2M7XG4gKiAgICAgICAgICAgIH1cbiAqXG4gKlxuICogICAgICAgICAgIEBhY3Rpb25DYXRlZ29yeT1DcmVhdGUge1xuICogICAgICAgICAgICAgIEBhY3Rpb249TmV3QmxvZyNwYWdlQWN0aW9uIHsgcGFnZU5hbWU6YmxvZ1BhZ2U7fVxuICogICAgICAgICAgICAgIEBhY3Rpb249TmV3Q2hhcnQjcGFnZUFjdGlvbiB7IHBhZ2VOYW1lOmNoYXJ0UGFnZTt9XG4gKiAgICAgICAgICAgfVxuICpcbiAqIH1cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwibS1kYXNoYm9yZC1uYW1lXCI+e3tkYXNoYm9hcmROYW1lfX0gPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwibS1kYXNoYm9yZC1sYmxcIj4gRGFzaGJvYXJkPC9zcGFuPlxuPC9kaXY+XG5cblxuPGRpdiBpZD1cIm0tdG9nZ2xlLWJhclwiICpuZ0lmPVwielRvY0xheW91dHMoKS5sZW5ndGggPiAwXCI+XG4gICAgPGF3LWh5cGVybGluayAoYWN0aW9uKT1cInRvZ2dsZU1lbnUoJGV2ZW50KVwiIFtzaXplXT1cIidsYXJnZSdcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1iYXJzXCI+PC9pPlxuICAgIDwvYXctaHlwZXJsaW5rPlxuPC9kaXY+XG48ZGl2IGlkPVwibS10b2NcIiBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZU1lbnVcIiAqbmdJZj1cInpUb2NMYXlvdXRzKCkubGVuZ3RoID4gMFwiPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1nIFwiPlxuICAgICAgICA8bS1jb250ZXh0ICpuZ0Zvcj1cImxldCBsYXlvdXQgb2YgelRvY0xheW91dHMoKVwiXG4gICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXQubmFtZVwiIChhZnRlckNvbnRleHRTZXQpPVwiYWZ0ZXJDb250ZXh0U2V0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgIChiZWZvcmVDb250ZXh0U2V0KT1cImJlZm9yZUNvbnRleHRTZXQoJGV2ZW50KVwiPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0xMiBcIiBbbmdDbGFzc109XCJwb3J0bGV0V2lkdGgobGF5b3V0Lm5hbWUpXCI+XG4gICAgICAgICAgICAgICAgPHAtcGFuZWwgW2hlYWRlcl09XCJsYWJlbEZvckNvbnRleHQobGF5b3V0Lm5hbWUpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8L3AtcGFuZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBpZD1cIm0tY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1nIG0tZGFzaGJvYXJkXCI+XG4gICAgICAgIDwhLS0gdG9wIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWcgXCI+XG4gICAgICAgICAgICAgICAgPG0tY29udGV4dCAqbmdGb3I9XCJsZXQgbGF5b3V0IG9mIHRvcExheW91dHMoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0XT1cImxheW91dC5uYW1lXCIgKGFmdGVyQ29udGV4dFNldCk9XCJhZnRlckNvbnRleHRTZXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoYmVmb3JlQ29udGV4dFNldCk9XCJiZWZvcmVDb250ZXh0U2V0KCRldmVudClcIj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0xMiBcIiBbbmdDbGFzc109XCJwb3J0bGV0V2lkdGgobGF5b3V0Lm5hbWUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cC1wYW5lbCBbaGVhZGVyXT1cImxhYmVsRm9yQ29udGV4dChsYXlvdXQubmFtZSlcIiBbdG9nZ2xlYWJsZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG0taW5jbHVkZS1jb21wb25lbnQ+PC9tLWluY2x1ZGUtY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wLXBhbmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L20tY29udGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIGJvdHRvbSAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nIFwiPlxuICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgKm5nRm9yPVwibGV0IGxheW91dCBvZiBib3R0b21MYXlvdXRzKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXQubmFtZVwiIChhZnRlckNvbnRleHRTZXQpPVwiYWZ0ZXJDb250ZXh0U2V0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJlZm9yZUNvbnRleHRTZXQpPVwiYmVmb3JlQ29udGV4dFNldCgkZXZlbnQpXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctMTIgXCIgW25nQ2xhc3NdPVwicG9ydGxldFdpZHRoKGxheW91dC5uYW1lKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAtcGFuZWwgW2hlYWRlcl09XCJsYWJlbEZvckNvbnRleHQobGF5b3V0Lm5hbWUpXCIgW3RvZ2dsZWFibGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcC1wYW5lbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuXG5cbmAsXG4gICAgc3R5bGVzOiBbYCNtLXRvY3twb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O3otaW5kZXg6OTk7d2lkdGg6MTVlbTtwYWRkaW5nOi41ZW07Ym94LXNoYWRvdzo2cHggMCAxMHB4IC00cHggcmdiYSgwLDAsMCwuMyl9I20tY29udGVudHtmbG9hdDpsZWZ0O3BhZGRpbmctdG9wOjFlbTtwYWRkaW5nLWxlZnQ6MWVtO2hlaWdodDphdXRvfSNtLXRvZ2dsZS1iYXJ7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkZGUzZTY7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6bm9uZTtib3JkZXItcmFkaXVzOjVweDtwYWRkaW5nOi41ZW07d2lkdGg6MmVtO2hlaWdodDoyLjNlbX0jbS10b2dnbGUtYmFyOmZvY3VzLCNtLXRvZ2dsZS1iYXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfSNtLXRvZ2dsZS1iYXI6YWZ0ZXJ7Y29udGVudDonJztkaXNwbGF5OmJsb2NrO2NsZWFyOmJvdGh9Lm0tZGFzaGJvcmQtbmFtZXtmb250LXdlaWdodDo2MDB9LnVpLWd7ZGlzcGxheTpibG9ja31AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjY0ZW0peyNtLXRvY3tkaXNwbGF5Om5vbmU7b3ZlcmZsb3cteTphdXRvO3otaW5kZXg6OTk5fSNtLXRvYy5hY3RpdmV7ZGlzcGxheTpibG9ja30jbS10b2dnbGUtYmFye2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxMDAwO21hcmdpbi1yaWdodDoxZW19fWBdXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFEYXNoYm9hcmRMYXlvdXRDb21wb25lbnQgZXh0ZW5kcyBNZXRhTGF5b3V0XG57XG5cbiAgICAvKipcbiAgICAgKiBOZXcgZGVmaW5lZCB6b25lIGZvciBBY3Rpb25zXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgWm9uZVRvYyA9ICd6VG9jJztcbiAgICBzdGF0aWMgWm9uZXNUQiA9IFtcbiAgICAgICAgTWV0YURhc2hib2FyZExheW91dENvbXBvbmVudC5ab25lVG9jLCBVSU1ldGEuWm9uZVRvcCxcbiAgICAgICAgVUlNZXRhLlpvbmVCb3R0b21cbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBzaWRlYmFyIGlzIGNvbGxhcHNlZCBvciBleHBhbmRlZFxuICAgICAqXG4gICAgICovXG4gICAgYWN0aXZlTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBNb2R1bGUgbmFtZVxuICAgICAqXG4gICAgICovXG4gICAgZGFzaGJvYXJkTmFtZTogc3RyaW5nID0gJyc7XG5cbiAgICBjb25zdHJ1Y3RvcihtZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihtZXRhQ29udGV4dCwgZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5kYXNoYm9hcmROYW1lID0gdGhpcy5sYWJlbCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuYWN0aXZlTWVudSA9ICF0aGlzLmFjdGl2ZU1lbnU7XG4gICAgfVxuXG4gICAgem9uZXMoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiBNZXRhRGFzaGJvYXJkTGF5b3V0Q29tcG9uZW50LlpvbmVzVEI7XG4gICAgfVxuXG4gICAgdG9wTGF5b3V0cygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBsZXQgdG9wcyA9IHRoaXMubGF5b3V0c0J5Wm9uZXMuZ2V0KFVJTWV0YS5ab25lVG9wKTtcblxuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRvcHMpID8gdG9wcyA6IFtdO1xuICAgIH1cblxuICAgIHBvcnRsZXRXaWR0aChuYW1lOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBsQ29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIGxldCB3aWR0aCA9IGxDb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdwb3J0bGV0V2lkdGgnKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh3aWR0aCkgJiYgaXNQcmVzZW50KFBvcnRsZXRTaXplc1t3aWR0aF0pID8gUG9ydGxldFNpemVzW3dpZHRoXSA6XG4gICAgICAgICAgICAndWktbWQtNCc7XG4gICAgfVxuXG4gICAgYm90dG9tTGF5b3V0cygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5sYXlvdXRzQnlab25lcy5nZXQoVUlNZXRhLlpvbmVCb3R0b20pO1xuXG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoYm90dG9tKSA/IGJvdHRvbSA6IFtdO1xuICAgIH1cblxuXG4gICAgelRvY0xheW91dHMoKTogSXRlbVByb3BlcnRpZXNbXVxuICAgIHtcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubGF5b3V0c0J5Wm9uZXMuZ2V0KE1ldGFEYXNoYm9hcmRMYXlvdXRDb21wb25lbnQuWm9uZVRvYyk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoYm90dG9tKSA/IGJvdHRvbSA6IFtdO1xuICAgIH1cblxuXG59XG4iXX0=