import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '../../configuration';

export let axiosStudentInstance: ReturnType<typeof axios.create>;

class StudentService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.USERS_BASE_URL}/api/v1/student`, 'student');
    axiosStudentInstance = axiosService.axios;
  }

  async getCurrentStudentByUsername(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosStudentInstance.get('/username');
    return response;
  }

  async getStudentByUsername(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosStudentInstance.get(`/${username}`);
    return response;
  }

  async getStudentByEmail(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosStudentInstance.get('/email');
    return response;
  }
}

export const studentService: StudentService = new StudentService();
