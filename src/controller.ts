import { Request, Response } from 'express';

class Controller {

    constructor() {}

    public index(req: Request, res: Response) {
        const zoom_body = req.body;
        console.log('[ZOOM BODY]', zoom_body);
        return res.json({text: 'success!', body: zoom_body});
    }

    public test(req: Request, res: Response) {
        return res.status(200).json({message: 'Hola mundo!'});
    }
}

export const controller = new Controller();