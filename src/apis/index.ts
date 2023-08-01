import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// 假設 API 的根 URL 為 "/api"
// const baseURL = "/api";

// 定義 API 響應的介面
interface IAPIResponse<T> {
  result: APIResultCode;
  msg: string;
  content: T;
}

export enum APIResultCode {
  unknow_error = 0,
  success = 1,
  missing_parameter = 2,
}

// 定義一個通用的 API 請求函數
export async function apiRequest<T>(method: string, url: string, data?: any): Promise<T> {

  const config = {
    method,
    // url: `${baseURL}/${url}`,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response: AxiosResponse<IAPIResponse<T>> = await axios(config);
    if (response.data.result === APIResultCode.success) {
      return response.data.content;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw error;
  }
}