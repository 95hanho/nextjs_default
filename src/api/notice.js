import { get_normal, post_urlFormData, put_urlFormData } from "./apiDoc";

// 자유게시판 작성
export const createFree = (obj) => post_urlFormData("/api/notice/free", obj);
// 자유게시판 삭제
export const updateFree = (obj) => put_urlFormData("/api/notice/free", obj);
// 자유게시판 조회수 증가
export const hitFree = (id) => get_normal(`/api/notice/free/${id}`);
