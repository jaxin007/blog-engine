"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexConfig = void 0;
const env_config_1 = require("./env-config");
exports.knexConfig = {
    client: 'postgresql',
    connection: {
        host: env_config_1.config.PGHOST,
        user: env_config_1.config.PGUSER,
        port: env_config_1.config.PGPORT,
        password: env_config_1.config.PGPASSWORD,
        database: env_config_1.config.PGDATABASE,
    },
    pool: { min: 0, max: 7 },
};
