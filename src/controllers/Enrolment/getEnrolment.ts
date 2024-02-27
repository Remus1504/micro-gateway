import { enrolService } from '../../services/Microservices/enrolmentservice';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Get {
  public async enrolmentId(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await enrolService.getEnrolmentById(
      req.params.orderId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async instructorOrders(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await enrolService.InstructorOrders(
      req.params.instructorId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, orders: response.data.orders });
  }

  public async studentOrders(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await enrolService.studentOrders(
      req.params.studentId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, orders: response.data.orders });
  }

  public async notifications(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await enrolService.getNotifications(
      req.params.userTo,
    );
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      notifications: response.data.notifications,
    });
  }
}
