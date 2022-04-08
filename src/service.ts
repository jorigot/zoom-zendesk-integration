import moment from 'moment-timezone';
import fetch, { Headers } from 'node-fetch';
import { registered_phone_numbers, registered_extension_numbers, zendesk_url } from './utils';


class ZendeskService {

    public async readZoomBody (body: any): Promise<[any, any]> {
        if (body.event === 'phone.callee_answered') {
            if (registered_phone_numbers.includes(body.payload.object.callee.phone_number) || registered_extension_numbers.includes(body.payload.object.callee.extension_number)) {
                const caller = body.payload.object.caller.phone_number;
                const callee = body.payload.object.callee.phone_number;
                const ticket_data = this.createAnsweredCallTicket(caller, callee);
                const response = await this.uploadTicket(ticket_data);
                
                console.log('[RESPONSE]', response);
                if (response.status !== 201) {
                    return [null, response];
                }
            }
        }/*else if (body.event === 'phone.callee_missed') {

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
        }*/
        return [true, null];
    }

    createAnsweredCallTicket(caller: any, callee: any): any {
        const new_date = moment().utcOffset(-360).format('MM-DD-YYYY HH:mm');
        const ticket_data = {
            ticket: {
                subject: `Call from ${caller} to ${callee}`,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: `${caller}@inlandlogistics.co`
                },
                comment: {
                    body: `Call from ${caller} at ${new_date} to ${callee}`
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        return ticket_data;
    }
    
    createMissedCallTicket(caller: any, callee: any): any {
        const new_date = moment().utcOffset(-360).format('MM-DD-YYYY HH:mm');
        const ticket_data = {
            ticket: {
                subject: `Missed Call from ${caller} to ${callee}`,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: `${caller}@inlandlogistics.co`
                },
                comment: {
                    body: `Missed call from ${caller} to ${callee} at ${new_date}`
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        return ticket_data;
    }
    
    createVoiceMailTicket(caller: any, callee: any): any {
        const new_date = moment().utcOffset(-360).format('MM-DD-YYYY HH:mm');
        const ticket_data = {
            ticket: {
                subject: `Voicemail from ${caller} to ${callee}`,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: `${caller}@inlandlogistics.co`
                },
                comment: {
                    body: `Voicemail from ${caller} to ${callee} at ${new_date}`
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        return ticket_data;
    }

    async uploadTicket(ticket_data: any): Promise<any> {
        const email = 'andrea.rosales@inlandlogistics.co';
        const key = 'XHkCKX82Z1CRccYcqrEtTwkmP4inSYGHszikG6N7';
        const response = await fetch(zendesk_url, {
            headers: new Headers({
                "Content-Type": 'application/json',
                "Authorization": 'Basic ' + Buffer.from(`${email}/token:${key}`).toString('base64')
            }),
            method: 'POST',
            body: JSON.stringify(ticket_data),
        });
        return response;
    }

}

/*
    Callee ended a phone call
    Callee missed a phone call
    Callee answerd a phone call
    Voicemail is received
    Caller log is completed
    Callee log is completed
    Warn transfer was accepted
*/

const zendeskService = new ZendeskService();
export default zendeskService;