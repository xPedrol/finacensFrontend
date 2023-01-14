import DefaultLayout from "../components/Layout.component";
import styles from "../styles/Auth.module.scss";
import {poppins} from "../fonts/poppins.font";
import {useForm} from "react-hook-form";
import {apiRegister} from "../services/auth.service";
import Seo from "../components/Seo.component";
import {Box, Button, Flex, Heading, Input, Stack, Text} from "@chakra-ui/react";

type FormValues = {
    email: string;
    password: string;
    name: string;
}
const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>();
    const onSubmit = async (data: any) => {
        const user = await apiRegister(data);
        console.log('user', user);
    };
    return (
        <DefaultLayout>
            <Seo title={'Login'} description={'Login page'}/>
            <Box as={Flex} height={{md:'100%',lg: '85vh'}} mt={{base: '50px', lg: '0'}} align={'center'}
                 justifyContent={'center'}>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{base: 4, sm: 8, md: 8}}
                    spacing={{base: 8}}
                    maxW={{base: 'lg'}}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
                            Join our team
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                !
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>
                            Sign up now! Create a new account by providing your email, desired password, and name.
                        </Text>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Firstname"
                                bg={'gray.100'}
                                border={0}
                                py={'25px'}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                placeholder="firstname@lastname.io"
                                bg={'gray.100'}
                                border={0}
                                py={'25px'}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                placeholder="+1 (___) __-___-___"
                                bg={'gray.100'}
                                border={0}
                                py={'25px'}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                        </Stack>
                        <Button
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, blue.400,blue.800)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-l, blue.400,blue.800)',
                                boxShadow: 'xl',
                            }}>
                            Register
                        </Button>
                    </Box>
                    form
                </Stack>
            </Box>
        </DefaultLayout>
    );
};

export {getServerSideProps} from './_app'
export default Register;