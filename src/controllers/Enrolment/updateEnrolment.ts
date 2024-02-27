import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import { enrolService } from '../../services/Microservices/enrolmentservice';

export class Update {
  public async cancel(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { orderData, paymentIntentId } = req.body;
    const response: AxiosResponse = await enrolService.cancelEnrolment(
      paymentIntentId,
      orderId,
      orderData,
    );
    res.status(StatusCodes.CREATED).json({ message: response.data.message });
  }

  public async requestExtension(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse =
      await enrolService.requestEnrolmentDateExtension(orderId, req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async deliveryDate(req: Request, res: Response): Promise<void> {
    const { orderId, type } = req.params;
    const response: AxiosResponse = await enrolService.updateDeliveryDate(
      orderId,
      type,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async deliverOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse = await enrolService.deliverEnrolmentOrder(
      orderId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async approveOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse = await enrolService.approveEnrolmentOrder(
      orderId,
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
