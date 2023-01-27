import {useEffect} from "react";
import {useRouter} from "next/router";
import LoadingPage from "../components/LoadingPage.component";
import {AuthProvider, useAuth} from "../contexts/auth.context";

const Logout = () => {
    const router = useRouter();
    const auth = useAuth();
    useEffect(() => {
        if(auth && Object.keys(auth).length > 0){
            auth.logout();
        }
        router.push("/login");
    }, []);
    return <LoadingPage/>;
};
Logout.provider = AuthProvider;
export default Logout;