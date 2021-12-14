import { Router } from "express";
import { routeController } from "@routesControllers/reportes";

const router : Router = Router();

router.get('/', routeController.list);
router.post('/add', routeController.add);
router.put('/update', routeController.update);
router.delete('/delete', routeController.delete);
router.get('/search', routeController.search);
router.get('/report', routeController.report);

export default router;