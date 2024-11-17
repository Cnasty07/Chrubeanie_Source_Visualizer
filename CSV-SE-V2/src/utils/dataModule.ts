import * as ejs from 'ejs';
import * as path from 'path';
import * as symbolExtractor from './symbolExtractor';

async function getActive(): Promise<string | void> {
    const viewname = path.join(__dirname, "views", "viewhtmlTemplate.ejs");

    try {
        const data = await ejs.renderFile(viewname, { "allSymbols": { symbol: "class method" } });
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export { getActive };