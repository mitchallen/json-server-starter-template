// Author: Mitch Allen 
// File: index.js

const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const rootController = require('./controllers/root');
const adminController = require('./controllers/admin')

const AUTHOR = "Mitch Allen"
const API_TITLE = "my-service"
const API_TAG_LINE = "JSON Server API"
// may require npm start launch to work (which we do)
const VERSION = process.env.npm_package_version;
const EXPLORER_PATH = '/api-docs'

app.use(express.json({
    verify: (_, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            errorMessage = "Invalid JSON"
            res
                .status(400)
                .json({ error: errorMessage });
            throw Error(errorMessage);
        }
    }
}));

let customSwaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: API_TITLE,
};

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: API_TITLE,
            version: VERSION,
            author: AUTHOR,
            description: API_TAG_LINE,
        },
    },
    apis: [
        './src/controllers/root.yaml',
        // put future controller yaml here
    ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
    EXPLORER_PATH,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, customSwaggerOptions)
);

app.use((req, _, next) => {
    req.info = {
      title: API_TITLE,
      version: VERSION,
      author: AUTHOR,
      explorer: EXPLORER_PATH,
    }
    next()
  })

// Root controller should come before any other controller
app.use(rootController)

// must move under admin or admin-key middleware is called for all default roots
app.use('/admin', adminController)

// Future controllers must also be under a parent path
// Othersise admin middleware interferes and demands admin header
// app.use('/api', apiController)

const PORT = process.env.PORT || 3000;
// See env.docker.list
const EXTERNAL_PORT = process.env.EXTERNAL_PORT || '????'
const server = app.listen(PORT, () => {
  console.log(`${API_TITLE}@${VERSION}`)
  console.log(`running on ports INTERNAL: ${PORT}, EXTERNAL: ${EXTERNAL_PORT}`);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
  process.exit();
})

process.on('SIGTERM', () => {
  console.log('\nSIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
  process.exit();
})

