import { Request, Response } from "express"
import { createProcedureService } from "../../services/procedure/createPrcedureService"


export const createProcedureController = async (req: Request, res: Response) => {
    const data = req.body 
    const newProcedure = await createProcedureService(data)

    return res.status(201).json(newProcedure)

}