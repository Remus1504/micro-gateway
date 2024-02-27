import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { instructorService } from '../../../services/Microservices/instructorservice';

export class Update {
  public async instructor(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await instructorService.updateInstructor(
      req.params.instructorId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        instructor: response.data.instructor,
      });
  }
}
