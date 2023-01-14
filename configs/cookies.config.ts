import {CookieSerializeOptions} from "next/dist/server/web/spec-extension/cookies/types";

export const defaultOptions: CookieSerializeOptions =
    {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
        sameSite: true
    };