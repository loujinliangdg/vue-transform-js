<template>
    <div class="nav-box" id='nav_box' v-cloak v-show="navBar">
        <div class="nav-bar">
            <span class="back" v-show="showBack">
                <u class="icon iconfont" @click="previouspage">&#xe607;</u>
            </span>
            <span class="title" v-text="navTitle"></span>
            <slot class="extend"  name="extend"></slot>
        </div>
    </div>
</template>
<script>
export default {
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
        navTitle(){
            console.log(this.$route);
            return this.title || (this.$route && this.$route.name) || "变啦"
        }
    },
    methods:{
        previouspage(){
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
        boxBeforeHeight(){
            function setHeight(height){
                var css = `#nav_box.nav-box:before{
                        height:${height}px;
                    }`
                var style = document.createElement('style');
                style.innerHTML = css;
                document.head.appendChild(style)
            }
            if(!((window.Native && window.Native.cancelNativePage) || (sessionStorage.getItem("getUrlParams")))){
                setHeight(20)
                return
            }
            try{
                var height = sessionStorage.getStatusBarHeight || window.Native.getStatusBarHeight();
                setHeight(height)
            }catch(e){
                setHeight(20)
            }
            
        }
        
    },
    created(){
        this.boxBeforeHeight();
    }
}
</script>


<style lang="less" scoped>

    .nav-box{
        overflow:hidden;
        &:before{
            content:"";
            height:20PX;
            display:block;
        }
        .nav-bar{
            height:44PX;
            line-height:44PX;
            display:flex;
            align-items: center;
            position:relative;
            span.back{
                padding:0 10px;
                font-size:20PX;
                position:relative;
                z-index:2;
                margin-left:10px;
                u{
                    font-size:22PX;
                }
            }
            span.title{
                font-size:18PX;
                flex:1;
                text-align:center;
                position: absolute;
                left:0;
                width:100%;
                z-index:1;
            }
            
        }
    }
</style>


