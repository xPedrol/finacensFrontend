// 1. Import `createTheme`
import { createTheme, NextUIProvider } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom theme values
export const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
        colors: {
            primary: '#4ADE7B',
            secondary: '#F9CB80',
            error: '#FCC5D8',
        },
    }
})
