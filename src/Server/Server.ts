import path from "path";
import cors from "cors"
import express, { Request , Response , NextFunction } from "express";
import { ValidationError } from "express-validation";
import { Server, ServerConfig } from "../Interfaces/ServerInterface";
import { mapErrorResponse } from "../Utils/ResponseUtils";
import morganMiddleware from "../Middleware/Morgan";
import compressionMiddleware from "../Middleware/Compression";

const defaultOption : ServerConfig = {
    port : 80,
    publicPath : path.join(__dirname,"..","public")
}

const server = (options: ServerConfig): Server => {
    const config: ServerConfig = { ...defaultOption,...options}

    const app = express();
    app.set("port",config.port);
    if(config.publicPath) app.use(express.static(config.publicPath))
    app.use('*',cors())

    app.use(morganMiddleware);
    app.use(compressionMiddleware);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const wrapperError = (res :Response,statusCode : number,message : string) : void=> {
        res.status(statusCode).json(mapErrorResponse(statusCode, message));
    };
    
    const HandleErrors = (): void => {
        app.use( (err: any ,_req : Request , res : Response, next : NextFunction) => {
            if(err.message === 'cors') return wrapperError(res,403 ,"Forbidden"); 
            if(err.message === 'connected_devices_restriction') return wrapperError(res,423 ,"connected_devices_restriction");
            if(err.status === 401) return wrapperError(res,404 ,"No encontrado");
            if(["ForbiddenException","HttpException","AuthenticationException"].includes(err.constructor.name) ) return wrapperError(res,err.status ,err.message);
                
            if(err instanceof ValidationError){
                const message = Object.values(err.details).reduce( (a,v) => {
                                            a.push(...v.map((i:any) => i.message))
                                            return a
                                            },[]).join(" ");

                    return wrapperError(res,err.statusCode ,message); 
                }
                return wrapperError(res,500 ,err.message); 
            }
        )
    }

    const start = (): void=> {
        HandleErrors();
        app.listen(config.port, ()=> { console.log("Server on port", config.port) } );
    }
    
    return{start, app,};

} 

export default server