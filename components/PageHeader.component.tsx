import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumb: { title: string; link: string }[];
  buttons?: { title: string; link: string; icon: any; colorSchema: string }[];
};
const PageHeader = ({
  title,
  buttons,
  breadcrumb,
  subtitle,
}: PageHeaderProps) => {
  return (
    <Card mt={"10px"} mb={"10px"} bg={"gray.800"} size={"lg"}>
      <CardBody>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem colSpan={{ base: 12, lg: 9 }}>
            <Stack flex={1} justify={{ lg: "center" }}>
              <Box>
                <Text
                  fontFamily={"heading"}
                  fontWeight={700}
                  textTransform={"uppercase"}
                  fontSize={"xl"}
                  color={"gray.400"}
                >
                  {title}
                </Text>
                {breadcrumb && (
                  <Breadcrumb
                    color={"gray.500"}
                    fontFamily={"Roboto Condensed"}
                    fontWeight={700}
                  >
                    {breadcrumb.map((item, index) => (
                      <BreadcrumbItem key={item.link}>
                        <BreadcrumbLink as={Link} href={item.link}>
                          {item.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    ))}
                  </Breadcrumb>
                )}

                {subtitle && (
                  <Text fontSize={"md"} color={"gray.400"} fontWeight={500}>
                    {subtitle}
                  </Text>
                )}
              </Box>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={{ base: 12, lg: 3 }}
            as={Flex}
            justifyContent={{ base: "center", lg: "flex-end" }}
            alignItems={"center"}
          >
            {buttons &&
              buttons.map((button) => (
                <Button
                  key={button.link}
                  as={Link}
                  href={button.link}
                  size={"sm"}
                  colorScheme={button.colorSchema}
                  variant="outline"
                >
                  {button.icon && (
                    <Icon boxSize={"18px"} me={"5px"} as={button.icon}></Icon>
                  )}
                  {button.title}
                </Button>
              ))}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default PageHeader;
