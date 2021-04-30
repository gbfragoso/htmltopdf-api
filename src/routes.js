const express = require('express');
const multer = require('multer');
const puppeteer = require('puppeteer');

const routes = express.Router();
const upload = multer();

routes.get("/htmltopdf", upload.single('anexo'), async (request, response) => {
    try {
        // Loading input file with proper encoding
        const encoding = (request.body.encoding) ? request.body.encoding : 'utf8';
        const html = Buffer.from(request.file.buffer).toString(encoding);
        console.log(html)
        
        var defaultOptions = {format: 'A4'};
        for (var key in request.body) {
            // Ignoring enconding
            if (key !== 'encoding') {

                // Parsing types
                if (request.body[key] === 'true' || request.body[key] === 'false') {
                    defaultOptions[key] = (request.body[key] === 'true');
                } else if (parseInt(request.body[key]) != NaN) {
                    defaultOptions[key] = parseInt(request.body[key]);
                } else {
                    defaultOptions[key] = request.body[key];
                }
            }
        }

        // Initialing Headless browser
        const browser = await puppeteer.launch({
            devtools: false,
            headless: true
        });

        // Generating PDF file
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf(defaultOptions);
        await page.close();

        // Sending pdf back to the caller
        response.contentType("application/pdf");
        response.status(201).send(pdf);
    } catch (e) {
        response.status(400).send(e);
    }
});

module.exports = routes;