/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Meta, Title } from '@angular/platform-browser';
import { ErrorHandler, Inject, InjectionToken, Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConfig, makeConfig } from './config/app-config';
import { Environment } from './config/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutingService } from './routing/routing.service';
import { GlobalErrorHandler } from './global-error-handler';
import { AribaCoreRoutingModule } from './ariba-core-routing.module';
import { Notifications } from './messaging/notifications.service';
import { HttpMockInterceptor, MockInterceptorHandler } from './http/http-mock-interceptor';
import { Resource } from './domain/resource.service';
import { CommonModule } from '@angular/common';
export const /** @type {?} */ UserConfig = new InjectionToken('UserConfig');
/**
 * Core mode includes all shared logic accross whole application
 */
export class AribaCoreModule {
    /**
     * @param {?} parentModule
     * @param {?} conf
     */
    constructor(parentModule, conf) {
        this.conf = conf;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: AribaCoreModule,
            providers: [
                Title,
                Meta,
                Environment,
                Notifications,
                HttpMockInterceptor,
                Resource,
                { provide: UserConfig, useValue: config },
                {
                    provide: AppConfig, useFactory: makeConfig,
                    deps: [UserConfig, Injector, Environment]
                },
                {
                    provide: HttpHandler,
                    useFactory: makeHttpClientHandler,
                    deps: [
                        HttpBackend, AppConfig, HttpMockInterceptor,
                        [new Optional(), new Inject(HTTP_INTERCEPTORS)]
                    ],
                },
                { provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [Notifications] },
                { provide: RoutingService, useClass: RoutingService, deps: [Router] }
            ]
        };
    }
}
AribaCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    AribaCoreRoutingModule
                ],
                declarations: [NotFoundComponent],
                bootstrap: []
            },] },
];
/** @nocollapse */
AribaCoreModule.ctorParameters = () => [
    { type: AribaCoreModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: AppConfig }
];
function AribaCoreModule_tsickle_Closure_declarations() {
    /** @type {?} */
    AribaCoreModule.prototype.conf;
}
/**
 *
 * Add custom Mock functionality only and if we enabled this in the settings. I dont really want to
 * have NoopIntercepter in the chain
 *
 * @param {?} ngBackend
 * @param {?} config
 * @param {?} mockInterceptor
 * @param {?=} interceptors
 * @return {?}
 */
