import { api, formDataApi } from "./api";




//  create data

export const createNotificationEP = (data:any) => api.post("/notifications", data).then((res) => res?.data);

export const createOrderEP = (data:any) => api.post("/orders", data).then((res) => res?.data);

export const loginEP = (data:any) => api.post("/auth/login", data).then((res) => res?.data);

export const forgotPasswordEP = (data:any) => api.post("/auth/forgot-password", data).then((res) => res?.data);

export const registerEP = (data:any) => api.post("/auth/register", data).then((res) => res?.data);

export const createProductsEP = (data:any) => formDataApi.post("/products", data).then((res) => res?.data);

export const changePasswordEP = (data:any, id:string) => api.put (`/auth/${id}/change-password`, data).then((res) => res?.data);

export const resetPasswordEP = (data:any, resetToken:string) => api.post(`/auth/reset-password/${resetToken}`, data).then((res) => res?.data);

export const updateProductsEP = (data:any, id:string) => formDataApi.put(`/products/${id}`, data).then((res) => res?.data);

export const addCartEP = (data:any, userId:string) => api.post(`/auth/carts/${userId}/products`, data).then((res) => res?.data);


export const updateUserEP = (data: any, id: string) => formDataApi.put(`/auth/${id}`, data).then((res) => res?.data);

export const commentEP = (data: any, ) => api.post(`/reviews`, data).then((res) => res?.data);



//  fetch all data
export const fetchMatricsEP = () => api.get("/matrics").then((res) => res?.data);
export const fetchOrdersPerDayEP = () => api.get("/matrics/orders-per-day").then((res) => res?.data);
export const fetchUsersPerDayEP = () => api.get("/matrics/users-per-day").then((res) => res?.data);
export const fetchProductsPerDayEP = () => api.get("/matrics/products-per-day").then((res) => res?.data);
export const fetchOrdersEP = () => api.get("/orders").then((res) => res?.data);
export const fetchUsersEP = () => api.get("/auth").then((res) => res?.data);
export const fetchCategoriesEP = () => api.get("/category").then((res) => res?.data);
export const fetchSubCategoriesEP = () => api.get("/subCategory").then((res) => res?.data);
export const fetchProductsEP = () => api.get("/products").then((res) => res?.data);
export const fetchCartsEP = (id:string) => api.get(`/carts/${id}`).then((res) => res?.data);
export const fetchNotificationsEP = (id:string) => api.get(`/notifications/${id}`).then((res) => res?.data);
export const fetchOrderEP = (id: string) => api.get(`/orders/${id}`).then((res) => res?.data);

// delete product
export const deleteProductEP = (id:string) => api.delete(`/products/delete/${id}`).then((res) => res?.data);
export const DeleteCommentEP = (id:string) => api.delete(`/reviews/${id}`).then((res) => res?.data);


export const toggleRoleEP = (id:string) => api.put(`/auth/${id}/toggle-role`).then((res) => res?.data);