import { Flex, Spinner } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
    >
      <Spinner size={"lg"} colorScheme={"blue"} />
    </Flex>
  );
};

export default LoadingPage;
