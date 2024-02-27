import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import { enrolService } from '../../src/services/Microservices/enrolmentservice';

export class Update {
  public async cancel(req: Request, res: Response): Promise<void> {
    const { enrolmentId } = req.params;
    const { orderData, paymentIntentId } = req.body;
    const response: AxiosResponse = await enrolService.cancelEnrolment(
      paymentIntentId,
      enrolmentId,
      orderData,
    );
    res.status(StatusCodes.CREATED).json({ message: response.data.message });
  }

  public async requestExtension(req: Request, res: Response): Promise<void> {
    const { enrolmentId } = req.params;
    const response: AxiosResponse =
      await enrolService.requestEnrolmentDateExtension(enrolmentId, req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async deliveryDate(req: Request, res: Response): Promise<void> {
    const { enrolmentId, type } = req.params;
    const response: AxiosResponse = await enrolService.updateDeliveryDate(
      enrolmentId,
      type,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async deliverOrder(req: Request, res: Response): Promise<void> {
    const { enrolmentId } = req.params;
    const response: AxiosResponse = await enrolService.deliverEnrolmentOrder(
      enrolmentId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async approveOrder(req: Request, res: Response): Promise<void> {
    const { enrolmentId } = req.params;
    const response: AxiosResponse = await enrolService.approveEnrolmentOrder(
      enrolmentId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async markNotificationAsRead(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { notificationId } = req.body;
    const response: AxiosResponse =
      await enrolService.markNotificationAsRead(notificationId);
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      notification: response.data.notification,
    });
  }
}
