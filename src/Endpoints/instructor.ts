import { Create } from '../controllers/Users/Instructor/createInstructor';
import { Get } from '../controllers/Users/Instructor/getInstructor';
import { instructorSeed } from '../controllers/Users/Instructor/seed';
import { Update } from '../controllers/Users/Instructor/updateInstructor';
import { authMiddleware } from '../services/authentication';
import express, { Router } from 'express';

class InstructorRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/instructor/id/:instructorId',
      authMiddleware.checkAuthentication,
      Get.prototype.id,
    );
    this.router.get(
      '/instructor/username/:username',
      authMiddleware.checkAuthentication,
      Get.prototype.username,
    );
    this.router.get(
      '/instructor/random/:size',
      authMiddleware.checkAuthentication,
      Get.prototype.random,
    );
    this.router.post(
      '/instructor/create',
      authMiddleware.checkAuthentication,
      Create.prototype.instructor,
    );
    this.router.put(
      '/instructor/:instructorId',
      authMiddleware.checkAuthentication,
      Update.prototype.instructor,
    );
    this.router.put(
      '/instructor/seed/:count',
      authMiddleware.checkAuthentication,
      instructorSeed.prototype.instructor,
    );

    return this.router;
  }
}

export const instructorRoutes: InstructorRoutes = new InstructorRoutes();
