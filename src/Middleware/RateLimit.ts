import rateLimit from 'express-rate-limit';
import { mapErrorResponse } from '../Utils/ResponseUtils';

const rateLimitServicesMiddleware = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 tiempo de ejecucion
    max: 10, // número máximo de solicitudes permitidas en el intervalo de tiempo
    handler: (req, res, next) => {
      // Personaliza la respuesta de acuerdo a tus necesidades
      res.status(429).json(mapErrorResponse(429, 'Demasiadas solicitudes desde esta IP, por favor intenta nuevamente más tarde.'));
    }
  });

export default rateLimitServicesMiddleware;

