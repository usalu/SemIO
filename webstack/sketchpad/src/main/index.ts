import {
    app,
    shell,
    BrowserWindow,
    ipcMain,
    IpcMainEvent,
    dialog,
    IpcMainInvokeEvent
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { readFileSync, writeFile } from 'fs'
import { c } from 'vite/dist/node/types.d-AKzkD8vd'

function createWindow(): void {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        frame: false,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })

    // Disable the default menu
    // mainWindow.setMenu(null);

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    ipcMain.handle('minimize-window', (event) => {
        const window = BrowserWindow.getFocusedWindow()
        if (window) window.minimize()
    })

    ipcMain.handle('maximize-window', (event) => {
        const window = BrowserWindow.getFocusedWindow()
        if (window) {
            if (window.isMaximized()) {
                window.unmaximize()
            } else {
                window.maximize()
            }
        }
    })

    ipcMain.handle('close-window', (event) => {
        const window = BrowserWindow.getFocusedWindow()
        if (window) window.close()
    })

    ipcMain.handle('open-kit', async () => {
        const directory = await dialog.showOpenDialog({
            properties: ['openDirectory']
        })
        // TODO: call local graphql server
        return null
    })

    ipcMain.handle('reload-kit', async () => {
        // TODO: implement
        return null
    })

    ipcMain.handle('open-draft', async (event: IpcMainInvokeEvent) => {
        const result = await dialog.showOpenDialog({
            properties: ['openFile'],
            defaultPath: 'formation.draft',
            filters: [{ name: 'DRAFT', extensions: ['draft'] }]
        })
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0]
            const data = readFileSync(filePath)
            return data.toString()
        }
        return ''
    })

    ipcMain.handle('save-draft', (event: IpcMainInvokeEvent, draftJson: string) => {
        return dialog
            .showSaveDialog({
                title: 'Save Draft',
                defaultPath: 'formation.draft',
                filters: [{ name: 'DRAFT', extensions: ['draft'] }]
            })
            .then((result) => {
                if (!result.canceled && result.filePath) {
                    return new Promise((resolve, reject) => {
                        writeFile(result.filePath, draftJson, (err) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(result.filePath)
                            }
                        })
                    })
                }
            })
    })

    ipcMain.handle('get-file-buffer', async (event, filePath) => {
        const data = readFileSync(filePath)
        return data
    })

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
