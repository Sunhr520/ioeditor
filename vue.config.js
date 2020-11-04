module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.example.app",
                "productName":"ioeditor",//项目名，也是生成的安装文件名
                "copyright":"Copyright © 2020",//版权信息
                "win":{//win相关配置
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                // "ia32"//32位
                            ]
                        }
                    ]
                },
                "compression": "store",
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "ioeditor", // 图标名称
                },
                "asar": false,
                }
            }

    }
}