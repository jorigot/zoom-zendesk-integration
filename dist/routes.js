"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var Routes = /** @class */ (function () {
    function Routes() {
        this.router = express_1.Router();
        this.config();
    }
    Routes.prototype.config = function () {
        this.router.post('/', controller_1.controller.index);
        this.router.get('/', controller_1.controller.test);
    };
    return Routes;
}());
var routes = new Routes();
exports.default = routes.router;
