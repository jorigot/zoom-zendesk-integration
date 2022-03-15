import { Request, Response } from 'express';
import moment from 'moment-timezone';
import { registered_phone_numbers, registered_extension_numbers } from './utils';

class Controller {

    constructor() {}

    public index(req: Request, res: Response) {
        try{
            const zoom_body = req.body;
            console.log('[ZOOM BODY]', zoom_body);
            this.readZoomBody(zoom_body);
            return res.status(200).json({text: 'success!', body: zoom_body});
        }catch(err) {
            console.log('[ERROR]', err);
            return res.status(500).json({message: 'Operation was not successful.'});
        }
    }

    public test(req: Request, res: Response) {
        return res.status(200).json({message: 'Hola mundo!'});
    }

    readZoomBody(body: any): void {
        if (body.event === 'phone.callee_answered') {
            if (registered_phone_numbers.includes(body.payload.object.callee.phone_number) || registered_extension_numbers.includes(body.payload.object.callee.extension_number)) {
                const caller = body.payload.object.caller.phone_number;
                const callee = body.payload.object.callee.phone_number;
                this.createAnsweredCallTicket(caller, callee);
            }
        }
    }

    createAnsweredCallTicket(caller: any, callee: any): void {
        const new_date = moment().format('MM-DD-YYYY HH:mm');
        const ticket_data = {
            ticket: {
                subject: `Call from ${caller}`,
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
        this.uploadTicket(JSON.stringify(ticket_data));
    }

    uploadTicket(ticket_data: string): void {
        
    }
}

export const controller = new Controller();