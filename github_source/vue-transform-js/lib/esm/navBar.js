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
    name:"navBar",
    props:{
        navBar:{
            type:Boolean,
            default:true
        },
        showBack:{
            type:Boolean,
            default:true
        },
        title:{
            type:String
        },
    },
     computed:{
        navTitle: function navTitle(){
            console.log(this.$route);
            return this.title || (this.$route && this.$route.name) || "变啦"
        }
    },
    methods:{
        previouspage: function previouspage(){
            var _self = this;
            _self.$emit("callback",_self.$route.query.close);
            if(!_self.$route.query.close){
                window.isBack = true;
                window.history.back(-1);
            }else{
                if(window.Native && window.Native.getUrlParams){
                    window.Native.cancelNativePage();
                }else{
                    window.webkit.messageHandlers.cancelNativePage.postMessage({});
                }
            }
        },
        boxBeforeHeight: function boxBeforeHeight(){
            function setHeight(height){
                var css = "#nav_box.nav-box:before{\n                        height:" + height + "px;\n                    }";
                var style = document.createElement('style');
                style.innerHTML = css;
                document.head.appendChild(style);
            }
            if(!((window.Native && window.Native.cancelNativePage) || (sessionStorage.getItem("getUrlParams")))){
                setHeight(20);
                return
            }
            try{
                var height = sessionStorage.getStatusBarHeight || window.Native.getStatusBarHeight();
                setHeight(height);
            }catch(e){
                setHeight(20);
            }
            
        }
        
    },
    created: function created(){
        this.boxBeforeHeight();
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.navBar),expression:"navBar"}],staticClass:"nav-box",attrs:{"id":"nav_box"}},[_c('div',{staticClass:"nav-bar"},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showBack),expression:"showBack"}],staticClass:"back"},[_c('u',{staticClass:"icon iconfont",on:{"click":_vm.previouspage}},[_vm._v("")])]),_vm._v(" "),_c('span',{staticClass:"title",domProps:{"textContent":_vm._s(_vm.navTitle)}}),_vm._v(" "),_vm._t("extend")],2)])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = "data-v-3f115ea6";
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

export default __vue_component__;
