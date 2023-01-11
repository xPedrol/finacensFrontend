// pages/_app.js
// 1. import `NextUIProvider` component

import {NextUIProvider} from '@nextui-org/react';
import {themeConfig} from "../configs/theme.config";

const Noop = ({children}: any) => <>{children}</>;

function MyApp({Component, pageProps}: any) {
    // 2. Use at the root of your app
    const ContextProvider = Component.provider || Noop;
    return (
        <NextUIProvider theme={themeConfig}>
            <ContextProvider>
                <Component {...pageProps} />
            </ContextProvider>
        </NextUIProvider>
    );
}

export default MyApp;
