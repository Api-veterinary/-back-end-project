import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const ensureDataIsValidMiddleware =
	(schema: AnySchema) =>
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const validatedData = await schema.validate(request.body, {
				abortEarly: false,
				stripUnknown: true,
			});

            request.validatedBody = validatedData;

			return next();
		} catch (error: any) {
			return response.status(401).json({ error: error.errors });
		}
	};

export default ensureDataIsValidMiddleware;