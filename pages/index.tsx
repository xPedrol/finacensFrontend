import {AuthProvider, useAuth} from "../contexts/auth.context";
import DefaultLayout from "../components/Layout.component";
import Seo from "../components/Seo.component";

export default function Home() {
    const auth = useAuth();
    return (
        <DefaultLayout>
            <Seo title={'Dashboard'} description={'Dashboard page'}/>
        </DefaultLayout>
    );
}

Home.provider = AuthProvider;