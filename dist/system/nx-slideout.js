System.register(['aurelia-templating', 'aurelia-binding', 'aurelia-dependency-injection', 'aurelia-pal', 'slideout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, aurelia_pal_1, Slideout;
    var defaultSettings, NxSlideout;
    // Pass in the objects to merge as arguments.
    // For a deep extend, set the first argument to `true`.
    function extend(deep, target) {
        var objects = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            objects[_i - 2] = arguments[_i];
        }
        // Variables
        var extended = target;
        var length = arguments.length;
        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
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
        for (var i = 0; i < length; i++) {
            var obj = objects[i];
            merge(obj);
        }
        return extended;
    }
    return {
        setters:[
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (Slideout_1) {
                Slideout = Slideout_1;
            }],
        execute: function() {
            ;
            exports_1("defaultSettings", defaultSettings = {
                fx: 'ease',
                duration: 300,
                tolerance: 70,
                padding: 250,
                side: 'left',
                closeOnClick: true
            });
            NxSlideout = (function () {
                function NxSlideout(_element) {
                    this._element = _element;
                    this.opened = false;
                }
                NxSlideout.prototype.propertyChanged = function (propertyName, newValue, oldValue) {
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
                };
                NxSlideout.prototype.openedChanged = function (newValue, oldValue) {
                    // console.log('opened changed!');
                    if (newValue !== oldValue && this._slideout) {
                        if (newValue && !this._slideout.isOpen()) {
                            this.open();
                        }
                        else if (!newValue && this._slideout.isOpen()) {
                            this.close();
                        }
                    }
                };
                NxSlideout.prototype.attached = function () {
                    this.init();
                };
                NxSlideout.prototype.detached = function () {
                    this.destroy();
                };
                /**
                 * Open the slideout.
                 *
                 * @memberOf NxSlideout
                 */
                NxSlideout.prototype.open = function () {
                    if (this._slideout) {
                        this._slideout.open();
                        this.opened = this._slideout.isOpen();
                    }
                };
                /**
                 * Close the slideout.
                 *
                 * @memberOf NxSlideout
                 */
                NxSlideout.prototype.close = function () {
                    if (this._slideout) {
                        this._slideout.close();
                        this.opened = this._slideout.isOpen();
                    }
                };
                /**
                 * Toggle the slideout: close it if opened, or open it if closed.
                 *
                 * @memberOf NxSlideout
                 */
                NxSlideout.prototype.toggle = function () {
                    if (this._slideout) {
                        this._slideout.toggle();
                        this.opened = this._slideout.isOpen();
                    }
                };
                NxSlideout.prototype.init = function () {
                    if (this._slideout) {
                        return;
                    }
                    var bindableOptions = {
                        fx: this.fx,
                        duration: this.duration,
                        tolerance: this.tolerance,
                        padding: this.padding,
                        side: this.side,
                        closeOnClick: this.closeOnClick
                    };
                    this._options = extend(/*deep*/ false, {}, bindableOptions, defaultSettings);
                    var libOptions = this._options;
                    if (typeof this.target === 'object') {
                        libOptions.panel = this.target;
                    }
                    else if (typeof this.target === 'string') {
                        var results = aurelia_pal_1.DOM.querySelectorAll(this.target);
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
                };
                NxSlideout.prototype.destroy = function () {
                    if (this._slideout) {
                        this.detachEventHandlers();
                        this._slideout.destroy();
                        this._slideout = undefined;
                    }
                };
                NxSlideout.prototype.attachEventHandlers = function () {
                    if (this._options.closeOnClick) {
                        this._clickTarget = this.target;
                        if (typeof this.clickTarget === 'object') {
                            this._clickTarget = this.clickTarget;
                        }
                        else if (typeof this.clickTarget === 'string') {
                            var results = aurelia_pal_1.DOM.querySelectorAll(this.clickTarget);
                            if (results.length) {
                                this._clickTarget = results[0];
                            }
                        }
                        this._clickTarget.addEventListener('click', this.contentOnClick.bind(this));
                    }
                };
                NxSlideout.prototype.detachEventHandlers = function () {
                    if (this._clickTarget) {
                        this._clickTarget.removeEventListener('click', this.contentOnClick);
                    }
                };
                NxSlideout.prototype.contentOnClick = function () {
                    if (this._slideout === undefined) {
                        return;
                    }
                    if (this._slideout.isOpen()) {
                        this._slideout.close();
                    }
                };
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "target", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "fx", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "duration", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "tolerance", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "padding", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "side", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "closeOnClick", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
                ], NxSlideout.prototype, "opened", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
                ], NxSlideout.prototype, "clickTarget", void 0);
                NxSlideout = __decorate([
                    aurelia_templating_1.customElement('nx-slideout'),
                    aurelia_templating_1.inlineView("\n  <template>\n    <require from=\"./style.css\"></require>\n    <slot></slot>\n  </template>\n"),
                    aurelia_dependency_injection_1.inject(aurelia_pal_1.DOM.Element)
                ], NxSlideout);
                return NxSlideout;
            }());
            exports_1("NxSlideout", NxSlideout);
        }
    }
});
