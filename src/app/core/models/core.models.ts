export interface CommonResponse<T = object> {
  data: T;
  message: string[];
  fieldsErrors: string[];
  resultCode: number;
}
