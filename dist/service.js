"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var node_fetch_1 = __importStar(require("node-fetch"));
var utils_1 = require("./utils");
var ZendeskService = /** @class */ (function () {
    function ZendeskService() {
    }
    ZendeskService.prototype.readZoomBody = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var caller, callee, ticket_data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(body.event === 'phone.callee_answered')) return [3 /*break*/, 2];
                        if (!(utils_1.registered_phone_numbers.includes(body.payload.object.callee.phone_number) || utils_1.registered_extension_numbers.includes(body.payload.object.callee.extension_number))) return [3 /*break*/, 2];
                        caller = body.payload.object.caller.phone_number;
                        callee = body.payload.object.callee.phone_number;
                        ticket_data = this.createAnsweredCallTicket(caller, callee);
                        return [4 /*yield*/, this.uploadTicket(ticket_data)];
                    case 1:
                        response = _a.sent();
                        console.log('[RESPONSE]', response);
                        if (response.status !== 201) {
                            return [2 /*return*/, [null, response]];
                        }
                        _a.label = 2;
                    case 2: /*else if (body.event === 'phone.callee_missed') {
            
                        console.log('[CALL NOT ANSWERED]');
                        const caller = body.payload.object.caller.phone_number;
                        const callee = body.payload.object.callee.phone_number;
                        const ticket_data = this.createMissedCallTicket(caller, callee);
                        const response = await this.uploadTicket(ticket_data);
                        console.log('[RESPONSE]', response);
                        if (response.status !== 201) {
                            return [null, response];
                        }
                    }else if (body.event === 'phone.voicemail_received') {
                        //https://marketplace.zoom.us/docs/api-reference/phone/events/#/paths/phone.voicemail_received/post
                        const caller = body.payload.object.caller_number;
                        const callee = body.payload.object.callee_number;
            
                        const ticket_data = this.createVoiceMailTicket(caller, callee);
                        const response = await this.uploadTicket(ticket_data);
                        console.log('[RESPONSE]', response);
                        if (response.status !== 201) {
                            return [null, response];
                        }
                    }*/ return [2 /*return*/, [true, null]];
                }
            });
        });
    };
    ZendeskService.prototype.createAnsweredCallTicket = function (caller, callee) {
        var new_date = moment_timezone_1.default().utcOffset(-360).format('MM-DD-YYYY HH:mm');
        var ticket_data = {
            ticket: {
                subject: "Call from " + caller + " to " + callee,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: caller + "@inlandlogistics.co"
                },
                comment: {
                    body: "Call from " + caller + " at " + new_date + " to " + callee
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        return ticket_data;
    };
    ZendeskService.prototype.createMissedCallTicket = function (caller, callee) {
        var new_date = moment_timezone_1.default().utcOffset(-360).format('MM-DD-YYYY HH:mm');
        var ticket_data = {
            ticket: {
                subject: "Missed Call from " + caller + " to " + callee,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: caller + "@inlandlogistics.co"
                },
                comment: {
                    body: "Missed call from " + caller + " to " + callee + " at " + new_date
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        return ticket_data;
    };
    ZendeskService.prototype.createVoiceMailTicket = function (caller, callee) {
        var new_date = moment_timezone_1.default().utcOffset(-360).format('MM-DD-YYYY HH:mm');
        var ticket_data = {
            ticket: {
                subject: "Voicemail from " + caller + " to " + callee,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: caller + "@inlandlogistics.co"
                },
                comment: {
                    body: "Voicemail from " + caller + " to " + callee + " at " + new_date
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        return ticket_data;
    };
    ZendeskService.prototype.uploadTicket = function (ticket_data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, key, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = 'andrea.rosales@inlandlogistics.co';
                        key = 'XHkCKX82Z1CRccYcqrEtTwkmP4inSYGHszikG6N7';
                        return [4 /*yield*/, node_fetch_1.default(utils_1.zendesk_url, {
                                headers: new node_fetch_1.Headers({
                                    "Content-Type": 'application/json',
                                    "Authorization": 'Basic ' + Buffer.from(email + "/token:" + key).toString('base64')
                                }),
                                method: 'POST',
                                body: JSON.stringify(ticket_data),
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return ZendeskService;
}());
/*
    Callee ended a phone call
    Callee missed a phone call
    Callee answerd a phone call
    Voicemail is received
    Caller log is completed
    Callee log is completed
    Warn transfer was accepted
*/
var zendeskService = new ZendeskService();
exports.default = zendeskService;
