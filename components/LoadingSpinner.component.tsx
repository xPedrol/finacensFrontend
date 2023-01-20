import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner />
    </Flex>
  );
};

export default Loading;
