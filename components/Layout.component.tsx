import {styled} from "@nextui-org/react";
import DefaultNavbar from "./Navbar.component";

const Box = styled("div", {
    maxWidth: "1350px",
    width: "100%",
    marginInline: "auto",
});
const DefaultLayout = ({children}: any) => {
    return (
        <>
            <DefaultNavbar/>
            <Box>
                <main>
                    {children}
                </main>
            </Box>
        </>
    );
};

export default DefaultLayout;