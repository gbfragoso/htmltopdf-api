# Convert to PDF

Convert to PDF is a simple API that receive a HTML (file, string or url)
and uses Puppeteer headless browser to convert into PDF.

# Endpoints

`/convert/fromFile`

-   file: **(Required)** HTML file
-   options: **(Optional)** See [options](#options)

`/convert/fromString`

-   html: **(Required)** HTML string
-   options: **(Optional)** See [options](#options)

`/convert/fromUrl`

-   url: **(Required)** Website url
-   options: **(Optional)** See [options](#options)

# Options [[official docs]](http://https://pptr.dev/#?product=Puppeteer&version=v9.0.0&show=api-pagepdfoptions)

-   `encoding` The file encoding. Default `utf-8`
-   `mediaType` CSS media type. Default `print`
-   `scale`
    \<[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number")\>
    Scale of the webpage rendering. Defaults to `1`. Scale amount must
    be between 0.1 and 2.
-   `displayHeaderFooter`
    \<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean")\>
    Display header and footer. Defaults to `false`.
-   `headerTemplate`
    \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")\>
    HTML template for the print header. Should be valid HTML markup with
    following classes used to inject printing values into them:
    -   `date` formatted print date
    -   `title` document title
    -   `url` document location
    -   `pageNumber` current page number
    -   `totalPages` total pages in the document
-   `footerTemplate`
    \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")\>
    HTML template for the print footer. Should use the same format as
    the `headerTemplate`.
-   `printBackground`
    \<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean")\>
    Print background graphics. Defaults to `false`.
-   `landscape`
    \<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean")\>
    Paper orientation. Defaults to `false`.
-   `pageRanges`
    \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")\>
    Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty
    string, which means print all pages.
-   `format`
    \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")\>
    Paper format. If set, takes priority over `width` or `height`
    options. Defaults to 'A4'.
-   `width`
    \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number")\>
    Paper width, accepts values labeled with units. [See note
    2](#note-2)
-   `height`
    \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number")\>
    Paper height, accepts values labeled with units. [See note
    2](#note-2)
-   `margin`
    \<[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object")\>
    Paper margins, defaults to none. [See note 2](#note-2)
    -   `top`
        \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number")\>
        Top margin, accepts values labeled with units.
    -   `right`
        \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number")\>
        Right margin, accepts values labeled with units.
    -   `bottom`
        \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number")\>
        Bottom margin, accepts values labeled with units.
    -   `left`
        \<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String")|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number")\>
        Left margin, accepts values labeled with units.
-   `preferCSSPageSize`
    \<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean")\>
    Give any CSS `@page` size declared in the page priority over what is
    declared in `width` and `height` or `format` options. Defaults to
    `false`, which will scale the content to fit the paper size.
-   `omitBackground`
    \<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean")\>
    Hides default white background and allows capturing screenshots with
    transparency. Defaults to `false`.

# Return

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise")\<[Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer")\>\>
Promise which resolves with PDF buffer.

# Examples and notes

**NOTE** By default, Puppeteer generates a pdf with modified colors for
printing. Use the
[`-webkit-print-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust)
property to force rendering of exact colors.

**NOTE** The `width`, `height`, and `margin` options accept values
labeled with units. Unlabeled values are treated as pixels.

A few examples:

-   `width: 100` - prints with width set to 100 pixels
-   `width: '100px'` - prints with width set to 100 pixels
-   `width: '10cm'` - prints with width set to 10 centimeters.

All possible units are:

-   `px` - pixel
-   `in` - inch
-   `cm` - centimeter
-   `mm` - millimeter

**NOTE** The `format` options are:

-   `Letter`: 8.5in x 11in
-   `Legal`: 8.5in x 14in
-   `Tabloid`: 11in x 17in
-   `Ledger`: 17in x 11in
-   `A0`: 33.1in x 46.8in
-   `A1`: 23.4in x 33.1in
-   `A2`: 16.54in x 23.4in
-   `A3`: 11.7in x 16.54in
-   `A4`: 8.27in x 11.7in
-   `A5`: 5.83in x 8.27in
-   `A6`: 4.13in x 5.83in

**NOTE** `headerTemplate` and `footerTemplate` markup have the following
limitations:

1.  Script tags inside templates are not evaluated.
2.  Page styles are not visible inside templates.

