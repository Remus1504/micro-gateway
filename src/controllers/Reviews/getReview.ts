import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { reviewService } from '../../services/Microservices/reviewservice';

export class Get {
  public async reviewsByCourseId(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await reviewService.getReviewsByCourseId(
      req.params.gigId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, reviews: response.data.reviews });
  }

  public async reviewsByInstructorId(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse =
      await reviewService.getReviewsByInstructorId(req.params.sellerId);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, reviews: response.data.reviews });
  }
}
