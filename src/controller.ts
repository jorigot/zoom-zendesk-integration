import { Request, Response } from 'express';

class Controller {

    constructor() {}

    public index(req: Request, res: Response) {
        return res.json({text: 'success!'});
    }

    public test(req: Request, res: Response) {
        return res.status(200).json({message: 'Hola mundo!'});
    }
}

export const controller = new Controller();