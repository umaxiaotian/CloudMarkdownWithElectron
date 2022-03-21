import { ipcMain, dialog } from 'electron'
import BrowserWinHandler from './BrowserWinHandler'
const fs = require('fs')
const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000

})

// ------------------------------------
// ファンクションメニュー
// ------------------------------------
// ファイルを開く
ipcMain.handle('file-open', async event => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [
      { name: 'マークダウン', extensions: ['md'] }
    ]
  })

  if (canceled) return { canceled, data: [] }

  const data = filePaths.map(filePath =>
    fs.readFileSync(filePath, { encoding: 'utf8' })
  )
  const returnData = [data, filePaths]
  return { canceled, returnData }
})

// 名前を付けて保存
ipcMain.handle('save', async (event, data) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [
      { name: 'マークダウン', extensions: ['md'] }
    ]
  })

  if (canceled) return

  fs.writeFileSync(filePath, data)
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

export default winHandler
