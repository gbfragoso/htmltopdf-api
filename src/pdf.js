const puppeteer = require('puppeteer');
const {serializeError} = require('serialize-error');
let browser;

async function startBrowser() {
    console.log("Starting headless browser");

    browser = await puppeteer.launch({
        devtools: false,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
}

function parseOptions(params) {
    var options = { format: 'A4' };

    try {
        console.log('Parsing options');

        for (var key in params) {
            if (key !== 'encoding' && key !== 'url' && key !== 'path') {

                // Parsing types
                if (params[key] === 'true' || params[key] === 'false') {
                    options[key] = (params[key] === 'true');
                } else if (parseInt(params[key])) {
                    options[key] = parseInt(params[key]);
                } else if (JSON.parse(params[key])) {
                    options[key] = JSON.parse(params[key]);
                } else {
                    options[key] = params[key];
                }
            }
        }
    } catch (e) {
        const error = serializeError(e);
        delete error.stack;
        
        throw error;
    }

    return options;
};

async function fromHtmlFile(file, body) {

    try {
        if (!file) {
            throw { 'error': 'HTML file not found' }
        }
        console.log('Converting ' + file.originalname + ' to pdf');

        const options = parseOptions(body);

        const html = Buffer.from(file.buffer).toString(body.encoding);
        const page = await browser.newPage();
        await page.setContent(html);

        if (options.mediaType && options.mediaType !== 'print') {
            console.log('Emulating ' + options.mediaType + " media type");
            page.emulateMediaType(options.mediaType);
            delete options.mediaType;
        }
        console.log(options);

        const pdf = await page.pdf(options);
        await page.close();

        console.info(file.originalname + ' converted successfully');
        return pdf;
    } catch (e) {
        const error = serializeError(e);
        delete error.stack;
        
        throw error;
    }
};

async function fromHtmlString(body) {
    console.log('Converting HTML string to pdf');

    try {
        const html = body.html;
        if (!html) {
            throw { 'error': 'HTML string not found' }
        }
        const options = parseOptions(body);

        const page = await browser.newPage();
        await page.setContent(html);

        if (options.mediaType !== 'print') {
            console.log('Emulating ' + options.mediaType + " media type");
            page.emulateMediaType(options.mediaType);
            delete options.mediaType;
        }

        const pdf = await page.pdf(options);
        await page.close();

        console.info('String converted successfully');
        return pdf;
    } catch (e) {
        const error = serializeError(e);
        delete error.stack;
        
        throw error;
    }
};

async function fromUrl(body) {
    console.log('Converting ' + body.url + ' to pdf');

    try {
        const url = body.url;
        if (!url) {
            throw { 'error': 'Param URL not found' }
        }

        const options = parseOptions(body);

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        if (options.mediaType !== 'print') {
            console.log('Emulating ' + options.mediaType + " media type");
            page.emulateMediaType(options.mediaType);
            delete options.mediaType;
        }

        const pdf = await page.pdf(options);
        await page.close();

        console.info('URL converted successfully');
        return pdf;
    } catch (e) {
        const error = serializeError(e);
        delete error.stack;
        
        throw error;
    }
};

module.exports = { startBrowser, fromHtmlFile, fromHtmlString, fromUrl };