import { Request, Response, NextFunction } from "express";
import { AuthenticationInput } from "../types";
import { getAuth } from "../middleware/requireAuth";

export const checkRole = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {

		// get role from token
		const auth = getAuth(req);
		const tokenRole = auth.role;

		// check if role is given inside token
		if (!tokenRole) { return res.status(403).json({ message: "No role found in JWT"}); }

		// check if role inside the token has access
		let hasAccess: boolean = false;
        for (const role of roles) {
        	if (role === tokenRole) { hasAccess = true; }
        }
        if (!hasAccess) { return res.status(403).json({ message: "Access denied" }); }

        next();
	}
}