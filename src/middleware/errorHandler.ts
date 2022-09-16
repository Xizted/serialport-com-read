import { Request, Response } from 'express';

const errorHandler = (error: Error, req: Request, res: Response) =>
  res.status(500).send(error);

export default errorHandler;
