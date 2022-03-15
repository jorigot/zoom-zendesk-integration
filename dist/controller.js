"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.index = function (req, res) {
        return res.json({ text: 'success!' });
    };
    Controller.prototype.test = function (req, res) {
        return res.status(200).json({ message: 'Hola mundo!' });
    };
    return Controller;
}());
exports.controller = new Controller();
