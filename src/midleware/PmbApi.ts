import axios, { AxiosPromise } from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_PMB_URL,
});

const HasilPendaftaranApi = {
  showAll: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/candidate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
  showCard: (
    token: string | null,
    params?: Record<string, any>
  ): AxiosPromise<any> =>
    instance.get("/candidate/show-recap-level", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
};

export { HasilPendaftaranApi };
