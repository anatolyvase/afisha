import { create } from "zustand";

type State = {
  location: string;
};

type Action = {
  setLocation: (newLocation: string) => void;
  initializeLocation: () => void;
};

export const useCurrentLocationStore = create<State & Action>(set => ({
  location: "",

  setLocation: newLocation => {
    localStorage.setItem("location", newLocation);
    console.log("set location", newLocation);
    set({ location: newLocation });
  },

  initializeLocation: () => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      set({ location: storedLocation });
    } else {
      const defaultLocation = "msk";
      localStorage.setItem("location", defaultLocation);
      set({ location: defaultLocation });
    }
  },
}));
