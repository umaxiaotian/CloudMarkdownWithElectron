import BrowserWinHandler from './BrowserWinHandler'
import { ipcMain,dialog } from 'electron'
const fs = require('fs')
const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000

})

// ------------------------------------
// ファンクションメニュー
// ------------------------------------
ipcMain.handle('file-open', async (event) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [
      { name: 'マークダウン', extensions: ['md'] }
    ]
  })

  if (canceled) return { canceled, data: [] }

  const data = filePaths.map((filePath) =>
    fs.readFileSync(filePath, { encoding: 'utf8' })
  )
  let returnData = [data,filePaths]
  return { canceled, returnData }
})
//指定したファイルを読み込む

 


winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

export default winHandler
