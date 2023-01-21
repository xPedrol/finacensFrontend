import DefaultNavbar from "./Navbar.component";
import {Box, Container} from "@chakra-ui/react";

const DefaultLayout = ({ children }: any) => {
  return (
    <>
      <DefaultNavbar />
      <Container maxW="container.xl">
        <main>{children}</main>
      </Container>
        <Box mt={'30px'}></Box>
      {/*<DefaultFooter/>*/}
    </>
  );
};

export default DefaultLayout;
