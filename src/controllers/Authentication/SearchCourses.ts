import { authService } from '../../services/Microservices/authservice';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Search {
  public async courseById(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.getCourse(
      req.params.courseId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, course: response.data.course });
  }

  public async course(req: Request, res: Response): Promise<void> {
    const { from, size, type } = req.params;
    let query = '';
    const objList = Object.entries(req.query);
    const lastItemIndex = objList.length - 1;
    objList.forEach(([key, value], index) => {
      query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
    });
    const response: AxiosResponse = await authService.getCourses(
      `${query}`,
      from,
      size,
      type,
    );
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      total: response.data.total,
      course: response.data.course,
    });
  }
}
