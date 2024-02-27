import { Create } from '../controllers/Reviews/createReview';
import { Get } from '../controllers/Reviews/getReview';
import { authMiddleware } from '../services/authentication';
import express, { Router } from 'express';

class ReviewRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/review/course/:courseId',
      authMiddleware.checkAuthentication,
      Get.prototype.reviewsByCourseId,
    );
    this.router.get(
      '/review/instrcutor/:instructorId',
      authMiddleware.checkAuthentication,
      Get.prototype.reviewsByInstructorId,
    );
    this.router.post(
      '/review',
      authMiddleware.checkAuthentication,
      Create.prototype.review,
    );
    return this.router;
  }
}

export const reviewRoutes: ReviewRoutes = new ReviewRoutes();
