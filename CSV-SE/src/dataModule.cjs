// const vscode = require('vscode');
const ejs = require('ejs');
const path = require('path');
const symbolExtractor = require('./symbolExtractor');

async function getActive() {
    let viewname = path.join(__dirname, "views","viewhtmlTemplate.ejs")
    
    await ejs.renderFile(viewname,{"allSymbols": {symbol: "class method"}}).then((data) => {
        console.log(data)
        return data
    }).catch((err) => {
        console.error(err)
    });

    // return vscode.window.activeTextEditor.document
    
}

getActive()

module.exports = {
    getActive
}