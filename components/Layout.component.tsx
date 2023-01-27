import DefaultNavbar from "./Navbar.component";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Icon,
    Progress,
    Stack,
    StackDivider,
    Text,
    Tooltip,
    useDisclosure
} from "@chakra-ui/react";
import {IoIosArrowBack} from "react-icons/io";
import DefaultDrawer from "./Drawer.component";

const DefaultLayout = ({children}: any) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
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
                <Box position={'fixed'} bottom={'0'} right={'0'} mb={'30px'} me={'40px'}>
                    <Tooltip label="Open sidebar">
                        <Button onClick={onOpen} variant={'ghost'}>
                            <Icon boxSize={'30px'} as={IoIosArrowBack}/>
                        </Button>
                    </Tooltip>
                </Box>
            </Container>
            <Box mt={'30px'}></Box>
            {isOpen && <DefaultDrawer isOpen={isOpen} onOpen={openDrawer} onClose={closeDrawer}/>}
            {/*<DefaultFooter/>*/}
        </>
    );
};

export default DefaultLayout;
