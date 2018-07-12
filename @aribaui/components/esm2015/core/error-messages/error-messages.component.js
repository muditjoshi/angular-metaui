/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isPresent } from '@aribaui/core';
import { ErrorManagerService } from '../../core/error-manager.service';
/**
 * ErrorMessagesComponent is used by form's component like FormRow to print its validation errors.
 * Its  based on ModelDriven (Reactive forms) and it reads errors from FormControl
 *
 *
 *
 */
export class ErrorMessagesComponent {
    /**
     * @param {?} errManager
     */
    constructor(errManager) {
        this.errManager = errManager;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    hasMessage() {
        let /** @type {?} */ msg = this.errorMsg;
        return isPresent(msg);
    }
    /**
     * Retrieve a messages if any registered by added validators
     *
     * @return {?}
     */
    get errorMsg() {
        for (let /** @type {?} */ propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.errManager.errorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
    }
    /**
     *
     * Show errors? We currently shows errors if the control is not valid, it was touched by user.
     * Most of the type on blur event  and at last its not pristine anymore (its dirty)
     *
     * @return {?}
     */
    showErrors() {
        return !this.control.valid && !this.control.pristine && this.control.touched;
    }
}
ErrorMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: 'a-error-messages',
                template: `
            <div class="ui-g">
                    <small *ngIf="hasMessage()"
                        class="ui-g-12 ui-message ui-messages-error ui-corner-all">
                        {{ errorMsg }}
                    </small>
            </div>
    `,
                styles: [``]
            },] },
];
/** @nocollapse */
ErrorMessagesComponent.ctorParameters = () => [
    { type: ErrorManagerService }
];
ErrorMessagesComponent.propDecorators = {
    control: [{ type: Input }]
};
function ErrorMessagesComponent_tsickle_Closure_declarations() {
    /**
     * Current form FormControll to check for Errors
     * @type {?}
     */
    ErrorMessagesComponent.prototype.control;
    /** @type {?} */
    ErrorMessagesComponent.prototype.errManager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZXJyb3ItbWVzc2FnZXMvZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7O0FBcUJyRSxNQUFNOzs7O0lBVUYsWUFBb0IsVUFBK0I7UUFBL0IsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7S0FFbEQ7Ozs7SUFFRCxRQUFRO0tBR1A7Ozs7SUFHRCxVQUFVO1FBRU4scUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6Qjs7Ozs7O0lBTUQsSUFBSSxRQUFRO1FBRVIsR0FBRyxDQUFDLENBQUMscUJBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1NBQ0o7S0FDSjs7Ozs7Ozs7SUFRRCxVQUFVO1FBRU4sTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUNoRjs7O1lBN0RKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7S0FPVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDZjs7OztZQXBCTyxtQkFBbUI7OztzQkEyQnRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RXJyb3JNYW5hZ2VyU2VydmljZX0gZnJvbSAnLi4vLi4vY29yZS9lcnJvci1tYW5hZ2VyLnNlcnZpY2UnO1xuXG4vKipcbiAqIEVycm9yTWVzc2FnZXNDb21wb25lbnQgaXMgdXNlZCBieSBmb3JtJ3MgY29tcG9uZW50IGxpa2UgRm9ybVJvdyB0byBwcmludCBpdHMgdmFsaWRhdGlvbiBlcnJvcnMuXG4gKiBJdHMgIGJhc2VkIG9uIE1vZGVsRHJpdmVuIChSZWFjdGl2ZSBmb3JtcykgYW5kIGl0IHJlYWRzIGVycm9ycyBmcm9tIEZvcm1Db250cm9sXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYS1lcnJvci1tZXNzYWdlcycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzbWFsbCAqbmdJZj1cImhhc01lc3NhZ2UoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLWctMTIgdWktbWVzc2FnZSB1aS1tZXNzYWdlcy1lcnJvciB1aS1jb3JuZXItYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBlcnJvck1zZyB9fVxuICAgICAgICAgICAgICAgICAgICA8L3NtYWxsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBmb3JtIEZvcm1Db250cm9sbCB0byBjaGVjayBmb3IgRXJyb3JzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb250cm9sOiBGb3JtQ29udHJvbDtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlcnJNYW5hZ2VyOiBFcnJvck1hbmFnZXJTZXJ2aWNlKVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuXG4gICAgfVxuXG5cbiAgICBoYXNNZXNzYWdlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBtc2cgPSB0aGlzLmVycm9yTXNnO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KG1zZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgYSBtZXNzYWdlcyBpZiBhbnkgcmVnaXN0ZXJlZCBieSBhZGRlZCB2YWxpZGF0b3JzXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgZXJyb3JNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gdGhpcy5jb250cm9sLmVycm9ycykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbC5lcnJvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiB0aGlzLmNvbnRyb2wudG91Y2hlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVyck1hbmFnZXIuZXJyb3JNZXNzYWdlKHByb3BlcnR5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLmVycm9yc1twcm9wZXJ0eU5hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2hvdyBlcnJvcnM/IFdlIGN1cnJlbnRseSBzaG93cyBlcnJvcnMgaWYgdGhlIGNvbnRyb2wgaXMgbm90IHZhbGlkLCBpdCB3YXMgdG91Y2hlZCBieSB1c2VyLlxuICAgICAqIE1vc3Qgb2YgdGhlIHR5cGUgb24gYmx1ciBldmVudCAgYW5kIGF0IGxhc3QgaXRzIG5vdCBwcmlzdGluZSBhbnltb3JlIChpdHMgZGlydHkpXG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93RXJyb3JzKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jb250cm9sLnZhbGlkICYmICF0aGlzLmNvbnRyb2wucHJpc3RpbmUgJiYgdGhpcy5jb250cm9sLnRvdWNoZWQ7XG4gICAgfVxuXG59XG4iXX0=