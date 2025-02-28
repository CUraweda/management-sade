import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_PMB_URL,
});

// **Request Interceptor**
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("pmb_at");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// **Response Interceptor**
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await instance.post("/auth/login", {
          email: import.meta.env.VITE_REACT_PMB_EMAIL,
          password: import.meta.env.VITE_REACT_PMB_PASSWORD,
        });
        const { access } = res.data.tokens;

        localStorage.setItem("pmb_at", access?.token ?? "");

        instance.defaults.headers.common["Authorization"] = `Bearer ${
          access?.token ?? ""
        }`;
        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

const CandidateApi = {
  showAll: (params?: Record<string, any>): AxiosPromise<any> =>
    instance.get("/candidate", {
      params,
    }),
};

const PaymentApi = {
  showAll: (params?: Record<string, any>): AxiosPromise<any> =>
    instance.get("/payment", {
      params,
    }),
  getBuff: (path: string): AxiosPromise<any> =>
    instance.post("/payment/file-buff", { path }),
};

const AttachmentApi = {
  showAllByCandidate: (candidateId: string): AxiosPromise<any> =>
    instance.get("/attachment/show-all/" + candidateId, {}),
};

export { CandidateApi, PaymentApi, AttachmentApi };
