import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { courseService } from '../../services/Microservices/courseservice';

export class Create {
  public async course(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await courseService.createCourse(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: response.data.message, course: response.data.course });
  }
}
