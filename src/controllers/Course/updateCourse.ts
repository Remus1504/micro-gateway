import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { courseService } from '../../services/Microservices/courseservice';

export class Update {
  public async course(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await courseService.updateCourse(
      req.params.courseId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, course: response.data.course });
  }

  public async courseActive(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await courseService.updateActiveCourseProp(
      req.params.courseId,
      req.body.active,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, course: response.data.course });
  }
}
