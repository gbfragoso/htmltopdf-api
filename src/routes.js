const express = require('express');
const multer = require('multer');
const puppeteer = require('puppeteer');

const routes = express.Router();
const upload = multer();

routes.get("/htmltopdf", upload.single('anexo'), async (request, response) => {
    try {
        const content = Buffer.from(request.file.buffer).toString();

        const browser = await puppeteer.launch({
            devtools: false,
            headless: true
        });

        const page = await browser.newPage();
        await page.setContent(content);
        const pdf = await page.pdf({format: 'A4'});
        await page.close();

        response.status(201).send(pdf);
    } catch (e) {
        response.status(400).send(e);
    }
});

module.exports = routes;