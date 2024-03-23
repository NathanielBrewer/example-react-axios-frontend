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

  
  /**
   * @description Returns singleton instance. Creates it first if doesn't already exist
   */
  public static getInstance(): BackendCommunicationClient {
    if(!BackendCommunicationClient.instance) {
      BackendCommunicationClient.instance = new BackendCommunicationClient();
    }
    return BackendCommunicationClient.instance;
  }
  
  /**
   * @description Send text string to backend /text endpoint via request.data.text
   */
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

  /**
   * @description Submit GET request to backend at route /text/${id} where id is the string param
   */
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
  
  /**
   * @description Submit POST request to backend route /file where body.data is the formData param
   */
  public async uploadFile(formData: FormData): Promise<BackendCommunicationClientReturnType> {
    try {
      let response = await this.axiosInstance({
        method: 'post',
        url: '/file',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData
      });
      return {
        success: true,
        message: 'Successfully uploaded file',
        data: {
          filename: response.data.filename,
        }
      }
    } catch (error) {
      console.error('error in uploadFIle', error);
      return {
        success: false,
        message: 'Failed to upload file'
      };
    }
  }

  
  /**
   * @description Submit GET request to backend route /file/${filename} where filename is the string param
   */
  public async downloadFile(filename: string): Promise<BackendCommunicationClientReturnType> {
    try {
      let response = await this.axiosInstance({
        method: 'get',
        url: `/file/${filename}`,
        responseType: 'blob',
      });
      return {
        success: true,
        message: 'Successfully retrieved file from Firebase',
        data: {
          blob: new Blob([response.data])
        }
      }
    } catch (error) {
      console.error('error in downloadFIle', error);
      return {
        success: false,
        message: 'Failed to retrieve file from Firebase'
      };
    }
  }
}