const { app, BrowserWindow } = require('electron');
const path = require('path');

// Determina si la aplicación se está ejecutando en modo de desarrollo o producción
const isDev = !app.isPackaged;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false
  });

  mainWindow.maximize();

  // Muestra la ventana principal cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); // Carga la aplicación React en modo de desarrollo
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html')); // Carga la aplicación React empaquetada en producción
  }
}

app.whenReady().then(createWindow); // Crea la ventana principal cuando la aplicación esté lista

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit(); // Cierra la aplicación cuando todas las ventanas estén cerradas, excepto en macOS
});