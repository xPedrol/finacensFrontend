import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {parseCookies} from 'nookies';
import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    useToast
} from '@chakra-ui/react';
import {AuthProvider, useAuth} from "../contexts/auth.context";
import DefaultLayout from "../components/Layout.component";
import Seo from "../components/Seo.component";
import PageHeader from "../components/PageHeader.component";
import CustomFormErrorMessage from "../components/CustomFormErrorMessage.component";
import {apiUpdateUser} from "../services/auth.service";
import {IUser} from "../models/User.model";
import {useEffect, useState} from "react";
import Image from "next/image";
import styles from '../styles/Profile.module.scss';

const pageBreadcrumb = [
    {title: "Profile", link: "/profile"},
];
const pageButtons: any[] = [];
const subtitle = 'Mantenha suas informações atualizadas e garanta a segurança de sua conta financeira, atualizando seus dados de contato e verificando suas informações pessoais';
type FormData = {
    name: string;
    email: string;
    picture?: string;
};
const Profile = () => {
    const router = useRouter();
    const {handleSubmit, register, reset, formState: {errors}} = useForm<FormData>();
    const [user, setUser] = useState<IUser | null>(null);
    const cookies = parseCookies();
    const auth = useAuth();
    const toast = useToast();
    const onSubmit = (data: any) => {
        if (!auth.user || !auth.user.id) return;
        apiUpdateUser(auth.user.id, data).then((response) => {
            toast({
                title: `Dados atualizados com sucesso`,
                status: "success",
                isClosable: true,
            });
            if (!response.data) return;
            const newUser: IUser = {
                name: response.data.name,
                email: response.data.email,
                picture: response.data.picture,
                id: response.data.id
            };
            auth.setUser(newUser);

        }).catch((err) => {
            toast({
                title: `Erro ao atualizar dados`,
                status: "error",
                isClosable: true,
            });
        });
    };
    useEffect(() => {
        if (auth && auth.user) {
            setUser(auth.user);
            reset({
                name: auth.user.name,
                email: auth.user.email,
                picture: auth.user.picture,
            });
        }
    }, [auth]);

    return (
        <DefaultLayout>
            <Seo title={'Profile'} description={'Profile page'}/>
            <PageHeader
                title={"Profile"}
                subtitle={subtitle}
            />
            <Box as={"form"} onSubmit={handleSubmit(onSubmit)} mx={'auto'} maxW={'2xl'}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    {user && user.picture && (
                        <GridItem colSpan={12} as={Flex} align={'center'} flexDirection={'column'}>
                            <Image src={user.picture} alt={user.email} width={150} height={150} className={styles.profilePicture}/>
                            <Divider/>
                        </GridItem>
                    )}
                    <GridItem colSpan={12}>
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel>Name</FormLabel>
                            <InputGroup size={"lg"}>
                                <Input
                                    type="text"
                                    {...register("name", {required: true})}
                                />
                            </InputGroup>
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>Email</FormLabel>
                            <InputGroup size={"lg"}>
                                <Input type="email" {...register("email", {required: true})} />
                            </InputGroup>
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl isInvalid={!!errors.picture}>
                            <FormLabel>Picture Link</FormLabel>
                            <InputGroup size={"lg"}>
                                <Input type="text" {...register("picture")} />
                            </InputGroup>
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
