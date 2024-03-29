import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyTokenn = (req, res, next) => {
  const token = req.cookies.userJwt;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_CODE, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};