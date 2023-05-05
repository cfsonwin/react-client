import myAxios from "./myAxios";
import { todoItemT } from "../pages/todolist";

//get todoList
export const getTodoList = (user:string) => myAxios("/todoList", {user: user}, "GET")
export const addNewTodo = (data:todoItemT) => myAxios("/todoList", data, "POST")
export const deleteTodo = (id:string, user:string) => myAxios(`/todoList/${user}/${id}`, {}, "DELETE")
export const getApplications = (user:string) =>  myAxios(`/applications/${user}`, {}, "GET")
export const createApplications = (user:string, newApp:any) =>  myAxios(`/applications/${user}`, newApp, "POST")
export const updateApplications = (user:string, data:any) =>  myAxios(`/applications/${user}`, data, "PUT")
export const getDetails = (user:string, id:string) => myAxios(`/applications/${user}/details/${id}`, {}, "GET")
export const updateDetails = (user:string, id:string, data:string) => myAxios(`/applications/${user}/details/${id}`, {data}, "PUT")