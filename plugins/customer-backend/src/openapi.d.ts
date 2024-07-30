import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Paths {
  namespace Validate {
    export interface RequestBody {
      type: 'username' | 'id';
      value: string;
      formData: {
        [key: string]: any;
      };
    }
    namespace Responses {
      export interface $200 {
        valid?: boolean;
        message?: string;
      }
    }
  }
}

export interface OperationMethods {
  /**
   * validate - validate
   *
   * validate
   */
  'validate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Validate.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.Validate.Responses.$200>;
}

export interface PathsDictionary {
  ['/validate']: {
    /**
     * validate - validate
     *
     * validate
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Validate.RequestBody,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.Validate.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
