export enum EndpointMethod {
    Post = "POST",
    Get = "GET",
    Put = "PUT",
    Delete = "DELETE",
}

export type EndpointDefinitionParams<T> = { [K in keyof T]: string | number | boolean | undefined };
export type EndpointDefinitionParamsAllowed<T> = EndpointDefinitionParams<T> | undefined;

export type EndpointDefinitionHeaders = Record<string, string>;

type Secure<T extends boolean> = T extends true ? { secure: T } : { secure?: T };

export type EndpointDefinition<
    TParams extends EndpointDefinitionParamsAllowed<TParams>,
    TData,
    TResponse,
    TSecure extends boolean = false
> = {
    url: string;
    method: EndpointMethod;
    params?: TParams;
    paramsInline?: (keyof TParams)[];
    data?: TData;
    response?: TResponse;
    noFormDataStringify?: boolean;
    headers?: EndpointDefinitionHeaders;
} & Secure<TSecure>;

export type EndpointGetArgs<TEndpointDefinition> = TEndpointDefinition extends EndpointDefinition<
    undefined,
    undefined,
    any,
    boolean
>
    ? { params?: undefined; data?: undefined }
    : TEndpointDefinition extends EndpointDefinition<infer TParamsOnly, undefined, any, boolean>
    ? { params: TParamsOnly }
    : TEndpointDefinition extends EndpointDefinition<undefined, infer TDataOnly, any, boolean>
    ? { data: TDataOnly }
    : TEndpointDefinition extends EndpointDefinition<infer TParams, infer TData, any, boolean>
    ? { params: TParams; data: TData }
    : never;

export type EndpointDefinitionGetParams<TEndpointDefinition> = TEndpointDefinition extends EndpointDefinition<
    infer TParams,
    any,
    any,
    boolean
>
    ? TParams
    : never;

export type EndpointDefinitionGetData<TEndpointDefinition> = TEndpointDefinition extends EndpointDefinition<
    any,
    infer TData,
    any,
    boolean
>
    ? TData
    : never;

export type EndpointDefinitionGetResponse<TEndpointDefinition> = TEndpointDefinition extends EndpointDefinition<
    any,
    any,
    infer TResponse,
    boolean
>
    ? TResponse
    : never;

export interface EndpointErrorResponse {
    response: {
        status: number;
        data?: {
            errorMessage?: string;
            errorCode?: string;
            errorData?: any;
        };
    };
}
