"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// will auto start and stop the interval updater when extension activated and deactivated
class Updater {
    intr = undefined;
    constructor() {
        let subscriptions = [];
        this.start();
        this.dispose();
    }
    start() {
        // this.intr = setInterval(() => {
        //     console.log('Interval');
        // }, 5000);
    }
    dispose() {
        if (this.intr) {
            clearInterval(this.intr);
        }
    }
}
//# sourceMappingURL=updater.js.map