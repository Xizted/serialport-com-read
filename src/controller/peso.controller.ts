import { NextFunction, Request, Response } from 'express';
import getPesoServices from '../services/peso.services';

const getPesoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getPesoServices();
    return res.send({ status: true, code: 200, data });
  } catch (error) {
    next(error);
  }
};

export default getPesoController;
