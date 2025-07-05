import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';
import { initializeDatabase } from './database/DataSource';

// initial config
dotenv.config(); // load environment variables
console.log('Port:', process.env.PORT);
console.log('Node environment:', process.env.NODE_ENV);
console.log('DB host:', process.env.DB_HOST);

const app = express(); // create server
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // secure the app

app.use(morgan('combined')); // log requests

app.use(cors({
    origin: true,
    credentials: true,
})); // enable CORS

// Parser Middleware
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// Health route
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// TSOA Routes
RegisterRoutes(app);

// Swagger Documentation
try {
    const swaggerDocument = require('../docs/swagger.json');

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Markdown Notes API',
    }));

    // Endpoint to get raw JSON
    app.get('/swagger.json', (req, res) => {
        res.json(swaggerDocument);
    });

} catch (error) {
    console.warn('Swagger documentation not found. Run `npm run tsoa:gen` to generate it.');
}

// Error handling 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.originalUrl} not found`,
        availableRoutes: [
            '/health',
            '/swagger',
            '/swagger.json',
        ],
    });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
    });
});

// Initialize database
const startServer = async () => {
    // Initialize database
    await initializeDatabase();

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger documentation: http://localhost:${PORT}/swagger`);
        console.log(`Health check: http://localhost:${PORT}/health`);
        console.log(`API documentation: http://localhost:${PORT}/swagger.json`);
    });
};

startServer();

export default app;