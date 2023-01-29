import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Icon,
    IconProps,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import DefaultLayout from "../components/Layout.component";
import Seo from "../components/Seo.component";
import {useForm} from "react-hook-form";
import {apiLogin} from "../services/auth.service";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {setCookie} from "nookies";
import {defaultOptions} from "../configs/cookies.config";
import CustomAlert from "../components/ClosableAlert.component";
import CustomFormErrorMessage from "../components/CustomFormErrorMessage.component";

type LoginProps = {
    email: string;
    password: string;
};
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginProps>();
    const router = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [registered, setRegistered] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const onSubmit = async (data: LoginProps) => {
        setLoginError(null);
        setLoginLoading(true);
        const res = await apiLogin(data).catch((err) => {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.showError
            ) {
                setLoginError(err.response.data.message);
            } else {
                setLoginError("Something went wrong. Please try again later.");
            }
        });
        const token = res?.data.token;
        if (token) {
            setCookie(
                null,
                process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
                token,
                defaultOptions
            );
            router.push("/").then(() => setLoginLoading(false));
        } else {
            setLoginLoading(false);
        }
    };
    useEffect(() => {
        if (router.query.registered) {
            setRegistered(true);
        }
    }, []);
    return (
        <DefaultLayout>
            <Seo title={"Login"} description={"Login page"}/>
            <Flex
                height={{md: "100%", lg: "85vh"}}
                mt={{base: "50px", lg: "0"}}
                align={"center"}
                flexDirection={"column"}
                justifyContent={"center"}
            >
                {loginError && (
                    <Box mb={"20px"} maxW={{base: "lg"}} w={"100%"}>
                        <CustomAlert
                            status={"error"}
                            isClosable={true}
                            description={loginError}
                        />
                    </Box>
                )}
                {registered && (
                    <Box mb={"20px"} maxW={{base: "lg"}} w={"100%"}>
                        <CustomAlert
                            status={"success"}
                            isClosable={true}
                            description={
                                " Congratulations, your registration was successful! Please login to access your account."
                            }
                        />
                    </Box>
                )}
                <Stack
                    rounded={"xl"}
                    p={{base: 3, sm: 7, md: 7}}
                    spacing={{base: 8}}
                    maxW={{base: "md"}}
                >
                    <Stack spacing={4}>
                        <Text fontSize={'32px'} fontWeight={800} letterSpacing={'-.049375rem'}>Log in to
                            <Text as={'span'} bg={'gray.300'} ms={'5px'} p={'5px'} borderRadius={'xl'}>Finances</Text>
                            <Text as={'span'} bg={'gray.300'} ms={'5px'} py={'5px'} px={'20px'} borderRadius={'xl'}>!</Text>
                        </Text>
                        <Text color={"gray.500"} fontSize={{base: "sm", sm: "md"}}>
                            Welcome! Please enter your email and password to access your
                            account.
                        </Text>
                    </Stack>
                    <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl isInvalid={!!errors.email}>
                                <Input
                                    size={"md"}
                                    placeholder="Email"
                                    type={"email"}
                                    color={"gray.500"}
                                    _placeholder={{
                                        color: "gray.500",
                                    }}
                                    {...register("email", {required: true})}
                                />
                                {errors.email && (
                                    <CustomFormErrorMessage/>
                                )}
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <InputGroup size="md">
                                    <Input
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        color={"gray.500"}
                                        pr="4.5rem"
                                        _placeholder={{
                                            color: "gray.500",
                                        }}
                                        {...register("password", {required: true})}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && (
                                    <CustomFormErrorMessage/>
                                )}
                            </FormControl>
                        </Stack>
                        <Button
                            fontFamily={"heading"}
                            type={"submit"}
                            mt={8}
                            w={"full"}
                            bgGradient={
                                loginLoading
                                    ? "linear(to-r, gray.400,gray.400)"
                                    : "linear(to-r, gray.100,gray.500)"
                            }
                            color={"white"}
                            _hover={{
                                boxShadow: "xl",
                            }}
                            isLoading={loginLoading}
                            loadingText="Logging..."
                        >
                            Log in
                        </Button>
                    </Box>
                    form
                </Stack>
            </Flex>
        </DefaultLayout>
    );
}

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({base: "100%", md: "40vw", lg: "30vw"})}
            zIndex={useBreakpointValue({base: -1, md: -1, lg: 0})}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="71" cy="61" r="111" fill="#F56565"/>
            <circle cx="244" cy="106" r="139" fill="#ED64A6"/>
            <circle cy="291" r="139" fill="#ED64A6"/>
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936"/>
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B"/>
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78"/>
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1"/>
        </Icon>
    );
};

export {getServerSideProps} from "./_app";
