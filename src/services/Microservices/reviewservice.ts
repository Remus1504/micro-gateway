import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '../../configuration';
import { IReviewDocument } from '@remus1504/micrograde';

export let axiosReviewInstance: ReturnType<typeof axios.create>;

class ReviewService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(
      `${config.REVIEW_BASE_URL}/api/v1/review`,
      'review',
    );
    axiosReviewInstance = axiosService.axios;
  }

  async getReviewsByCourseId(courseId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosReviewInstance.get(
      `/course/${courseId}`,
    );
    return response;
  }

  async getReviewsByInstructorId(instructorId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosReviewInstance.get(
      `/instructor/${instructorId}`,
    );
    return response;
  }

  async addReview(body: IReviewDocument): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosReviewInstance.post('/', body);
    return response;
  }
}

export const reviewService: ReviewService = new ReviewService();
