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
import {ReactNode} from "react";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    children?: ReactNode;
};
const PageHeader = ({
                        title,
                        subtitle,
                        children
                    }: PageHeaderProps) => {
    return (
        <Flex justify={'space-between'} align={'center'} mt={'30px'} mb={'50px'}>
            <Stack justify={{sm: "center"}} overflowY={'hidden'}>
                <Box>
                    <Text overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}
                          fontFamily={"heading"}
                          fontWeight={600}
                          fontSize={"18px"}
                    >
                        {title}
                    </Text>
                    <Text whiteSpace={'nowrap'} overflow={'hidden'}
                          fontWeight={400}
                          fontSize={"14px"}
                    >
                        {subtitle && subtitle}

                    </Text>
                </Box>
            </Stack>
            <Stack flex={1} direction={'row'} justify={'flex-end'}>
                {children}
            </Stack>
        </Flex>

    );
};

export default PageHeader;
