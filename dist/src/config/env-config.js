"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'dff$asdcAs',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'secret',
    PGHOST: process.env.PGHOST || 'postgres',
    PGUSER: process.env.PGUSER || 'postgres',
    PGDATABASE: process.env.PGDATABASE || 'postgres',
    PGPASSWORD: process.env.PGPASSWORD || 'secret',
    PGPORT: Number.parseInt(process.env.PGPORT || '3300', 10),
    PORT: Number.parseInt(process.env.PORT || '3000', 10),
};
