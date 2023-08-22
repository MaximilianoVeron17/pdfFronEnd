import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import fs from "node:fs"
import os from "node:os"

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 1024,
    height: 768
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

//-------------------- print function -----------------

// List of all options at -
// https://www.electronjs.org/docs/latest/api/web-contents#contentsprintoptions-callback
const printOptions = {
  silent: true,
  printBackground: true,
  color: true,
  margin: {
    marginType: "printableArea",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
};

//handle print
ipcMain.handle("printComponent", async (event, url) => {
  const win = new BrowserWindow({ show: false });

  win.webContents.on("did-finish-load", () => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    win.webContents.printToPDF({}).then(data => {
      fs.writeFile(pdfPath, data, (error) => {
        if (error) throw error
        console.log(`Wrote PDF successfully to ${pdfPath}`)
      })
    }).catch(error => {
      console.log(`Failed to write PDF to ${pdfPath}: `, error)
    })
  });

  await win.loadURL(url);
  return "shown print dialog";
});

//handle preview
ipcMain.handle("previewComponent", async (event, url) => {
  let win = new BrowserWindow({
    title: "Print Preview",
    show: false,
    autoHideMenuBar: true
  });

  win.webContents.once("did-finish-load", () => {
    win.webContents.printToPDF(printOptions).then((data) => {
      const buf = Buffer.from(data);
      
      const dataforuse = buf.toString("base64");
      const url = "data:application/pdf;base64," + dataforuse;

      win.webContents.on("ready-to-show", () => {
        win.once("page-title-updated", (e) => e.preventDefault());
        win.show();
      });

      win.webContents.on("closed", () => win = null);
      win.loadURL(url);
    }).catch((error) => {
      console.log(error);
    });
  });

  await win.loadURL(url);
  return "shown preview window";
});


app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)
