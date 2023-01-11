import DefaultLayout from "../components/Layout.component";
import Box from "../components/Box.component";
import {AuthProvider, useAuth} from "../contexts/auth.context";


export default function Home() {
    const auth = useAuth();
    console.log(auth);
    return (
        <DefaultLayout>
            <Box my={'20px'}>
                dasdadas
            </Box>
        </DefaultLayout>
    );
}

Home.provider = AuthProvider;