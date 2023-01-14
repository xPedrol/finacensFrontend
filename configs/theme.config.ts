// 1. Import the extendTheme function
import {extendTheme, StyleFunctionProps} from '@chakra-ui/react';
import {mode} from "@chakra-ui/theme-tools";

const config = {
    initialColorMode: 'light',
    useSystemColorMode: true,
};
const fonts = {
    heading: `'Poppins', sans-serif`,
    body: `'Roboto', sans-serif`,
};
const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            fontFamily: 'body',
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('white', 'gray.900')(props),
            lineHeight: 'base',
        },
    }),
};
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    }
};

export const themeConfig = extendTheme({fonts, colors, config, styles});