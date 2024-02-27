import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { courseService } from '../../services/Microservices/courseservice';

export class Get {
  public async courseById(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await courseService.getCourseById(
      req.params.courseId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, course: response.data.course });
  }

  public async getInstructorCourses(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await courseService.getInstructorCourses(
      req.params.instructorId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, courses: response.data.courses });
  }

  public async getInstructorPausedCourses(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse =
      await courseService.getInstructorPausedCourses(req.params.instructorId);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, courses: response.data.courses });
  }

  public async getCoursesByCategory(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await courseService.getCoursesByCategory(
      req.params.username,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, courses: response.data.courses });
  }

  public async getMoreCoursesLikeThis(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await courseService.getMoreCoursesLikeThis(
      req.params.courseId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, courses: response.data.courses });
  }

  public async getTopRatedCoursesByCategory(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse =
      await courseService.getTopRatedCoursesByCategory(req.params.username);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, courses: response.data.courses });
  }
}
