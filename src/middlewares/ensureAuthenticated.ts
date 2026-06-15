import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

function ensureAuthenticated(request: Request, response: Response, next: NextFunction)
{

    const authHeader = request.headers.authorization

    if(!authHeader){

        throw new AppError("JWT não informado", 401)
    }

    const [, token] = authHeader.split(" ")

    verify(token, authConfig.jwt.secret)


    return next()
}

export { ensureAuthenticated }