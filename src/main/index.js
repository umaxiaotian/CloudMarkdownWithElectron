import { app, Menu } from 'electron'
// ------------------------------------
// メニュー
// ------------------------------------
// メニューを準備する
const template = Menu.buildFromTemplate([
  {
    label: 'ファイル',
    submenu: [{
      label: '開く',
      accelerator: 'CmdOrCtrl+O',
      click (item, focusedWindow) {
        if (focusedWindow) {
          // レンダラープロセスへIPCでメッセージを送信してファイルを開く
          focusedWindow.webContents.send('main_file_message', 'open')
        }
      }
    }, {
      label: '保存',
      accelerator: 'CmdOrCtrl+S',
      click (item, focusedWindow) {
        if (focusedWindow) {
          // レンダラープロセスへIPCでメッセージを送信してファイルを保存
          focusedWindow.webContents.send('main_file_message', 'save')
        }
      }
    }, {
      label: '名前を付けて保存',
      accelerator: 'Shift+CmdOrCtrl+S',
      click (item, focusedWindow) {
        if (focusedWindow) {
          // レンダラープロセスへIPCでメッセージを送信してファイルを名前を付けて保存
          focusedWindow.webContents.send('main_file_message', 'saveas')
        }
      }
    }]
  },
  {
    label: '編集',
    submenu: [
      { role: 'undo', label: '元に戻す' },
      { role: 'redo', label: 'やり直す' },
      { type: 'separator' },
      { role: 'cut', label: '切り取り' },
      { role: 'copy', label: 'コピー' },
      { role: 'paste', label: '貼り付け' }
    ]
  },
  {
    label: '表示',
    submenu: [
      { role: 'reload', label: '再読み込み' },
      { role: 'forceReload', label: '強制的に再読み込み' },
      { role: 'toggleDevTools', label: '開発者ツールを表示' },
      { type: 'separator' },
      { role: 'resetZoom', label: '実際のサイズ' },
      { role: 'zoomIn', label: '拡大' },
      { role: 'zoomOut', label: '縮小' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'フルスクリーン' }
    ]
  },
  {
    label: 'ウィンドウ',
    submenu: [
      { role: 'minimize', label: '最小化' },
      { role: 'zoom', label: 'ズーム' }
    ]
  },
  {
    label: 'ヘルプ',
    submenu: [
      { label: `${app.name} ヘルプ` } // ToDo
    ]
  }
])

// メニューを適用する
Menu.setApplicationMenu(template)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// Load here all startup windows
require('./mainWindow')
