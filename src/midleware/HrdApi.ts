import axios, { AxiosPromise } from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_HRD_URL,
});

const Employee = {
  showAll: (token: string | null): AxiosPromise<any> =>
    instance.get("employee?limit=100000", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const LowonganJob = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/job-vacancy/show-division-recap", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }),
};

const PresensiEmployee = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/employee-attendance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
  showCard: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/employee-attendance/recap-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
};

const PenilaianEmployee = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
  showCard: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/employee/show-recap-grade", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
};

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

const GajiApi = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/employee-account", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }),
  recapByStatus: (token: string | null): AxiosPromise<any> =>
    instance.get("/employee-account/recap-data", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export {
  PresensiEmployee,
  LowonganJob,
  MagangApi,
  KaryawanApi,
  TrainingApi,
  GajiApi,
  Employee,
  PenilaianEmployee,
};
