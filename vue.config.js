const path = require('path');

function resolve(dir){
    return path.join(__dirname,dir);
}

module.exports = {
    publicPath:'./',
    devServer:{
        host:'0.0.0.0',
        port:'8081'
    },
    chainWebpack:config => {
        config.resolve.alias
        .set('@',resolve('src'))
        .set('src',resolve('src'))
        .set('common',resolve('src/common'))
        .set('components',resolve('src/components'));
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "productName": "AppDemo",
                "appId": "electron.demo",
                "directories":{
                    "output":"./dist"
                },
                "publish":[
                    {
                        "provider":"generic",
                        "url":"http://..../bbbb/"
                    }
                ],
                "extraResources": [
                    {
                      "from": "./public/resources/TestDll.dll",
                      "to": "./"
                    }
                ],
                "mac": {
                    "icon": "./public/app.ico",
                    "gatekeeperAssess": false
                },
                "win": {
                    "icon": "./public/app.ico"
                },
                "linux": {
                    "icon": "./public/app.ico"
                },
                "nsis": {
                    "oneClick": false,
                    "allowElevation": true,
                    "allowToChangeInstallationDirectory": true,
                    "installerIcon": "./public/app.ico",
                    "uninstallerIcon": "./public/app.ico",
                    "installerHeaderIcon": "./public/app.ico",
                    "createDesktopShortcut": true,
                    "createStartMenuShortcut": true,
                    "shortcutName": "APP"
                }
            },
            externals: ['electron-edge-js'], //electron-edge-js调用dll

            nodeIntegration: true,   ////处理（xxx.vue import { ipcRenderer } from 'electron'）__fs.existsSync is not a function

        }
    }
}

/**
 * "productName":"aDemo",//项目名，也是生成的安装文件名，即aDemo.exe
 * "copyright":"Copyright © 2019",//版权信息
 * 
 * "publish":[{"provider":"generic","url":"http://..../bbbb/"}],版本更新
 * 
 * "oneClick": false, // 是否一键安装
 * "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
 * "allowToChangeInstallationDirectory": true, // 允许修改安装目录
 * "installerIcon": "./shanqis.ico",// 安装图标
 * "uninstallerIcon": "./shanqis.ico",//卸载图标
 * "installerHeaderIcon": "./shanqis.ico", // 安装时头部图标
 * "createDesktopShortcut": true, // 创建桌面图标
 * "createStartMenuShortcut": true,// 创建开始菜单图标
 * "shortcutName": "demo", // 图标名称 
 */

//  "files": ["public/**/*"], //将public文件夹一并打包
