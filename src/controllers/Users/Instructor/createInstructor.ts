import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { instructorService } from '../../../services/Microservices/instructorservice';

export class Create {
  public async instructor(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await instructorService.createInstructor(
      req.body,
    );
    res
      .status(StatusCodes.CREATED)
      .json({
        message: response.data.message,
        instructor: response.data.instructor,
      });
  }
}
