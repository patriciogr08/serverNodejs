import morgan from 'morgan';

const customFormat = (tokens:any, req:any, res:any) => {
    // Formato personalizado para la fecha y hora (formato de 24 horas)
    const date = new Date().toLocaleString('en-US', {
        timeZone: 'America/Guayaquil',
        hour12: false, // Utilizar formato de 24 horas
    });
    // Construir el registro de la solicitud
    const log = [
        req.get('User-Agent'),
        req.ip,
        date,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
    ].join(' ');
    return log;
};

const morganMiddleware = morgan(customFormat);

export default morganMiddleware;
