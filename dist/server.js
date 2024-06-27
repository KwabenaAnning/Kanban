"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(express_1.default.json());
app.use(error_middleware_1.appErrorHandler);
app.use(error_middleware_1.genericErrorHandler);
app.use(error_middleware_1.notFound);
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
app.use((error, req, res, next) => {
    var _a;
    res.status((_a = error === null || error === void 0 ? void 0 : error.code) !== null && _a !== void 0 ? _a : 500).json(error);
});
