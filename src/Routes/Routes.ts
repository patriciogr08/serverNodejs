import express from 'express';
import { validate } from 'express-validation';
import { ACCESS_SERVICES_CUSTOM } from '../Middleware/Request/ValidationRequest'
import * as soapController from '../Controllers/DisanControler';
import * as promartController from '../Controllers/CustomController';
import rateLimitServicesMiddleware from '../Middleware/RateLimit';
import { mapErrorResponse } from '../Utils/ResponseUtils';
const cors = require('cors');


const router = express.Router();

function groupRouteDisan(prefix : string) {
    const routeGroup = express.Router();  
    routeGroup.post('/soap-fechas', soapController.consumeSoap);
    router.use(prefix, routeGroup);
}
function groupRoutePromart(prefix : string) {
    const routeGroupIntegration = express.Router();  
    routeGroupIntegration.post('/data',validate(ACCESS_SERVICES_CUSTOM,{},{}), promartController.getData);
    router.use(prefix, rateLimitServicesMiddleware,routeGroupIntegration);
}

groupRouteDisan('/disan');
groupRoutePromart('/custom');

router.use((req, res) => {
    res.status(404).json(mapErrorResponse(404, "Ruta No encontrada"));  
});

export default router;
