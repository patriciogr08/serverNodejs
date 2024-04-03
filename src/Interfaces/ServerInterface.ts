import { Application } from "express";

export interface ServerConfig {
    port : number,
    publicPath : string
}

export interface Server {
    app : Application;
    start :Function;
}