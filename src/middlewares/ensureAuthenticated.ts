import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

interface TokenPayLoad {
    role: string,
    sub: string
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction)
{

    const authHeader = request.headers.authorization

    if(!authHeader){

        throw new AppError("JWT não informado", 401)
    }

    const [, token] = authHeader.split(" ")

    const { sub: user_id, role } = verify(token, authConfig.jwt.secret) as TokenPayLoad

    request.user = {
        id: String(user_id),
        role,
    }


    return next()
}

export { ensureAuthenticated }