import { switchMap } from "rxjs";
import { DELETE, execFetch, GET, getPathFrom, POST, PUT } from "../../util/api";

export const execTestRequest = execFetch(
  getPathFrom(`${process.env.NEXT_PUBLIC_API_PATHNAME}/api/v1/test`)
);

export const getDataTestsAll = () => execTestRequest(GET(""));

export const addDataTest = (data: any) => execTestRequest(POST("", data));

export const editDataTest = (id: any, data: any) =>
  execTestRequest(PUT(`/${id}`, data));

export const deleteDataTest = (id: any) => execTestRequest(DELETE(`/${id}`));
