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
