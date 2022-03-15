"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.index = function (req, res) {
        var zoom_body = req.body;
        console.log('[ZOOM BODY]', zoom_body);
        this.readZoomBody(zoom_body);
        return res.json({ text: 'success!', body: zoom_body });
    };
    Controller.prototype.test = function (req, res) {
        return res.status(200).json({ message: 'Hola mundo!' });
    };
    Controller.prototype.readZoomBody = function (body) {
        if (body.event === 'phone.callee_answered') {
            if (utils_1.registered_phone_numbers.includes(body.payload.object.callee.phone_number) || utils_1.registered_extension_numbers.includes(body.payload.object.callee.extension_number)) {
            }
        }
    };
    return Controller;
}());
exports.controller = new Controller();
