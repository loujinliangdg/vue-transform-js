import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import buble from '@rollup/plugin-buble'

const fs = require('fs');
const path = require('path');
const outputDirName = 'lib';

const plugins = [
    css({
        output:path.resolve(outputDirName,'style','style.css')
    }),
    vue({
        css: false,
        style: {
            preprocessOptions: { less: {} },
            postcssPlugins:[
                require('postcss-import'),
                require('postcss-url'),
                require('autoprefixer'),
            ]
        },
        template:{
            isProduction:true
        }
    }),
    buble({
        modules:false
    })
]
var componentsDir = path.resolve('src','components');
var config = [];

var files = fs.readdirSync(componentsDir);
files = files.filter((item) =>{
    var fileStat = fs.statSync(path.join(componentsDir,item));
    return fileStat.isDirectory();
})
config = files.map((item) =>{
    return {
        input:path.join(componentsDir,item,'index.vue'),
        output: [
            {
                format: 'esm',
                file: `${outputDirName}/esm/${item}.js`
            },
            {
                format: 'cjs',
                file: `${outputDirName}/${item}.js`
            },
            {
                format: 'iife',
                name:item,
                file: `${outputDirName}/iife/${item}.js`
            },
        ],
        plugins: plugins
    }
})

setTimeout(() =>{
    console.log('----------- 开始创建index.js --------------')
    var esmStr = "";
    var cjsStr = "";
    // esmStr -> dist/esm/index.js
    files.forEach((item) =>{
        esmStr += `import ${item} from './${item}.js'\n`
    })
    esmStr += 'export {\n'
    files.forEach((item) =>{
        esmStr += `\t${item},\n`
    })
    esmStr += '}'
    // cjsStr -> dist/index.js
    files.forEach((item) =>{
        cjsStr += `const ${item} = require('./${item}.js')\n`
    })
    cjsStr += 'module.exports = {\n'
    files.forEach((item) =>{
        cjsStr += `\t${item},\n`
    })
    cjsStr += '}'

    try {
        fs.writeFileSync(path.resolve(outputDirName,'esm','index.js'), esmStr);
        fs.writeFileSync(path.resolve(outputDirName,'index.js'), cjsStr);
        console.log('----------- index.js创建完成 --------------')
    } catch (error) {
       throw error; 
    }

},1000)

export default config
