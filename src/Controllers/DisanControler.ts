import { RequestFechas } from '../Interfaces/DisanInterface';
import * as soapService from '../Services/DisanServices';

export async function consumeSoap(req :RequestFechas, res :any) {
    const { ordenCompra, fecha, codigoFecha } = req.body;
    try {
        const response = await soapService.consumeSoapService(ordenCompra, fecha, codigoFecha);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
}