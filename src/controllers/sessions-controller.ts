import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"

class SessionsController {
  async create(request: Request, response: Response) {

    const fakeUser = {
      id: 1,
      username: "gabriel",
      password: "123"
    }
    const { username, password } = request.body

    if(username !== fakeUser.username || password !== fakeUser.password ){
      throw new AppError("Username e/ou senha inválidos", 401)
    }

    const { secret} = authConfig.jwt
    const token = sign({}, secret, {
      expiresIn: "1d" as string,
      subject: String(fakeUser.id)
    })

    return response.json({token})
  }
}

export { SessionsController }
