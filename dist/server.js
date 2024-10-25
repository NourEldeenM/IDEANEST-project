"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const app_1 = require("./app");
const index_1 = __importDefault(require("./code/config/index"));
const app = (0, app_1.createApp)();
let port = index_1.default.SERVER.localPort;
app.listen(+port, () => {
    console.log(`listening on http://localhost:${port}`);
});
module.exports = app;
