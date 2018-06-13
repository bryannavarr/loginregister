import axiosInstance from "../config/axios.config";

const headers = {};

const baseUrl = `${process.env.REACT_APP_BASEPATH}/users`;

export function getById(id) {
  const config = {
    method: "GET",
    headers
  };
  return axiosInstance(baseUrl + "/" + id, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function create(usersData) {
  const config = {
    method: "POST",
    headers,
    data: usersData
  };
  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function logout() {
  const config = {
    method: "POST",
    headers,
    withCredentials: true
  };
  return axiosInstance(baseUrl + "/logout", config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function readAll() {
  const config = {
    method: "GET",
    headers
  };
  return axiosInstance
    .get(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(usersData) {
  const config = {
    method: "PUT",
    headers,
    data: usersData
  };
  return axiosInstance(`${baseUrl}/${usersData._id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function del(id) {
  const config = {
    method: "DELETE",
    headers
  };
  return axiosInstance(`${baseUrl}/${id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function login(usersData) {
  const config = {
    method: "POST",
    data: usersData,
    withCredentials: true
  };
  return axiosInstance(baseUrl + "/login", config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function resetPassword(usersData) {
  const config = {
    method: "PUT",
    data: usersData
  };
  return axiosInstance(baseUrl + "/reset-password", config)
    .then(data => {
      return responseSuccessHandler(data);
    })
    .catch(data => {
      return responseErrorHandler(data);
    });
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};
