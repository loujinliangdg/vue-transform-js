'use strict';

//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: "blButton",
  props: {
    title: {
      type: String,
      default: "确定"
    },
    size: {
      type: String,
      default: "large"
    },
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: "normal"
    },
    tips: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    clickMe: function clickMe() {
      this.$emit("click");
    },
    className: function className() {
      var tips = this.tips.replace(/\s+/g, "");
      if (this.disabled !== false) {
        if (tips !== "") {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " disable-button" +
            " bl-button-radius--" +
            this.radius +
            " bl-button-tips"
          );
        } else {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " disable-button" +
            " bl-button-radius--" +
            this.radius +
            " bl-button-lineH"
          );
        }
      } else {
        if (tips !== "") {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " bl-button-radius--" +
            this.radius +
            " bl-button-tips"
          );
        } else {
          return (
            "bl-button--" +
            this.type +
            " " +
            "bl-button-" +
            this.size +
            " bl-button-radius--" +
            this.radius +
            " bl-button-lineH"
          );
        }
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bl-button no-slectText",class:_vm.className(),on:{"click":_vm.clickMe}},[(_vm.tips==='')?_c('label',[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.loading),expression:"loading"}],staticClass:"bl-loading__spinner"},_vm._l((12),function(item,index){return _c('i',{key:index})}),0)]):_vm._e(),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),(_vm.tips!=='')?_c('span',{staticClass:"bl-tips"},[_vm._v(_vm._s(_vm.tips))]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = "data-v-86c1dc94";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

module.exports = __vue_component__;
