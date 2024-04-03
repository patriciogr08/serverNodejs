import { ConnectionPool } from 'mssql';
import { SqlServices, MetodoHttp } from '../Enum/CustomServicesEnum';
import axios from 'axios';


let pool: ConnectionPool | null = null;

function setPool(newPool: ConnectionPool) {
    pool = newPool;
}

async function consultarDatos( codigoServicio :string , idUsuario : number) {
    try {
        const DATA_CUSTOM_SERVICES = await pool?.request().query(`SELECT * FROM custom_services cs WHERE cs.codigoServicio = '${codigoServicio}' AND cs.activo=1`);
        if (!DATA_CUSTOM_SERVICES || !DATA_CUSTOM_SERVICES.recordset.length) throw new Error("No existe el código de servicio");

        const SERVICE = DATA_CUSTOM_SERVICES.recordset[0];
        const RESULT = await ejecutarServicio(SERVICE.tipoServicio,SERVICE.metodo,SERVICE.objeto)
        return RESULT;
    } catch (error :any) {
        throw (error.message);
    }
}

function ejecutarServicio(tipoServicio: string, metodo: string, objeto: string) {
    if (tipoServicio === 'SQL') {
        return ejecutarConsultaSQL(metodo, objeto);
    } else if ( ['HTTP','HTTPS'].includes(tipoServicio) ) {
        return ejecutarPeticionHTTP(metodo, objeto);
    } else {
        throw new Error('Tipo de servicio no soportado');
    }
}

async function ejecutarConsultaSQL(metodo: string, objeto: string) {
    let query = '';
    if (metodo.toUpperCase() === SqlServices.PROCEDURE) {
        query = `EXEC ${objeto}`;
    } else if (metodo.toUpperCase() === SqlServices.FUNCTION) {
        query = `SELECT dbo.${objeto}`;
    } else {
        throw new Error('Método SQL no soportado');
    }
    
    const result = await pool?.request().query(query);
    return result?.recordset;
}

async function ejecutarPeticionHTTP(metodo: string, objeto: string) {
    if ( metodo.toUpperCase() === MetodoHttp.GET) {
        const response = await axios.get(objeto);
        return response.data;
    } else if (metodo.toUpperCase() === MetodoHttp.POST) {
        const response = await axios.post(objeto, /* datos */);
        return response.data;
    } else {
        throw new Error('Método HTTP no soportado');
    }
}


export { setPool,consultarDatos };