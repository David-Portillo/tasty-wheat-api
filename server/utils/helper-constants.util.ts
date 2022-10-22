enum HttpMethod {
  GET,
  HEAD,
  POST,
  PUT,
  DELETE,
  CONNECT,
  OPTIONS,
  TRACE,
  PATCH
}

export type HttpMethodStrings = keyof typeof HttpMethod;
export type ErrorCodeType = 500 | 404;
