import * as vscode from 'vscode';

// will auto start and stop the interval updater when extension activated and deactivated
class Updater {
    private intr: NodeJS.Timeout | undefined = undefined;

    constructor() {
        let subscriptions: vscode.Disposable[] = [];
        this.start();
        this.dispose();
    }
    public start() {
        // this.intr = setInterval(() => {
        //     console.log('Interval');
        // }, 5000);
    }
    public dispose() {
        if (this.intr) {
            clearInterval(this.intr);
        }
    }
}
