import DefaultNavbar from "./Navbar.component";
import {Box, Button, Container, Icon, Tooltip, useDisclosure} from "@chakra-ui/react";
import {IoIosArrowBack} from "react-icons/io";
import DefaultDrawer from "./Drawer.component";
import {useAuth} from "../contexts/auth.context";

const DefaultLayout = ({children}: any) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const auth = useAuth();
    const openDrawer = () => {
        onOpen();
    };
    const closeDrawer = () => {
        onClose();
    };
    return (
        <>
            <DefaultNavbar/>
            <Container maxW="container.xl">
                <main>{children}</main>
                {auth.user && <Box position={'fixed'} bottom={'50%'} right={'0'} mb={'30px'} zIndex={998}>
                    <Tooltip label="Open sidebar">
                        <Button onClick={onOpen} bg={'gray.300'} borderRadius={'xl'} color={'gray.800'} variant={'solid'} borderBottomRightRadius={0} borderTopRightRadius={0}>
                            <Icon boxSize={'15px'} as={IoIosArrowBack}/>
                        </Button>
                    </Tooltip>
                </Box>}
            </Container>
            <Box mt={'30px'}></Box>
            {isOpen && <DefaultDrawer isOpen={isOpen} onOpen={openDrawer} onClose={closeDrawer}/>}
            {/*<DefaultFooter/>*/}
        </>
    );
};

export default DefaultLayout;
