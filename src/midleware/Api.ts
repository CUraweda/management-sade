import axios, { AxiosPromise } from "axios";
const instance = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });
import {
  LoginResponse,
  JenisSampah,
  GetSiswaByNis,
  GetInclassStudent,
  GetClass,
  CreateRekapSampah,
  GetAllClass,
  CreateJenisSampah,
  penjualanSampah,
  WasteTypeDropdownResponse,
  WasteCollectionResponse,
  WasteTypeDropdownResponse,
  ClassDropdownResponse,
} from "./Utils";

const Auth = {
  Login: (
    email: string | null,
    password: string | null
  ): AxiosPromise<LoginResponse> =>
    instance({
      method: "POST",
      url: "/api/auth/login",
      data: {
        email,
        password,
      },
    }),
};

const BankSampah = {
  GetPenjualanSampah: (
    token: string | null,
    page: number,
    limit: number,
    sortField: any,
    jenis: string,
    sortOrder: any,
    startDate: string,
    endDate: string
  ): AxiosPromise<penjualanSampah> =>
    instance({
      method: "GET",
      url: `/api/waste-sales/?wastetype_id=${jenis}&start_date=${startDate}&end_date=${endDate}&page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  GetDataDropdownWasteType: (
    token: string | null
  ): AxiosPromise<WasteTypeDropdownResponse> =>
    instance({
      method: "GET",
      url: `/api/waste-type`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  GetRekapBankSampah: (
    token: string | null,
    wasteId: string,
    classId: string,
    fromDate: string,
    toDate: string
  ): AxiosPromise<WasteCollectionResponse> =>
    instance({
      method: "GET",
      url: `/api/waste-collection/get-by-filter?waste_type_id=${wasteId}&class_id=${classId}&start_date=${fromDate}&end_date=${toDate}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetDataDropdownWasteType: (
    token: string | null
  ): AxiosPromise<WasteTypeDropdownResponse> =>
    instance({
      method: "GET",
      url: `/api/waste-type?limit=100`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetDataDropdownClass: (
    token: string | null
  ): AxiosPromise<ClassDropdownResponse> =>
    instance({
      method: "GET",
      url: `/api/classes?limit=100`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetJenisSampah: (
    token: string | null,
    page: string,
    limit: string
  ): AxiosPromise<JenisSampah> =>
    instance({
      method: "GET",
      url: `/api/waste-type?search_query=&page=${page}&limit=${limit}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  createRekapSampah: (
    token: string | null,
    data: CreateRekapSampah
  ): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: `/api/waste-collection/create`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }),

  createJenisSampah: (
    token: string | null,
    data: CreateJenisSampah
  ): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: `/api/waste-type/create`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }),
  updateJenisSampah: (
    token: string | null,
    id: string | null,
    data: CreateJenisSampah
  ): AxiosPromise<any> =>
    instance({
      method: "PUT",
      url: `/api/waste-type/update/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }),
  getByIdJenisSampah: (
    token: string | null,
    id: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/api/waste-type/show/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteJenisSampah: (
    token: string | null,
    id: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "DELETE",
      url: `/api/waste-type/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const ApiSiswa = {
  GetSiswaByNis: (
    token: string | null,
    nis: string | number | null
  ): AxiosPromise<GetSiswaByNis> =>
    instance({
      method: "GET",
      url: `/api/student/show-nis/${nis}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetInClassSiswaByid: (
    token: string | null,
    id: string | number | null
  ): AxiosPromise<GetInclassStudent> =>
    instance({
      method: "GET",
      url: `/api/student-class/show/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetClassSiswaByid: (
    token: string | null,
    id: string | number | null
  ): AxiosPromise<GetClass> =>
    instance({
      method: "GET",
      url: `api/classes/show/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetSiswaByClass: (
    token: string | null,
    kelas: string | null,
    akademik: string
  ): AxiosPromise<GetInclassStudent> =>
    instance({
      method: "GET",
      url: `/api/student-class/show-by-class/${kelas}?academic=${akademik}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const Kelas = {
  GetAllKelas: (token: string | null): AxiosPromise<GetAllClass> =>
    instance({
      method: "GET",
      url: `api/classes?search_query=&page=0&limit=20`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export { Auth, BankSampah, ApiSiswa, Kelas };
