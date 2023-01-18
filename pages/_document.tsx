import {Head, Html, Main, NextScript} from 'next/document';
import React from "react";

export default function Document() {
    return (
        <Html lang="pt">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''}/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700;900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800;900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap"
                      rel="stylesheet"/>
            </Head>
            <body>
            {/* 👇 Here's the script */}
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}