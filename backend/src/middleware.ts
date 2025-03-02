import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { jwtSecret } from "./config";

interface AuthRequest extends Request {
  owner?: {
    email: string
  };
}

export function Authentication (req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if(!token) {
    res.status(401).json({
      message: "No token provided"
    })
    return;
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as {email: string}

    req.owner = { 
      email: payload.email
    };

    next();

  } catch (error: any) {
    res.status(403).json({
      message: "Invalid token"
    })
  }
}