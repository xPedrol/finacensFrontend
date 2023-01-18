import {AuthProvider, useAuth} from "../contexts/auth.context";
import DefaultLayout from "../components/Layout.component";
import Seo from "../components/Seo.component";
import {Box, Container, Divider, Flex, Stack, Text} from "@chakra-ui/react";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import HomeCards from "../components/HomeCards.component";
import Statistics from "../components/Statistics.component";

export default function Home() {
    const auth = useAuth();
    return (
        <>
            <DefaultLayout>
                <Seo title={'Dashboard'} description={'Dashboard page'}/>
            </DefaultLayout>
            <Box className={styles.promo}>
                <Image
                    alt="Promo"
                    src="/home.jpg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </Box>
            <Container maxW="container.xl" mt={'-100px'}>
                <Flex justifyContent={'center'} flexDirection={'column'}>
                    <HomeCards/>
                    <Statistics/>
                </Flex>
            </Container>
        </>
    );
}

Home.provider = AuthProvider;