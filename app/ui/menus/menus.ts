/// <reference types="electron" />
/// <reference path="../spa/interop.d.ts" />
// import { ipcRenderer } from "electron";
export class MenuItems {
    menuTemplate: Array<any> = []
    constructor() {
        this.menuTemplate = [
            {
                label: 'File',
                accelerator: 'Alt+F',
                submenu: [
                    {
                        label: 'Refresh',
                        accelerator: 'CmdOrCtrl+E',
                        click: () => this.sendMessage("menu.File.OnNew")
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Exit',
                        accelerator: (() => {
                            if (process.platform == 'darwin')
                                return 'Command+Q';
                            else
                                return 'Alt+F4';
                        })(),
                        click: () => this.sendMessage("menu.App.Quit")
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        label: 'Settings',
                        click: () => this.sendMessage("menu.View.OnSettings")
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Reload',
                        accelerator: 'CmdOrCtrl+R',
                        click: (item, focusedWindow) => {
                            if (focusedWindow)
                                focusedWindow.reload();
                        }
                    },
                    {
                        label: 'Toggle Full Screen',
                        accelerator: (() => {
                            if (process.platform == 'darwin')
                                return 'Ctrl+Command+F';
                            else
                                return 'F11';
                        })(),
                        click: (item, focusedWindow) => {
                            if (focusedWindow)
                                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                        }
                    },
                    {
                        label: 'Toggle Developer Tools',
                        accelerator: (() => {
                            if (process.platform == 'darwin')
                                return 'Alt+Command+I';
                            else
                                return 'Ctrl+Shift+I';
                        })(),
                        click: (item, focusedWindow) => {
                            if (focusedWindow)
                                focusedWindow.toggleDevTools();
                        }
                    },
                ]
            },
            {
                label: 'Window',
                role: 'window',
                submenu: [
                    {
                        label: 'Minimize',
                        accelerator: 'CmdOrCtrl+M',
                        role: 'minimize'
                    },
                    {
                        label: 'Close',
                        accelerator: 'CmdOrCtrl+W',
                        role: 'close'
                    },
                ]
            }
            // ,
            // {
            //     label: 'Help',
            //     role: 'help',
            //     submenu: [
            //         {
            //             label: 'Learn More',
            //             click: () => {
            //                 require('electron').shell.openExternal('http://electron.atom.io')
            //             }
            //         },
            //     ]
            // },
        ];
        if (process.platform == 'darwin') {
            var name = "Cloud Nine";
            this.menuTemplate.unshift({
                label: name,
                submenu: [
                    {
                        label: 'About ' + name,
                        role: 'about'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Services',
                        role: 'services',
                        submenu: []
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Hide ' + name,
                        accelerator: 'Command+H',
                        role: 'hide'
                    },
                    {
                        label: 'Hide Others',
                        accelerator: 'Command+Alt+H',
                        role: 'hideothers'
                    },
                    {
                        label: 'Show All',
                        role: 'unhide'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Quit',
                        accelerator: 'Command+Q',
                        click: () => this.sendMessage("menu.App.Quit")
                    },
                ]
            });
            // Window menu.
            this.menuTemplate[3].submenu.push(
                {
                    type: 'separator'
                },
                {
                    label: 'Bring All to Front',
                    role: 'front'
                });
        }
    }

    public sendMessage(id: string) {
        if (ipcRenderer != null) {
            ipcRenderer.send(id);
        }
        return true;
    }
}
