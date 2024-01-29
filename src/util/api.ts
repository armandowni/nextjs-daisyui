import { catchError, EMPTY, from, Observable, of } from "rxjs";
import * as R from "ramda";

export const getPath = (host: any) => (basePath: string) =>
  `${host}${basePath}`;

export const getPathFrom = getPath(
  process ? process.env.NEXT_PUBLIC_API_HOST : "http://localhost:3002"
);

export const downloadFrom = (path: string) => {
  const targetUrl = getPathFrom(path);

  window.open(targetUrl);
  return of({ status: "done" });
};

export const BuildFileData = (key: string, file: any) => {
  const fd = new FormData();
  fd.append(key, file);

  return fd;
};

export const AppendFileData = (data: FormData, key: string, file: any) => {
  data.append(key, file);

  return data;
};

export const encodeQuery = (query: any) =>
  encodeURIComponent(JSON.stringify({ ...query }));

async function assertError(response: Response) {
  if (response.status != 200) {
    // console.log(await response.text());
    const errorData = await response.json();
    // console.log(await );
    throw new Error(errorData.error);
  }
}

function normalizeQuery(params: any) {
  for (const key in params) {
    if (!params[key]) delete params[key];
    else if (typeof params[key] === "object")
      params[key] = JSON.stringify(params[key]);
  }

  return params;
}

const applyOptions = R.mergeDeepLeft<any>({
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${getToken()}`,
  },
});

const applyUrl = (path: string) => new URL(path);
const applyParams = (path: string, params: any): URL =>
  R.compose(
    // R.assoc("search", new URLSearchParams(normalizeQuery(params)).toString()),
    R.tap(
      (url: any) =>
        (url.search = new URLSearchParams(normalizeQuery(params)).toString())
    ),
    applyUrl
  )(path);

const applyData = (
  method: string,
  data: any,
  contentType: string = "application/json"
) =>
  R.compose(
    R.mergeDeepLeft<any>({
      method,
      headers: {
        "Content-Type": contentType,
      },
      body: data,
    }),
    applyOptions
  );

export const GET = (path: string, params?: any, options: any = {}) => ({
  url: { path, params },
  options: applyOptions(options),
});

export const POST = (
  path: string,
  data?: any,
  params?: any,
  options: any = {}
) => ({
  url: { path, params },
  options: applyData("POST", JSON.stringify(data))(options),
});

export const POST_FORM = (
  path: string,
  data?: any,
  params?: any,
  options: any = {}
) => ({
  url: { path, params },
  options: {
    method: "POST",
    body: data,
    ...options,
  },
});

export const PUT = (
  path: string,
  data?: any,
  params?: any,
  options: any = {}
) => ({
  url: { path, params },
  options: applyData("PUT", JSON.stringify(data))(options),
});

export const DELETE = (path: string, params?: any, options: any = {}) => ({
  url: { path, params },
  options: applyOptions(R.mergeDeepRight(options, { method: "DELETE" })),
});

export const execFetch =
  (basePath: string) =>
  ({ url, options }: any) => {
    return from(
      fetch(
        url.params
          ? applyParams(`${basePath}${url.path}`, url.params).toString()
          : applyUrl(`${basePath}${url.path}`).toString(),
        options
      )
        .then((res) => {
          if (res.status != 200 && res.status != 201)
            return res
              .text()
              .then((v) => ({ status: res.status, content: v } as any));

          return { status: res.status, content: res } as any;
        })
        .then(({ status, content }) => {
          if (status != 200 && status != 201)
            throw new Error(content.split(", reason: ")[0]);

          return content;
        })
    );
  };

export const responseToJson = (res: Response) => from(res.json());
