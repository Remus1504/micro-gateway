import { Create } from '../controllers/Course/createCourse';
import { Delete } from '../controllers/Course/deleteCourse';
import { Get } from '../controllers/Course/getCourse';
import { Search } from '../controllers/Course/search';
import { CourseSeed } from '../controllers/Course/seed';
import { Update } from '../controllers/Course/updateCourse';
import { authMiddleware } from '../services/authentication';
import express, { Router } from 'express';

class CourseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/course/:courseId',
      authMiddleware.checkAuthentication,
      Get.prototype.courseById,
    );
    this.router.get(
      '/course/instructor/:instructorId',
      authMiddleware.checkAuthentication,
      Get.prototype.getInstructorCourses,
    );
    this.router.get(
      '/course/instructor/pause/:instructorId',
      authMiddleware.checkAuthentication,
      Get.prototype.getInstructorPausedCourses,
    );
    this.router.get(
      '/course/search/:from/:size/:type',
      authMiddleware.checkAuthentication,
      Search.prototype.courses,
    );
    this.router.get(
      '/course/category/:username',
      authMiddleware.checkAuthentication,
      Get.prototype.getCoursesByCategory,
    );
    this.router.get(
      '/course/top/:username',
      authMiddleware.checkAuthentication,
      Get.prototype.getTopRatedCoursesByCategory,
    );
    this.router.get(
      '/course/similar/:courseId',
      authMiddleware.checkAuthentication,
      Get.prototype.getMoreCoursesLikeThis,
    );
    this.router.post(
      '/course/create',
      authMiddleware.checkAuthentication,
      Create.prototype.course,
    );
    this.router.put(
      '/course/:courseId',
      authMiddleware.checkAuthentication,
      Update.prototype.course,
    );
    this.router.put(
      '/course/active/:courseId',
      authMiddleware.checkAuthentication,
      Update.prototype.courseActive,
    );
    this.router.put(
      '/course/seed/:count',
      authMiddleware.checkAuthentication,
      CourseSeed.prototype.course,
    );
    this.router.delete(
      '/course/:courseId/:instructorId',
      authMiddleware.checkAuthentication,
      Delete.prototype.course,
    );
    return this.router;
  }
}

export const courseRoutes: CourseRoutes = new CourseRoutes();
