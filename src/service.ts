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
                console.log('[TICKET DATA]', ticket_data);
                await this.uploadTicket(ticket_data);
            }
        }
        return [true, null];
    }

    createAnsweredCallTicket(caller: any, callee: any): any {
        const new_date = moment().format('MM-DD-YYYY HH:mm');
        const ticket_data = {
            ticket: {
                subject: `[TEST] Call from ${caller}`,
                priority: 'normal',
                requester: {
                    name: caller,
                    email: `${caller}@inlandlogistics.co`
                },
                comment: {
                    body: `Call from ${caller} at ${new_date}`
                },
                custom_fields: {
                    id: '4415218538651',
                    value: caller
                }
            }
        };
        return ticket_data;
    }

    async uploadTicket(ticket_data: any): Promise<void> {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Basic lorena.bran@inlandlogistics.co:Inland1`);
        const response = await fetch(zendesk_url, {
            method: 'POST',
            body: JSON.stringify(ticket_data),
            headers: headers
        });
        console.log('[RESPONSE]', response);
    }

}
/*
curl https://{subdomain}.zendesk.com/api/v2/tickets.json \
-d '{"ticket": {"subject": "My printer is on fire!", "comment": { "body": "The smoke is very colorful." }}}' \
-H "Content-Type: application/json" -v -u {email_address}:{password} -X POST
*/
const zendeskService = new ZendeskService();
export default zendeskService;