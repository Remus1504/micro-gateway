import { AxiosService } from '@gateway/services/axios';
import {
  IEnrolmentDocument,
  IExtendedEnrolment,
  IDeliveredWork,
  IEnrolmentMessage,
} from '@remus1504/micrograde';
import axios, { AxiosResponse } from 'axios';

export let axiosEnrolmentInstance: ReturnType<typeof axios.create>;

export class enrolmentService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(
      `${process.env.ORDER_BASE_URL}/api/v1/enrolment`,
      'enrolment',
    );
    axiosEnrolmentInstance = axiosService.axios;
  }

  async getEnrolmentById(enrolmentId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.get(
      `/${enrolmentId}`,
    );
    return response;
  }

  async InstructorOrders(instructorId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.get(
      `/instructor/${instructorId}`,
    );
    return response;
  }

  async studentOrders(studentId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.get(
      `/student/${studentId}`,
    );
    return response;
  }

  async createOrderIntent(
    price: number,
    studentId: string,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.post(
      '/create-payment-intent',
      { price, studentId },
    );
    return response;
  }

  async createOrder(body: IEnrolmentDocument): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.post(
      '/',
      body,
    );
    return response;
  }

  async cancelEnrolment(
    paymentIntentId: string,
    enrolmentId: string,
    body: IEnrolmentMessage,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.put(
      `/cancel/${enrolmentId}`,
      { paymentIntentId, orderData: body },
    );
    return response;
  }

  async requestEnrolmentDateExtension(
    enrolmentId: string,
    body: IExtendedEnrolment,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.put(
      `/extension/${enrolmentId}`,
      body,
    );
    return response;
  }

  async updateDeliveryDate(
    orderId: string,
    type: string,
    body: IExtendedEnrolment,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.put(
      `/course/${type}/${orderId}`,
      body,
    );
    return response;
  }

  async deliverEnrolmentOrder(
    courseId: string,
    body: IDeliveredWork,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.put(
      `/deliver-order/${courseId}`,
      body,
    );
    return response;
  }

  async approveEnrolmentOrder(
    enrolmentId: string,
    body: IEnrolmentMessage,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.put(
      `/approve-order/${enrolmentId}`,
      body,
    );
    return response;
  }

  async getNotifications(userTo: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.get(
      `/notification/${userTo}`,
    );
    return response;
  }

  async markNotificationAsRead(notificationId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosEnrolmentInstance.put(
      '/notification/mark-as-read',
      { notificationId },
    );
    return response;
  }
}

export const enrolService: enrolmentService = new enrolmentService();
