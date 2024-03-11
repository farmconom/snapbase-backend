export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export function createResponse(
  status: number,
  message: string,
  data?: any,
): any {
  return {
    status,
    message,
    data: data || null,
  };
}

export function addPrefixToKeys(obj: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    newObj[`${key}`] = value;
  }
  return newObj;
}
