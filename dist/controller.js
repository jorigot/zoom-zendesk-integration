"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var utils_1 = require("./utils");
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.index = function (req, res) {
        try {
            //    Get body from zoom json
            var zoom_body = req.body;
            console.log('[ZOOM BODY]', zoom_body);
            //    Send body to readZoomBody method
            this.readZoomBody(zoom_body);
            //    Return response with status 200 and a success message
            return res.status(200).json({ text: 'success!', body: zoom_body });
        }
        catch (err) {
            //    Return response with status 500 and the error message
            console.log('[ERROR]', err);
            return res.status(500).json({ message: 'Operation was not successful.' });
        }
    };
    Controller.prototype.test = function (req, res) {
        return res.status(200).json({ message: 'Hola mundo!' });
    };
    Controller.prototype.readZoomBody = function (body) {
        if (body.event === 'phone.callee_answered') {
            if (utils_1.registered_phone_numbers.includes(body.payload.object.callee.phone_number) || utils_1.registered_extension_numbers.includes(body.payload.object.callee.extension_number)) {
                var caller = body.payload.object.caller.phone_number;
                var callee = body.payload.object.callee.phone_number;
                this.createAnsweredCallTicket(caller, callee);
            }
        }
    };
    Controller.prototype.createAnsweredCallTicket = function (caller, callee) {
        var new_date = moment_timezone_1.default().format('MM-DD-YYYY HH:mm');
        var ticket_data = {
            ticket: {
                subject: "Call from " + caller,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: caller + "@inlandlogistics.co"
                },
                comment: {
                    body: "Call from " + caller + " at " + new_date
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        this.uploadTicket(JSON.stringify(ticket_data));
    };
    Controller.prototype.uploadTicket = function (ticket_data) {
    };
    return Controller;
}());
exports.controller = new Controller();
