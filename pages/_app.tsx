// pages/_app.js

import {queryClient} from "../configs/reactQuery.config";
import {QueryClientProvider} from "react-query";
import '../styles/globals.scss';
import Chakra from "../components/Chakra.component";
import {GetServerSideProps} from "next";


const Noop = ({children}: any) => <>{children}</>;

function MyApp({Component, pageProps}: any) {
    // 2. Use at the root of your app
    const ContextProvider = Component.provider || Noop;

    return (
        <>
            <Chakra cookies={pageProps.cookies}>
                <QueryClientProvider client={queryClient}>
                    <ContextProvider>
                        <Component {...pageProps} />
                    </ContextProvider>
                </QueryClientProvider>
            </Chakra>
        </>
    );
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cookies = context.req.cookies;
    if (cookies[process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string]) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {}
    };
};
export default MyApp;
