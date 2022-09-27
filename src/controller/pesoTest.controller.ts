import { NextFunction, Request, Response } from 'express';
import getPesoTestServices from '../services/pesoTest.services';

const getPesoTestController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getPesoTestServices();
    return res.send({ status: true, code: 200, data });
  } catch (error) {
    next(error);
  }
};

export default getPesoTestController;
