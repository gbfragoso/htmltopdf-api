const puppeteer = require('puppeteer');
let browser;

async function startBrowser() {
    console.log("Starting headless browser");

    browser = await puppeteer.launch({
        devtools: false,
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });
}

function parseOptions(params) {
    var options = { format: 'A4' };

    try {
        console.log('Parsing options');

        for (var key in params) {
            if (key !== 'encoding' && key !== 'url') {

                // Parsing types
                if (params[key] === 'true' || params[key] === 'false') {
                    options[key] = (params[key] === 'true');
                } else if (parseInt(params[key]) != NaN) {
                    options[key] = parseInt(params[key]);
                } else {
                    options[key] = params[key];
                }
            }
        }
    } catch (e) {
        console.error('Error while parsing options from request body');

        throw e;
    }

    return options;
};

async function fromHtmlFile(file, body) {
    console.log('Converting ' + file.originalname + ' to pdf');

    try {
        const options = parseOptions(body);

        const html = Buffer.from(file.buffer).toString(body.encoding);
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdf = await page.pdf(options);
        await page.close();

        console.info(file.originalname + ' converted successfully');
        return pdf;
    } catch (e) {
        throw e;
    }
};

async function fromHtmlString(body) {
    console.log('Converting HTML string to pdf');

    try {
        const html = body.html;
        if (!html) {
            throw {'message' : 'HTML text not found'}
        }
        const options = parseOptions(body);

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdf = await page.pdf(options);
        await page.close();

        console.info('String converted successfully');
        return pdf;
    } catch (e) {
        throw e;
    }
};

async function fromUrl(body) {
    console.log('Converting ' + body.url + ' to pdf');

    try {
        const url = body.url;
        if (!url) {
            throw {'message' : 'Param URL not found'}
        }

        const options = parseOptions(body);

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        const pdf = await page.pdf(options);
        await page.close();

        console.info('URL converted successfully');
        return pdf;
    } catch (e) {
        throw e;
    }
};

module.exports = { startBrowser, fromHtmlFile, fromHtmlString, fromUrl };