"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.index = function (req, res) {
        return res.json({ text: 'success!' });
    };
    return Controller;
}());
exports.controller = new Controller();
