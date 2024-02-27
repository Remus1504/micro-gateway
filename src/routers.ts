import { Application } from 'express';
import { healthRoutes } from './Endpoints/HealthStatus';
import { authRoutes } from './Endpoints/auth';
import { authMiddleware } from './services/authentication';
import { currentUserRoutes } from './Endpoints/currentUser';
import { studentRoutes } from './Endpoints/student';
import { instructorRoutes } from './Endpoints/instructor';
import { messageRoutes } from './Endpoints/message';
import { courseRoutes } from './Endpoints/course';
import { enrolmentRoutes } from './Endpoints/enrolment';
import { reviewRoutes } from './Endpoints/review';

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, studentRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, instructorRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, courseRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, messageRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, enrolmentRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, reviewRoutes.routes());
};
