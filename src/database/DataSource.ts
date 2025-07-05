import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Note } from "../entities";

dotenv.config();

export const AppDataSource = new DataSource({
    // type of database
    type: "postgres",

    // Connection details
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Development configuration
    synchronize: true, // automatically create tables based on entities
    logging: true, // log the queries to the console

    // Entities
    entities: [
        Note
    ],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database initialized");
    } catch (error) {
        console.error("Error initializing database", error);
        process.exit(1);
    }
};