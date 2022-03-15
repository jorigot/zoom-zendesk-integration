import { Request, Response } from 'express';

class Controller {

    constructor() {}

    public index(req: Request, res: Response) {
        return res.json({text: 'success!'});
    }
}

export const controller = new Controller();