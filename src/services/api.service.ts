import axios, { AxiosRequestConfig } from 'axios';
import { NEXT_PUBLIC_API_HOST } from '../constants';


class ApiService {
  async get(url: string, config?: AxiosRequestConfig<any> | undefined) {
    const response = await axios.get(
      NEXT_PUBLIC_API_HOST + url,
      config
    );
    return response;
  }

  async post(
    url: string,
    data?: { [key: string]: any } | null | undefined,
    config?: AxiosRequestConfig<null> | undefined
  ) {
    const response = await axios.post(
      NEXT_PUBLIC_API_HOST + url,
      data,
      config
    );
    return response;
  }
}

export default ApiService;