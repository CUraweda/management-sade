import { create } from "zustand";

interface StoreState {
  token: string;
  user: any;
}

interface StoreAction {
  setToken: (token: string) => void;
  setUser: (user: any) => void;
}

const StoreInit: StoreState = {
  token: localStorage.getItem("token") ?? "",
  user: (() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  })(),
};

const Store = create<StoreState & StoreAction>((set) => ({
  ...StoreInit,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));

export default Store;
