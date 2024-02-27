import { studentService } from '../../../services/Microservices/studentservice';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export class Get {
  public async email(_req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await studentService.getStudentByEmail();
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, buyer: response.data.buyer });
  }

  public async currentUsername(_req: Request, res: Response): Promise<void> {
    const response: AxiosResponse =
      await studentService.getCurrentStudentByUsername();
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, buyer: response.data.buyer });
  }

  public async username(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await studentService.getStudentByUsername(
      req.params.username,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, buyer: response.data.buyer });
  }
}
