# .vue-transform-.js
vue组件编译成js模块 以便以第三方模块重复利用
### 已配置:
style:  
```
less
require('postcss-import')
require('postcss-url')
require('autoprefixer')
```
script:  
`
buble  
`
buble is look [@rollup/plugin-buble][1]

[1]:https://buble.surge.sh/guide/

### 注意：
1. npm install  前将node切到8.9.0左右 （因为我在12.13.0时npm install不成功）
2. npm run build 前将node切到12.13.0左右 （因为我在8.9.0运行 npm run build 不成功）

### 运行：

```
cd .vue-transform-.js
npm install
npm run build
```
运行结果：
```
/Users/11/workspace/github_source/vue-transform-js/.vue-transform-.js/src/components/blButton/index.vue → lib/esm/blButton.js, lib/blButton.js, lib/iife/blButton.js...
created lib/esm/blButton.js, lib/blButton.js, lib/iife/blButton.js in 354ms

/Users/11/workspace/github_source/vue-transform-js/.vue-transform-.js/src/components/hellow/index.vue → lib/esm/hellow.js, lib/hellow.js, lib/iife/hellow.js...
created lib/esm/hellow.js, lib/hellow.js, lib/iife/hellow.js in 73ms

/Users/11/workspace/github_source/vue-transform-js/.vue-transform-.js/src/components/navBar/index.vue → lib/esm/navBar.js, lib/navBar.js, lib/iife/navBar.js...
created lib/esm/navBar.js, lib/navBar.js, lib/iife/navBar.js in 105ms
----------- 开始创建index.js --------------
----------- index.js创建完成 --------------
```

### 使用：app.vue
```
<!-- 使用例子 -->
<!-- 模块名字 相当于第三方模块的名字（存在于node_modules下的文件夹名字）便如 vant element iview... -->
import Vue from 'vue'
import '模块名字/lib/style/style.css'
import {hellow,blButton,navBar} from '模块名字/lib/esm/index'

Vue.component(hellow.name,hellow)
Vue.component(blButton.name,blButton)
Vue.component(navBar.name,navBar)
```
在某页面中使用xxx.vue
```
<template>
    <div>
        <hellow></hellow>
    </div>
</template>
<script>

</script>
```
