import { Request, Response } from 'express';
import zendeskService from './service';
import moment from 'moment-timezone';

class Controller {

    constructor() {}

    public async index(req: Request, res: Response) {
        try{
            //    Get body from zoom json
            const zoom_body = req.body;
            console.log('[ZOOM BODY]', zoom_body);
            
            //    Send body to readZoomBody method

            const [success, error] = await zendeskService.readZoomBody(zoom_body);

            if (error) {
                return res.status(error.status).json(error);
            }
            //    Return response with status 200 and a success message
            return res.status(200).json({text: 'success!', zoom_body});
        }catch(err) {
            //    Return response with status 500 and the error message
            console.log('[ERROR]', err);
            return res.status(500).json({message: 'Operation was not successful.'});
        }
    }

    public test(req: Request, res: Response) {
        return res.status(200).json({message: 'Hola mundo!'});
    }
}

export const controller = new Controller();