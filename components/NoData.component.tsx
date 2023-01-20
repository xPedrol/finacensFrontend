import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { BiError } from "react-icons/bi";

type NoDataProps = {
  message?: string;
};
const NoData = ({ message }: NoDataProps) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Icon
        as={BiError}
        boxSize={"37px"}
        color={"yellow.400"}
        mb={"5px"}
        name={"warning"}
      />
      <Text className={"useRobotoCondensed"} fontWeight={"bold"}>
        {message ?? "O que você está procurando não foi encontrado"}
      </Text>
    </Flex>
  );
};

export default NoData;
