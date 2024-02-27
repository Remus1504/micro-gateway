import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '../../configuration';
import { InstructorCourse } from '@remus1504/micrograde';

export let axiosCourseInstance: ReturnType<typeof axios.create>;

class CourseService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(
      `${config.COURSE_BASE_URL}/api/v1/course`,
      'course',
    );
    axiosCourseInstance = axiosService.axios;
  }

  async getCourseById(courseId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.get(
      `/${courseId}`,
    );
    return response;
  }

  async getInstructorCourses(instructorId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.get(
      `/instructor/${instructorId}`,
    );
    return response;
  }

  async getInstructorPausedCourses(
    instructorId: string,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.get(
      `/instructor/pause/${instructorId}`,
    );
    return response;
  }

  async getCoursesByCategory(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.get(
      `/category/${username}`,
    );
    return response;
  }

  async getMoreCoursesLikeThis(courseId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.get(
      `/similar/${courseId}`,
    );
    return response;
  }

  async getTopRatedCoursesByCategory(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.get(
      `/top/${username}`,
    );
    return response;
  }

  async searchCourses(
    query: string,
    from: string,
    size: string,
    type: string,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.get(
      `/search/${from}/${size}/${type}?${query}`,
    );
    return response;
  }

  async createCourse(body: InstructorCourse): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.post(
      '/create',
      body,
    );
    return response;
  }

  async updateCourse(
    courseId: string,
    body: InstructorCourse,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.put(
      `/${courseId}`,
      body,
    );
    return response;
  }

  async deleteCourse(
    courseId: string,
    instructorId: string,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.delete(
      `/${courseId}/${instructorId}`,
    );
    return response;
  }

  async updateActiveCourseProp(
    courseId: string,
    active: boolean,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.put(
      `/active/${courseId}`,
      { active },
    );
    return response;
  }

  async seed(count: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosCourseInstance.put(
      `/seed/${count}`,
    );
    return response;
  }
}

export const courseService: CourseService = new CourseService();
