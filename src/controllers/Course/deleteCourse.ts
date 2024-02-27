import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { courseService } from '../../services/Microservices/courseservice';

export class Delete {
  public async course(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await courseService.deleteCourse(
      req.params.courseId,
      req.params.instructorId,
    );
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
