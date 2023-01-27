import DefaultLayout from "../components/Layout.component";
import { useForm } from "react-hook-form";
import { apiRegister } from "../services/auth.service";
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
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomFormErrorMessage from "../components/CustomFormErrorMessage.component";

type FormValues = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (data: any) => {
    setRegisterError(null);
    if (data.password !== data.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    delete data.confirmPassword;
    setRegisterLoading(true);
    const user = await apiRegister(data).catch((err) => {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.showError
      ) {
        setRegisterError(err.response.data.message);
      } else {
        setRegisterError("Something went wrong. Please try again later.");
      }
    });
    if (user) {
      router
        .push("/login?registered=true")
        .then(() => setRegisterLoading(false));
    } else {
      setRegisterLoading(false);
    }
  };
  return (
    <DefaultLayout>
      <Seo title={"Login"} description={"Login page"} />
      <Flex
        height={{ md: "100%", lg: "85vh" }}
        mt={{ base: "50px", lg: "0" }}
        align={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        {registerError && (
          <Alert
            status="error"
            mb={"20px"}
            maxW={{ base: "lg" }}
            borderRadius={"lg"}
          >
            <AlertIcon />
            {registerError}
          </Alert>
        )}
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 8, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ base: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Join our team
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Sign up now! Create a new account by providing your email, desired
              password, and name.
            </Text>
          </Stack>
          <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <Input
                  placeholder="Name"
                  bg={"gray.100"}
                  border={0}
                  py={"25px"}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                    <CustomFormErrorMessage/>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <Input
                  placeholder="Email"
                  type={"email"}
                  bg={"gray.100"}
                  border={0}
                  py={"25px"}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                    <CustomFormErrorMessage/>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <InputGroup size="lg">
                  <Input
                    placeholder="Password"
                    bg={"gray.100"}
                    border={0}
                    type={showPassword ? "text" : "password"}
                    color={"gray.500"}
                    pr="4.5rem"
                    _placeholder={{
                      color: "gray.500",
                    }}
                    {...register("password", { required: true })}
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
              <FormControl isInvalid={!!errors.confirmPassword}>
                <InputGroup size="lg">
                  <Input
                    placeholder="Confirm Password"
                    bg={"gray.100"}
                    border={0}
                    type={showPassword ? "text" : "password"}
                    color={"gray.500"}
                    pr="4.5rem"
                    _placeholder={{
                      color: "gray.500",
                    }}
                    {...register("confirmPassword", { required: true })}
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
                {errors.confirmPassword && (
                    <CustomFormErrorMessage/>
                )}
              </FormControl>
            </Stack>
            <Button
              fontFamily={"heading"}
              type={"submit"}
              isLoading={registerLoading}
              loadingText={"Registering..."}
              mt={8}
              w={"full"}
              bgGradient={
                registerLoading
                  ? "linear(to-r, blue.400,blue.400)"
                  : "linear(to-r, blue.400,blue.800)"
              }
              color={"white"}
              _hover={{
                bgGradient: "linear(to-l, blue.400,blue.800)",
                boxShadow: "xl",
              }}
            >
              Register
            </Button>
          </Box>
          form
        </Stack>
      </Flex>
    </DefaultLayout>
  );
};

export { getServerSideProps } from "./_app";
export default Register;
