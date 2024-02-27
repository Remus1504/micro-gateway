import { Get } from '../controllers/Users/Student/getStudent';
import { authMiddleware } from '../services/authentication';
import express, { Router } from 'express';

class StudentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/student/email',
      authMiddleware.checkAuthentication,
      Get.prototype.email,
    );
    this.router.get(
      '/student/username',
      authMiddleware.checkAuthentication,
      Get.prototype.currentUsername,
    );
    this.router.get(
      '/student/:username',
      authMiddleware.checkAuthentication,
      Get.prototype.username,
    );
    return this.router;
  }
}

export const studentRoutes: StudentRoutes = new StudentRoutes();
