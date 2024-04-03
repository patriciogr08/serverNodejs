import { Request, Response } from 'express';
import { AccessCustomData } from '../Interfaces/CustomInterfaces';
import { mapErrorResponse, mapSuccessResponse } from '../Utils/ResponseUtils';
import * as customServices from '../Services/CustomServices';
import * as authService from '../Services/AuthServices';



async function getData(req: Request, res: Response) {
    try {
        const BODY :AccessCustomData = req.body
        const { usuario,password ,codigoWs} = BODY;
        const LOGIN = await authService.iniciarSesion( { usuario,password} )
        if ( !LOGIN.success ){
            res.status(400).json(mapErrorResponse(400, LOGIN.error!));  
            return;
        }

        const data = await customServices.consultarDatos(codigoWs,LOGIN.idUsuario);
        res.json(mapSuccessResponse(200, "Datos obtenidos correctamente", data));

    } catch (error:any) {
        const errorResponse = mapErrorResponse(400, error);
        res.status(400).json(errorResponse);
    }
}



export { getData };