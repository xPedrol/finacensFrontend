import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {parseCookies} from 'nookies';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup
} from '@chakra-ui/react';
import {AuthProvider, useAuth} from "../contexts/auth.context";
import DefaultLayout from "../components/Layout.component";
import Seo from "../components/Seo.component";
import PageHeader from "../components/PageHeader.component";

const pageBreadcrumb = [
    {title: "Profile", link: "/profile"},
];
const pageButtons: any[] = [];
const subtitle = 'Mantenha suas informações atualizadas e garanta a segurança de sua conta financeira, atualizando seus dados de contato e verificando suas informações pessoais';
const Profile = () => {
    const router = useRouter();
    const {handleSubmit, register, formState: {errors}} = useForm();
    const cookies = parseCookies();
    const auth = useAuth();

    const onSubmit = (data: any) => {
        // fazer algo com os dados do formulário aqui
        console.log(data);
    };

    return (
        <DefaultLayout>
            <Seo title={'Profile'} description={'Profile page'}/>
            <PageHeader
                title={"Profile"}
                subtitle={subtitle}
                breadcrumb={pageBreadcrumb}
                buttons={pageButtons}
            />
            
            <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    <GridItem colSpan={{base: 12, md: 6}}>
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel>Name</FormLabel>
                            <InputGroup size={"lg"}>
                                <Input
                                    type="text"
                                    {...register("name", {required: true})}
                                />
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 6}}>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>Email</FormLabel>
                            <InputGroup size={"lg"}>
                                <Input type="email" {...register("email", {required: true})} />
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12} as={Flex} justifyContent={"flex-end"} alignItems={'flex-start'}>
                        <Button colorScheme="blue" size="md" type={"submit"}>
                            Salvar
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
        </DefaultLayout>
    );
};
Profile.provider = AuthProvider;
export default Profile;
