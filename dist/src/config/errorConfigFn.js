"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errConfigFn = void 0;
function errConfigFn(app) {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        return res.status(500).json(err.message);
    });
}
exports.errConfigFn = errConfigFn;
