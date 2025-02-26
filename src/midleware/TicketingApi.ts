import axios, { AxiosPromise } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_TICKETING_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_REACT_TICKETING_API_KEY,
  },
});

const ServiceApi = {
  showAll: (params?: Record<string, any>): AxiosPromise<any> =>
    instance.get("/public-api/services", {
      params,
    }),
  recap: (): AxiosPromise<any> =>
    instance.get("/public-api/services-recap", {}),
};

const DoctorApi = {
  showAll: (params?: Record<string, any>): AxiosPromise<any> =>
    instance.get("/public-api/doctors", {
      params,
    }),
  recap: (): AxiosPromise<any> => instance.get("/public-api/doctors-recap", {}),
};

const DaycareApi = {
  prices: (params?: Record<string, any>): AxiosPromise<any> =>
    instance.get("/public-api/daycare-prices", {
      params,
    }),
};

export { ServiceApi, DoctorApi, DaycareApi };
