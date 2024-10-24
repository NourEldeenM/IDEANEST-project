"use strict";
const app_1 = require("./app");
const app = (0, app_1.createApp)();
let port = 3000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
module.exports = app;
