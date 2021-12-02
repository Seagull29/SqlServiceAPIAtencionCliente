import { Router } from "express";
import { routeController } from "@routesControllers/docentes";
import { validateCreate } from "@validators/estudiantesV";

const router : Router = Router();

router.get('/', routeController.list);
router.post('/add', validateCreate, routeController.add);
router.put('/update', routeController.update);
router.delete('/delete', routeController.delete);
router.get('/search', routeController.search);

export default router;