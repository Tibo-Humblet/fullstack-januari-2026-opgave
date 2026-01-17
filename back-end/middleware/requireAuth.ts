import { Request, Response, NextFunction } from "express";
import { AuthenticationInput } from "../types"

export function getAuth(req: Request): AuthenticationInput {

	// check if auth is in the request if not then throw error
	const auth = (req as any).auth as AuthenticationInput | undefined;
	if (!auth) { throw new Error("Authentication data missing on request"); }
	return auth;
}