"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "1234",
        database: process.env.DB_DBNAME || "munadu_dev",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
    },
};
