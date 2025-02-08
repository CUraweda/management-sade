import axios, { AxiosPromise } from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_HRD_URL,
});

const MagangApi = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/employee", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }),
  recapByDivision: (token: string | null): AxiosPromise<any> =>
    instance.get("/employee/show-recap-division", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

const KaryawanApi = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/employee", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }),
  recapStatus: (token: string | null): AxiosPromise<any> =>
    instance.get("/employee/show-recap-status", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  recapByDivision: (token: string | null): AxiosPromise<any> =>
    instance.get("/employee/show-recap-division", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

const TrainingApi = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/training", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }),
  recapByStatus: (token: string | null): AxiosPromise<any> =>
    instance.get("/training/show-recap-status", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export { MagangApi, KaryawanApi, TrainingApi };
