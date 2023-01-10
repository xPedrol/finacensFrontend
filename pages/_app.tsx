// pages/_app.js
// 1. import `NextUIProvider` component
import {NextUIProvider} from '@nextui-org/react';
import {theme} from "../config/theme";

function MyApp({Component, pageProps}: any) {
    // 2. Use at the root of your app
    return (
        <NextUIProvider theme={theme}>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

export default MyApp;
