import { ReactElement } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FcBookmark, FcBullish } from "react-icons/fc";
import Link from "next/link";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
  link?: string;
}

const Feature = ({ title, text, icon, link }: FeatureProps) => {
  return (
    <Stack
      bg={"white"}
      p={"15px"}
      borderRadius={"md"}
      zIndex={999}
      borderColor={"gray.200"}
      borderStyle={"solid"}
      borderWidth={"1px"}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Divider />
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
      {link && (
        <Box>
          <Button as={Link} href={link} colorScheme={"gray"} variant={'ghost'} size={'sm'}>
            Abrir
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default function HomeCards() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Feature
          icon={<Icon as={FcBullish} w={10} h={10} />}
          title={"Gerenciars Despesas"}
          text={"Cadastre ganhos e despesas, e acompanhe o saldo de sua conta."}
          link={"/expenses"}
        />
        <Feature
          icon={<Icon as={FcBookmark} w={10} h={10} />}
          title={"Fazer Anotação"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
          link={"/notes"}
        />
        {/*<Feature*/}
        {/*    icon={<Icon as={FcInTransit} w={10} h={10} />}*/}
        {/*    title={''}*/}
        {/*    text={*/}
        {/*        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'*/}
        {/*    }*/}
        {/*/>*/}
      </SimpleGrid>
    </Box>
  );
}
