"use strict";
const mongoose_1 = require("mongoose");
const mongoose = (0, mongoose_1.connect)("mongodb+srv://nourislight:nour1324@cluster0.nwykl.mongodb.net/ideanest?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("MongoDB connected successfully");
});
module.exports = mongoose;
