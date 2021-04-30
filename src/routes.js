const express = require('express');
const multer = require('multer');

const routes = express.Router();
const upload = multer();
const pdf = require('./pdf');
pdf.startBrowser();

routes.post("/convert/fromFile", upload.single('file'), async (request, response) => {
    try {
        const result = await pdf.fromHtmlFile(request.file, request.body);
        
        response.contentType("application/pdf");
        response.status(201).send(result);
    } catch (e) {
        response.status(400).send(e);
    }
});

routes.post("/convert/fromString", upload.none(), async (request, response) => {
    try {
        const result = await pdf.fromHtmlString(request.body);
        
        response.contentType("application/pdf");
        response.status(201).send(result);
    } catch (e) {
        response.status(400).send(e);
    }
});

routes.post("/convert/fromUrl", upload.none(), async (request, response) => {
    try {
        const result = await pdf.fromUrl(request.body);
        
        response.contentType("application/pdf");
        response.status(201).send(result);
    } catch (e) {
        console.error(e);

        response.status(400).send(e);
    }
});

module.exports = routes;