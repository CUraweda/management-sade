import create, { SetState } from "zustand";
import { LoginProps, StoreProps } from "./Utils";

const LoginStore = create<LoginProps>((set: SetState<LoginProps>) => ({
  token: localStorage.getItem("token"),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  removeToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  role: sessionStorage.getItem("role"),
  setRole: (role) => {
    if (role) {
      sessionStorage.setItem("role", role);
    } else {
      sessionStorage.removeItem("role");
    }
    set({ role });
  },
}));


const useProps = create<StoreProps>((set) => ({
  idKelas: '',
  setIdKelas: (idKelas: string) => set({ idKelas }),

  tahun: '',
  setTahun: (tahun : string) => set({tahun})

}));

export { LoginStore , useProps};
