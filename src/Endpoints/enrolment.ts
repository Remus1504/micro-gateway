import { Create } from '../controllers/Enrolment/createEnrolment';
import { Get } from '../controllers/Enrolment/getEnrolment';
import { Update } from '../controllers/Enrolment/updateEnrolment';
import express, { Router } from 'express';

class EnrolmentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/enrolment/notification/:userTo',
      Get.prototype.notifications,
    );
    this.router.get('/enrolment/:enrolmentId', Get.prototype.enrolmentId);
    this.router.get(
      '/enrolment/seller/:instructorId',
      Get.prototype.instructorOrders,
    );
    this.router.get(
      '/enrolment/student/:studentId',
      Get.prototype.studentOrders,
    );
    this.router.post('/enrolment', Create.prototype.enrolmentOrder);
    this.router.post(
      '/enrolment/create-payment-intent',
      Create.prototype.intent,
    );
    this.router.put('/enrolment/cancel/:enrolmentId', Update.prototype.cancel);
    this.router.put(
      '/enrolment/extension/:enrolmentId',
      Update.prototype.requestExtension,
    );
    this.router.put(
      '/enrolment/deliver-enrolment/:enrolmentId',
      Update.prototype.deliverOrder,
    );
    this.router.put(
      '/enrolment/approve-enrolment/:enrolmentId',
      Update.prototype.approveOrder,
    );
    this.router.put(
      '/enrolment/course/:type/:enrolmentId',
      Update.prototype.deliveryDate,
    );
    this.router.put(
      '/enrolment/notification/mark-as-read',
      Update.prototype.markNotificationAsRead,
    );

    return this.router;
  }
}

export const enrolmentRoutes: EnrolmentRoutes = new EnrolmentRoutes();
