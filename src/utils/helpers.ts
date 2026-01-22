// src/utils/helpers.ts

// 检查API响应是否成功
export const isApiResponseSuccess = (response: any): boolean => {
  return response && response.success === true;
};

// 获取API响应中的数据
export const getApiData = (response: any) => {
  if (isApiResponseSuccess(response)) {
    return response.data;
  }
  throw new Error(response.message || 'API请求失败');
};

// 通用错误处理
export const handleApiError = (error: any, defaultMessage: string = '操作失败'): string => {
  console.error('API Error:', error);
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  return defaultMessage;
};