// 1. Import the extendTheme function
import {
    defineStyleConfig,
    extendTheme,
    StyleFunctionProps,
} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
};
const fonts = {
    heading: `'Inter', sans`,
    body: `'Inter', sans`,
};
const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            fontFamily: "body",
            fontWeight: 500,
            color: mode("gray.800", "whiteAlpha.900")(props),
            bg: mode("#fff", "gray.900")(props),
            lineHeight: "base",
        },
        "*::placeholder": {
            fontWeight: "normal",
        },
    }),
};
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const Button = defineStyleConfig({
    baseStyle: {
        borderRadius: "0", // <-- border radius is same for all variants and sizes
    },
});
const Input = defineStyleConfig({
    sizes: {
        lg: {
            field: {
                fontSize: "15px",
                // borderRadius: "0",
            },
        },
        md: {
            field: {
                fontSize: "15px",
                // borderRadius: "0",
            },
        },
    },
});
const FormLabel = defineStyleConfig({
    baseStyle: {
        fontSize: "13px",
        marginBottom: "2px",
        color: "gray.600",
    },
});
const Textarea = defineStyleConfig({
    sizes: {
        lg: {
            fontSize: "15px",
            // borderRadius: "0",
        },
        md: {
            fontSize: "15px",
            // borderRadius: "0",
        },
    },
});
const Card: any = defineStyleConfig({
    baseStyle: {
        container: {
            // borderRadius: "0",
        },
    },
});
export const themeConfig = extendTheme({
    fonts,
    colors,
    config,
    styles,
    components: {
        FormLabel,
        Select: Input,
        Textarea,
        Input
    },
});
