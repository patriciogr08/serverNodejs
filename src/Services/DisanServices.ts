import * as soap from 'soap';



export async function consumeSoapService(ordenCompra:string, fecha:string, codigoFecha :string) {
    try {
        const USERNAME = process.env.USERNAME_SOAP || "";
        const PASSWORD =  process.env.PASSWORD_SOAP || "" ;
        const WSDLURL  = process.env.WSDL_URL || "";

        const DateNow   = new Date();
        const client    = await soap.createClientAsync(WSDLURL);
        const security  = new soap.BasicAuthSecurity(USERNAME, PASSWORD);
        client.setSecurity(security);

        const args = {
            'Ebeln': ordenCompra,
            'Fecha': fecha,
            'Xblnr': codigoFecha
        };

        if( !ordenCompra && !fecha && !codigoFecha ) {
            console.log(`${DateNow.toISOString()} -- Pedido(Ebeln):` , JSON.stringify(args));
            return;
        }

        return new Promise((resolve, reject) => {
            client.ZwsActualizaFechas(args, (err:any, response:any) => {
                if (err) {
                    console.log(`${DateNow.toISOString()} -- Error response SOAP:` , JSON.stringify(args));
                    reject('Error');
                } else {
                    console.log(`${DateNow.toISOString()} -- Success Response SOAP Data: ${JSON.stringify(args)}`, response);
                    resolve(response);
                }
            });
        });
        
    } catch (error) {
        throw (error)
    }
}