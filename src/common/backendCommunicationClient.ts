import { AxiosInstance } from 'axios';
import axiosInstance from './axios';

export type BackendCommunicationClientReturnType = {
  success: boolean,
  message: string,
  data?: Record<string, any>,
}

export class BackendCommunicationClient {
  private static instance: BackendCommunicationClient;
  private axiosInstance: AxiosInstance = axiosInstance;

  private constructor() {}

  public static getInstance(): BackendCommunicationClient {
    if(!BackendCommunicationClient.instance) {
      BackendCommunicationClient.instance = new BackendCommunicationClient();
    }
    return BackendCommunicationClient.instance;
  }

  public async postText(text: string): Promise<BackendCommunicationClientReturnType> {
    try {
      let response = await this.axiosInstance({
        method: 'post',
        url: '/text',
        data: {
          text: text
        }
      });
      if (response.status === 200) {
        return {
          success: true,
          message: 'Successfully added text',
          data: response.data,
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('error in postText', error);
      return {
        success: false,
        message: 'Failed to add text',
      }
    }
  }

  public async getText(id: string): Promise<BackendCommunicationClientReturnType> {
    let toReturn: BackendCommunicationClientReturnType;
    try {
      let response = await this.axiosInstance({
        method: 'get',
        url: `/text/${id}`
      });
      if (response.status === 200) {
        toReturn = {
          success: true,
          message: 'Successfully fetched text',
          data: {...response.data.text}
        }
      } else if (response.status === 404) {
        toReturn = {
          success: false,
          message: 'Text not found',
        }
      }
    } catch (error) {
      console.error('error in getText. id: ', id);
      toReturn = {
        success: false,
        message: 'Error retrieving text',
      }
    }
    return toReturn!;
  }
}