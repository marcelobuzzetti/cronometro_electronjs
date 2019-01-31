const electron = require('electron');
const { Tray, Menu, app } = electron;

const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Sair',
        click: () => {
            app.quit();
        }
    }
]);

class ChronoTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath); //Aqui estou chamando o construtor do Tray
        this.mainWindow = mainWindow;
        this.on('click', this.Onclick.bind(this));
        this.setToolTip('It is an Electron App');
        this.setContextMenu(contextMenu);
    }

    Onclick(event, bounds) {
        //coordenadas do icone da bandeja
        const { x, y } = bounds;
        //capturar as dimensões da janela( largura e altura)
        const { width, height } = this.mainWindow.getBounds();
        
        if(this.mainWindow.isVisible()){
            this.mainWindow.hide();
        } else {
            this.mainWindow.setBounds({
                x: x >= 400 ? Math.round(x - width/2) : x,
                y: y >= 300 ? y - height : y,
                width,
                height
            });
            this.mainWindow.show();
        }
    }
}



module.exports = ChronoTray;