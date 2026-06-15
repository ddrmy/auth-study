import { Request, Response } from "express"

class ProductsController {
  async index(request: Request, response: Response) {

    return response.json({message: "index"})
  }

  async create(request: Request, response: Response) {

    response.json({message: "create"})
  }
}

export { ProductsController }
