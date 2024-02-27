import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '../../configuration';
import { InstructorDocument } from '@remus1504/micrograde'; // Assuming you have an interface for instructor documents

export let axiosInstructorInstance: ReturnType<typeof axios.create>;

class InstructorService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(
      `${config.USERS_BASE_URL}/api/v1/instructor`,
      'instructor',
    );
    axiosInstructorInstance = axiosService.axios;
  }

  async getInstructorById(instructorId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosInstructorInstance.get(
      `/id/${instructorId}`,
    );
    return response;
  }

  async getInstructorByUsername(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosInstructorInstance.get(
      `/username/${username}`,
    );
    return response;
  }

  async getRandomInstructors(size: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosInstructorInstance.get(
      `/random/${size}`,
    );
    return response;
  }

  async createInstructor(body: InstructorDocument): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosInstructorInstance.post(
      '/create',
      body,
    );
    return response;
  }

  async updateInstructor(
    instructorId: string,
    body: InstructorDocument,
  ): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosInstructorInstance.put(
      `/${instructorId}`,
      body,
    );
    return response;
  }

  async seed(count: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosInstructorInstance.put(
      `/seed/${count}`,
    );
    return response;
  }
}

export const instructorService: InstructorService = new InstructorService();
