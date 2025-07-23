import { createContext, Dispatch, SetStateAction } from "react";

export const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>]>([null!, ()=>null]);