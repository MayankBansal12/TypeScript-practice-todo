import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const SECRET = 'SECr3t';  

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, payload) => {
      if (err || !payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }
      req.headers["user-id"] = payload.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export {
  authenticateJwt,
  SECRET
}
