var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, inlineView, bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import * as Slideout from 'slideout';
// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
function extend(deep, target, ...objects) {
    // Variables
    const extended = target;
    const length = arguments.length;
    // Merge the object into the extended object
    const merge = function (obj) {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(/*deep*/ true, extended[prop], obj[prop]);
                }
                else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    // Loop through each object and conduct a merge
    for (let i = 0; i < length; i++) {
        const obj = objects[i];
        merge(obj);
    }
    return extended;
}
;
export let defaultSettings = {
    fx: 'ease',
    duration: 300,
    tolerance: 70,
    padding: 250,
    side: 'left',
    closeOnClick: true
};
export let NxSlideout = class NxSlideout {
    constructor(_element) {
        this._element = _element;
        this.opened = false;
    }
    propertyChanged(propertyName, newValue, oldValue) {
        // console.log(`propertyChanged called for ${propertyName}! newValue = ${newValue}, oldValue = ${oldValue}`);
        // ignore properties that are truly dynamic
        if (['opened'].indexOf(propertyName) !== -1) {
            return;
        }
        if (newValue !== oldValue && this._slideout) {
            // console.log('propertyChanged is recreating!');
            this.destroy();
            this.init();
        }
    }
    openedChanged(newValue, oldValue) {
        // console.log('opened changed!');
        if (newValue !== oldValue && this._slideout) {
            if (newValue && !this._slideout.isOpen()) {
                this.open();
            }
            else if (!newValue && this._slideout.isOpen()) {
                this.close();
            }
        }
    }
    attached() {
        this.init();
    }
    detached() {
        this.destroy();
    }
    /**
     * Open the slideout.
     *
     * @memberOf NxSlideout
     */
    open() {
        if (this._slideout) {
            this._slideout.open();
            this.opened = this._slideout.isOpen();
        }
    }
    /**
     * Close the slideout.
     *
     * @memberOf NxSlideout
     */
    close() {
        if (this._slideout) {
            this._slideout.close();
            this.opened = this._slideout.isOpen();
        }
    }
    /**
     * Toggle the slideout: close it if opened, or open it if closed.
     *
     * @memberOf NxSlideout
     */
    toggle() {
        if (this._slideout) {
            this._slideout.toggle();
            this.opened = this._slideout.isOpen();
        }
    }
    init() {
        if (this._slideout) {
            return;
        }
        const bindableOptions = {
            fx: this.fx,
            duration: this.duration,
            tolerance: this.tolerance,
            padding: this.padding,
            side: this.side,
            closeOnClick: this.closeOnClick
        };
        this._options = extend(/*deep*/ false, {}, bindableOptions, defaultSettings);
        const libOptions = this._options;
        if (typeof this.target === 'object') {
            libOptions.panel = this.target;
        }
        else if (typeof this.target === 'string') {
            const results = DOM.querySelectorAll(this.target);
            if (results.length) {
                libOptions.panel = results[0];
            }
        }
        if (!libOptions.panel) {
            throw new Error('Cannot find target element.');
        }
        libOptions.menu = this._element;
        this.attachEventHandlers();
        this._slideout = new Slideout(libOptions);
        if (this.opened) {
            this.open();
        }
        // console.log('inited!');
    }
    destroy() {
        if (this._slideout) {
            this.detachEventHandlers();
            this._slideout.destroy();
            this._slideout = undefined;
        }
    }
    attachEventHandlers() {
        if (this._options.closeOnClick) {
            this._clickTarget = this.target;
            if (typeof this.clickTarget === 'object') {
                this._clickTarget = this.clickTarget;
            }
            else if (typeof this.clickTarget === 'string') {
                const results = DOM.querySelectorAll(this.clickTarget);
                if (results.length) {
                    this._clickTarget = results[0];
                }
            }
            this._clickTarget.addEventListener('click', this.contentOnClick.bind(this));
        }
    }
    detachEventHandlers() {
        if (this._clickTarget) {
            this._clickTarget.removeEventListener('click', this.contentOnClick);
        }
    }
    contentOnClick() {
        if (this._slideout === undefined) {
            return;
        }
        if (this._slideout.isOpen()) {
            this._slideout.close();
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "target", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "fx", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "duration", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "tolerance", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "padding", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "side", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "closeOnClick", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], NxSlideout.prototype, "opened", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "clickTarget", void 0);
NxSlideout = __decorate([
    customElement('nx-slideout'),
    inlineView(`
  <template>
    <require from="./style.css"></require>
    <slot></slot>
  </template>
`),
    inject(DOM.Element)
], NxSlideout);
