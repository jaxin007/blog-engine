"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = require("./inversify.config");
const configFn_1 = require("./config/configFn");
const errorConfigFn_1 = require("./config/errorConfigFn");
const env_config_1 = require("./config/env-config");
// declare metadata by @controller annotation
require("./controllers/index");
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.container);
exports.app = server
    .setConfig(configFn_1.configFn)
    .setErrorConfig(errorConfigFn_1.errConfigFn)
    .build();
exports.app.listen(env_config_1.config.PORT, 'localhost', () => {
    console.log(`server listened on port ${env_config_1.config.PORT}`);
});
