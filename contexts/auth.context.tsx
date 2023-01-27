import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext } from "../models/AuthContext.model";
import { IUser } from "../models/User.model";
import { destroyCookie, parseCookies } from "nookies";
import axiosClient from "../configs/httpRequest.config";
import { defaultOptions } from "../configs/cookies.config";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LoadingPage from "../components/LoadingPage.component";

const authContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const logout = () => {
    setIsLoading(false);
    destroyCookie(
      null,
      process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
      defaultOptions
    );
    router.push("/login").then(() => setUser(null));
  };
  const toast = useToast();
  useEffect(() => {
    const tokenKey = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string;
    const cookies = parseCookies(null, defaultOptions);
    if (cookies[tokenKey]) {
      setIsLoading(true);
      axiosClient
        .get("/me")
        .then((response) => {
          if (response.data) {
            setUser(response.data);
          } else {
            setUser(null);
          }
        })
        .catch((err) => {
          setUser(null);
          toast({
            title: `Erro ao carregar usuário`,
            status: "error",
            isClosable: true,
          });
          if (err && err.response && err.response.status === 403) {
            logout();
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, isLoading, logout }}>
      {isLoading ? <LoadingPage /> : children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
