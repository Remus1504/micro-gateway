import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { enrolService } from '../../services/Microservices/enrolmentservice';

export class Create {
  public async intent(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await enrolService.createOrderIntent(
      req.body.price,
      req.body.studentId,
    );
    res.status(StatusCodes.CREATED).json({
      message: response.data.message,
      clientSecret: response.data.clientSecret,
      paymentIntentId: response.data.paymentIntentId,
    });
  }

  public async enrolmentOrder(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await enrolService.createOrder(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: response.data.message, order: response.data.order });
  }
}
