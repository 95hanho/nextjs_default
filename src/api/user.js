import { get_normal, post_urlFormData } from "./apiDoc";
//
export const joinUser = (obj) => post_urlFormData("/api/user", obj);
//
export const joinUser2 = (obj) => post_urlFormData("/api/user/mysql", obj);
//
export const getUser = () => get_normal("/api/user").then(({ data }) => data);