export function makeHttpClientHandler(ngBackend, config, mockInterceptor, interceptors = []) {
    if (config.getBoolean(AppConfig.ConnectionUseMockServer)) {
        mockInterceptor.loadRoutes();
        interceptors = [...interceptors, mockInterceptor];
    }
    if (!interceptors) {
        return ngBackend;
    }
    return interceptors.reduceRight((next, interceptor) => new MockInterceptorHandler(next, interceptor), ngBackend);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb3JlLyIsInNvdXJjZXMiOlsiYXJpYmEuY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFFSCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBRVIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFFZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3pGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsTUFBTSxDQUFDLHVCQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBUyxZQUFZLENBQUMsQ0FBQzs7OztBQWtCbkUsTUFBTTs7Ozs7SUFtQ0YsWUFBb0MsWUFBNkIsRUFBVSxJQUFlO1FBQWYsU0FBSSxHQUFKLElBQUksQ0FBVztLQUV6Rjs7Ozs7SUFuQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFpQyxFQUFFO1FBQzlDLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDUCxLQUFLO2dCQUNMLElBQUk7Z0JBQ0osV0FBVztnQkFDWCxhQUFhO2dCQUNiLG1CQUFtQjtnQkFFbkIsUUFBUTtnQkFFUixFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDdkM7b0JBQ0ksT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVTtvQkFDMUMsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUM7aUJBQzVDO2dCQUNEO29CQUNJLE9BQU8sRUFBRSxXQUFXO29CQUNwQixVQUFVLEVBQUUscUJBQXFCO29CQUNqQyxJQUFJLEVBQUU7d0JBQ0YsV0FBVyxFQUFFLFNBQVMsRUFBRSxtQkFBbUI7d0JBQzNDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3FCQUNsRDtpQkFDSjtnQkFFRCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFDO2dCQUM1RSxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQzthQUN0RTtTQUNKLENBQUM7S0FDTDs7O1lBM0NKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtpQkFDekI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBRWpDLFNBQVMsRUFBRSxFQUFFO2FBRWhCOzs7O1lBb0NxRCxlQUFlLHVCQUFwRCxRQUFRLFlBQUksUUFBUTtZQWhFN0IsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2RWpCLE1BQU0sZ0NBQWdDLFNBQXNCLEVBQUUsTUFBaUIsRUFDekMsZUFBb0MsRUFDcEMsZUFBeUMsRUFBRTtJQUM3RSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsWUFBWSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7S0FDckQ7SUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNwQjtJQUNELE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUMzQixDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3hGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtNZXRhLCBUaXRsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICAgIEFQUF9JTklUSUFMSVpFUixcbiAgICBFcnJvckhhbmRsZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdG9yLFxuICAgIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gICAgTmdNb2R1bGUsXG4gICAgT3B0aW9uYWwsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEhUVFBfSU5URVJDRVBUT1JTLFxuICAgIEh0dHBCYWNrZW5kLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgSHR0cEhhbmRsZXIsXG4gICAgSHR0cEludGVyY2VwdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtBcHBDb25maWcsIG1ha2VDb25maWd9IGZyb20gJy4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnLi9jb25maWcvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHtOb3RGb3VuZENvbXBvbmVudH0gZnJvbSAnLi9ub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudCc7XG5pbXBvcnQge1JvdXRpbmdTZXJ2aWNlfSBmcm9tICcuL3JvdXRpbmcvcm91dGluZy5zZXJ2aWNlJztcbmltcG9ydCB7R2xvYmFsRXJyb3JIYW5kbGVyfSBmcm9tICcuL2dsb2JhbC1lcnJvci1oYW5kbGVyJztcbmltcG9ydCB7QXJpYmFDb3JlUm91dGluZ01vZHVsZX0gZnJvbSAnLi9hcmliYS1jb3JlLXJvdXRpbmcubW9kdWxlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uc30gZnJvbSAnLi9tZXNzYWdpbmcvbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7SHR0cE1vY2tJbnRlcmNlcHRvciwgTW9ja0ludGVyY2VwdG9ySGFuZGxlcn0gZnJvbSAnLi9odHRwL2h0dHAtbW9jay1pbnRlcmNlcHRvcic7XG5pbXBvcnQge1Jlc291cmNlfSBmcm9tICcuL2RvbWFpbi9yZXNvdXJjZS5zZXJ2aWNlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgY29uc3QgVXNlckNvbmZpZyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVc2VyQ29uZmlnJyk7XG5cblxuLyoqXG4gKiBDb3JlIG1vZGUgaW5jbHVkZXMgYWxsIHNoYXJlZCBsb2dpYyBhY2Nyb3NzIHdob2xlIGFwcGxpY2F0aW9uXG4gKi9cbiAgICAvLyB0b2RvOiBmb3IgQU9UIHVzZSBleHBvcnRlZCBmdW5jdGlvbnMgZm9yIGZhY3RvcmllcyBpbnN0ZWFkcyB0aGlzIGlubGluZSBvbmVzLlxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICAgICAgQXJpYmFDb3JlUm91dGluZ01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbTm90Rm91bmRDb21wb25lbnRdLFxuXG4gICAgYm9vdHN0cmFwOiBbXVxuXG59KVxuZXhwb3J0IGNsYXNzIEFyaWJhQ29yZU1vZHVsZSB7XG5cbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFyaWJhQ29yZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIFRpdGxlLFxuICAgICAgICAgICAgICAgIE1ldGEsXG4gICAgICAgICAgICAgICAgRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9ucyxcbiAgICAgICAgICAgICAgICBIdHRwTW9ja0ludGVyY2VwdG9yLFxuXG4gICAgICAgICAgICAgICAgUmVzb3VyY2UsXG5cbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVXNlckNvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBBcHBDb25maWcsIHVzZUZhY3Rvcnk6IG1ha2VDb25maWcsXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtVc2VyQ29uZmlnLCBJbmplY3RvciwgRW52aXJvbm1lbnRdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IEh0dHBIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiBtYWtlSHR0cENsaWVudEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIEh0dHBCYWNrZW5kLCBBcHBDb25maWcsIEh0dHBNb2NrSW50ZXJjZXB0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmV3IE9wdGlvbmFsKCksIG5ldyBJbmplY3QoSFRUUF9JTlRFUkNFUFRPUlMpXVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VDbGFzczogR2xvYmFsRXJyb3JIYW5kbGVyLCBkZXBzOiBbTm90aWZpY2F0aW9uc119LFxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBSb3V0aW5nU2VydmljZSwgdXNlQ2xhc3M6IFJvdXRpbmdTZXJ2aWNlLCBkZXBzOiBbUm91dGVyXX1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogQXJpYmFDb3JlTW9kdWxlLCBwcml2YXRlIGNvbmY6IEFwcENvbmZpZykge1xuXG4gICAgfVxuXG59XG5cblxuLyoqXG4gKlxuICogQWRkIGN1c3RvbSBNb2NrIGZ1bmN0aW9uYWxpdHkgb25seSBhbmQgaWYgd2UgZW5hYmxlZCB0aGlzIGluIHRoZSBzZXR0aW5ncy4gSSBkb250IHJlYWxseSB3YW50IHRvXG4gKiBoYXZlIE5vb3BJbnRlcmNlcHRlciBpbiB0aGUgY2hhaW5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSHR0cENsaWVudEhhbmRsZXIobmdCYWNrZW5kOiBIdHRwQmFja2VuZCwgY29uZmlnOiBBcHBDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tJbnRlcmNlcHRvcjogSHR0cE1vY2tJbnRlcmNlcHRvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSB8IG51bGwgPSBbXSk6IEh0dHBIYW5kbGVyIHtcbiAgICBpZiAoY29uZmlnLmdldEJvb2xlYW4oQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyKSkge1xuXG4gICAgICAgIG1vY2tJbnRlcmNlcHRvci5sb2FkUm91dGVzKCk7XG4gICAgICAgIGludGVyY2VwdG9ycyA9IFsuLi5pbnRlcmNlcHRvcnMsIG1vY2tJbnRlcmNlcHRvcl07XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcmNlcHRvcnMpIHtcbiAgICAgICAgcmV0dXJuIG5nQmFja2VuZDtcbiAgICB9XG4gICAgcmV0dXJuIGludGVyY2VwdG9ycy5yZWR1Y2VSaWdodChcbiAgICAgICAgKG5leHQsIGludGVyY2VwdG9yKSA9PiBuZXcgTW9ja0ludGVyY2VwdG9ySGFuZGxlcihuZXh0LCBpbnRlcmNlcHRvciksIG5nQmFja2VuZCk7XG59XG5cblxuIl19