import { Request, Response } from "express"
import { IProcedureScheduleRequest } from "../../interfaces/Procedure_Schedule"
import { createProcedureService } from "../../services/procedure/createPrcedureService"


export const createProcedureController = async (req: Request, res: Response) => {
    const data : IProcedureScheduleRequest = req.body 
    const newProcedure = await createProcedureService(data)

    return res.status(201).json(newProcedure)

}