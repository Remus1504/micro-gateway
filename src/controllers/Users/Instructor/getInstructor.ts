import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { instructorService } from '../../../services/Microservices/instructorservice';

export class Get {
  public async id(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await instructorService.getInstructorById(
      req.params.InstructorId,
    );
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        instructor: response.data.instructor,
      });
  }

  public async username(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse =
      await instructorService.getInstructorByUsername(req.params.username);
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        instructor: response.data.instructor,
      });
  }

  public async random(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse =
      await instructorService.getRandomInstructors(req.params.size);
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        instructor: response.data.instructor,
      });
  }
}
