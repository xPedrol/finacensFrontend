import {createContext, useContext, useEffect, useState} from "react";
import {IAuthContext} from "../models/AuthContext.model";
import {IUser} from "../models/User.model";
import {parseCookies, setCookie, destroyCookie} from 'nookies';
import axiosClient from "../configs/httpRequest.config";

const authContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        const {'nextauth.token': token} = parseCookies();
        if (token) {
            axiosClient.get('/me').then(response => {
                if (response.data) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            });
        }
    }, []);

    return (
        <authContext.Provider value={{user, setUser}}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);