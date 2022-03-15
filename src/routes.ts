import { Router } from "express";
import { controller } from "./controller";

class Routes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/', controller.index);
        this.router.get('/', controller.test);
    }
}

const routes = new Routes();
export default routes.router;