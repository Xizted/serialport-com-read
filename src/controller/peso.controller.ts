import { NextFunction, Request, Response } from 'express';
import { getPesoServices, getPortService } from '../services/peso.services';

export const getPesoController = async (
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
export const getPortCom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getPortService();
    return res.send({ status: true, code: 200, data });
  } catch (error) {
    next(error);
  }
};
