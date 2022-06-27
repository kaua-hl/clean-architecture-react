// export type HttpStatusCode = {
//   unathorized: 401
// }

export enum HttpStatusCode  {
  noContent = 204,
  unathorized = 401,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
}