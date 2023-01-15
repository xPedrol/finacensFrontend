import DefaultLayout from "../components/Layout.component";
import {useForm} from "react-hook-form";
import {apiRegister} from "../services/auth.service";
import Seo from "../components/Seo.component";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Stack,
    Text
} from "@chakra-ui/react";
import {useState} from "react";
import {useRouter} from "next/router";

const defaultErrorMessage = 'Invalid register credentials. Please check your email, name and password and try again.';
type FormValues = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}
const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [registerLoading, setRegisterLoading] = useState<boolean>(false);
    const router = useRouter();
    const onSubmit = async (data: any) => {
        setRegisterError(null);
        if (data.password !== data.confirmPassword) {
            setRegisterError('Passwords do not match');
            return;
        }
        delete data.confirmPassword;
        setRegisterLoading(true);
        const user = await apiRegister(data).catch((err) => {
            if (err && err.response && err.response.data && err.response.data.showError) {
                setRegisterError(err.response.data.message);
            } else {
                setRegisterError('Something went wrong. Please try again later.');
            }
        });
        console.log(user)
        if (user) {
            router.push('/login?registered=true').then(() => setRegisterLoading(false));
        } else {
            setRegisterLoading(false);
        }

    };
    return (
        <DefaultLayout>
            <Seo title={'Login'} description={'Login page'}/>
            <Flex height={{md: '100%', lg: '85vh'}} mt={{base: '50px', lg: '0'}} align={'center'}
                  justifyContent={'center'} flexDirection={'column'}>
                {registerError &&
                    <Alert status="error" mb={'20px'} maxW={{base: 'lg'}} borderRadius={'lg'}>
                        <AlertIcon/>
                        {registerError}
                    </Alert>
                }
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
                    <Box as={'form'} mt={10} onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl isInvalid={!!errors.name}>
                                <Input
                                    placeholder="Name"
                                    bg={'gray.100'}
                                    border={0}
                                    py={'25px'}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    {...register("name", {required: true})}
                                />
                                {errors.name && <FormErrorMessage>This field is required</FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={!!errors.email}>
                                <Input
                                    placeholder="Email"
                                    type={'email'}
                                    bg={'gray.100'}
                                    border={0}
                                    py={'25px'}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    {...register("email", {required: true})}
                                />
                                {errors.email && <FormErrorMessage>This field is required</FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <Input
                                    placeholder="Password"
                                    bg={'gray.100'}
                                    border={0}
                                    py={'25px'}
                                    type={'password'}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    {...register("password", {required: true})}
                                />
                                {errors.password && <FormErrorMessage>This field is required</FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={!!errors.confirmPassword}>
                                <Input
                                    placeholder="Confirm your password"
                                    bg={'gray.100'}
                                    type={'password'}
                                    border={0}
                                    py={'25px'}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    {...register("confirmPassword", {required: true})}
                                />
                                {errors.confirmPassword && <FormErrorMessage>This field is required</FormErrorMessage>}
                            </FormControl>
                        </Stack>
                        <Button
                            fontFamily={'heading'}
                            type={'submit'}
                            isLoading={registerLoading}
                            loadingText={'Registering...'}
                            mt={8}
                            w={'full'}
                            bgGradient={registerLoading ? 'linear(to-r, blue.400,blue.400)' : 'linear(to-r, blue.400,blue.800)'}
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
            </Flex>
        </DefaultLayout>
    );
};

export {getServerSideProps} from './_app';
export default Register;