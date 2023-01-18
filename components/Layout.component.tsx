import DefaultNavbar from "./Navbar.component";
import {Container} from "@chakra-ui/react";

const DefaultLayout = ({children}: any) => {
    return (
        <>
            <DefaultNavbar/>
            <Container maxW="container.xl">
                <main>
                    {children}
                </main>
            </Container>
            {/*<DefaultFooter/>*/}
        </>
    );
};

export default DefaultLayout;