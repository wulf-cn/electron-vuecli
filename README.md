# ele

```test

vueCli + electron12.0.0 

调用C# DLL

electron-updater在线更新

```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



### Local development ( important )

```bash
npm run electron:serve
```

### Pack and go online ( important )

```bash
npm run electron:build
```

### Call C# DLL (xxx.vue call)

**Add DLL operations and so on** 

1. Put C#DLL into root directory  /** (public/resources ) */
2. Modification of documents /** Under the path ( src/background.js ) */

```text
在background.js里的(调用dll (模块) start)区域里添加dll操作

1. background.js:
+ const dllVariable = process.env.NODE_ENV === 'development' 
+   ? path.resolve("public/resources/DLL_file_name.dll") 
+   : path.resolve("resources/DLL_file_name.dll")

2. background.js:
+ let funVariable = edge.func({
+     assemblyFile:dllVariable,
+     typeName: 'DLL_file_name.Namespace',
+     methodName: 'DLL_file_name.MethodName'
+ })

3.background.js:
+ ipcMain.on('ipcObject',(event,arg) =>{
+     funVariable(arg,function(error,result){
+         if (error) throw error
+         console.log('Dll返回：' + result) 
+     })
+ })

4. xxx.vue:
<template>
  <div>
    <button @click="call">调用DLL</button>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    methods: {
        call(){
            var data = {
                "name":"小明",
                sex:"男",
                age:18
            }
            ipcRenderer.send("ipcObject" , JSON.stringify(data));
        },
    }
}

5. vue.config.js:
in ( pluginOptions/electronBuilder/builderOptions/extraResources ) add
+ {
+     "from": "./public/resources/DLL_file_name.dll",
+     "to": "./"
+ },
and so on
+ {
+  
+ }
</script>
```

### update-election

1. vue.config.js
   pluginOptions/electronBuilder/builderOptions
   publish --> "url":"http://..../bbbb/" 
   url是服务器的文件夹，文件夹下放打包出来的文件

background.js 76行 链接跟上面的一样
let feedUrl = "http://..../bbbb/"

2. 每次更新需要修改package.json下的version数值，打包放上服务器文件夹下





### electron打包配置在vue.config.js文件里，不懂的自寻方法

### .eslintrc Eslint规则问题，运行可能会报错就是这个Eslint问题，请自行解决，本人可以运行与打包
