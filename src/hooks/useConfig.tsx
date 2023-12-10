import { useContext } from "react";
import { ConfigContext } from "context";

export const useConfig = () => useContext(ConfigContext)