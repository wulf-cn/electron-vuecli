'use strict'

import { app, protocol, BrowserWindow , Menu ,ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

/** App更新 (模块) */
import { updateHandle } from "./common/js/Update"  


/** 调用dll (模块) start */
var edge = require('electron-edge-js')  
import path from 'path' 

const assFile = process.env.NODE_ENV === 'development' 
    ? path.resolve("public/resources/TestDll.dll") 
    : path.resolve("resources/TestDll.dll")

let call = edge.func({
    //assemblyFile: path.resolve("public/resources/TestDll.dll"),     // web   electron:serve
    //assemblyFile: path.resolve("resources/TestDll.dll"),            // local electron:build
    assemblyFile:assFile,
    typeName: 'TestDll.LxdTest',
    methodName: 'OnOpenMsgBox'
})
ipcMain.on('calltest',(event,arg) =>{
    call(arg,function(error,result){
        if (error) throw error
        console.log('Dll返回：' + result) 
    })
})
/** 调用dll (模块) end */




// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 620,
    webPreferences: {
        webSecurity: false, //取消跨域限制
        nodeIntegration:true, //开启node
        contextIsolation: false,//处理（xxx.vue import { ipcRenderer } from 'electron'）__dirname is not defined

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    },
    // eslint-disable-next-line no-undef
    icon: `${__static}/app.ico`
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

    createMenu()


    // 设置更新
    let feedUrl = "http://..../bbbb/";
    // 检查版本更新
    updateHandle(win,feedUrl);

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


function createMenu(){
    //darwin表示macOS，针对macOS的设置
    if (process.platform === 'darwin') {
        const template = [
        {
            label: 'App Demo',
            submenu: [
                {
                    role: 'about'
                },
                {
                    role: 'quit'
                }]
        }]
        let menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    } else {
        // windows及linux系统
        Menu.setApplicationMenu(null)
    }
}
