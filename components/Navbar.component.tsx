import {
    Avatar,
    Box,
    Button,
    Collapse,
    Container,
    Flex,
    Hide,
    Icon,
    IconButton,
    Link as ChakraLink,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import {HiOutlineMenu} from "react-icons/hi";
import Link from "next/link";
import {useAuth} from "../contexts/auth.context";
import {FaChevronDown} from "react-icons/fa";
import {MdClear} from "react-icons/md";

export default function DefaultNavbar() {
    const {isOpen, onToggle} = useDisclosure();
    const auth = useAuth();
    return (
        <Box>
            <Flex
                bg={useColorModeValue("gray.900", "gray.900")}
                color={useColorModeValue("gray.600", "white")}
                minH={"80px"}
                py={{base: 2}}
                px={{base: 4}}
                // borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.100", "gray.900")}
                align={"center"}
            >
                <Container as={Flex} maxW={"container.xl"} align={"center"} h={"100%"}>
                    <Flex
                        flex={{base: 1, md: "auto"}}
                        ml={{base: -2}}
                        display={{base: "flex", md: "none"}}
                    >
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? (
                                    <Icon w={10} h={10} color={'gray.400'} as={MdClear}></Icon>
                                ) : (
                                    <Icon w={9} h={9} color={'gray.400'} as={HiOutlineMenu}></Icon>
                                )
                            }
                            variant={"ghost"}
                            aria-label={"Toggle Navigation"}
                        />
                    </Flex>
                    <Flex flex={{base: 1}} justify={{base: "center", md: "start"}}>
                        <Text as={Link} href={"/"}
                              textAlign={useBreakpointValue({base: "center", md: "left"})}
                              fontFamily={"heading"}
                              fontWeight={"900"}
                              fontSize={"25px"}
                              letterSpacing={"2px"}
                              textTransform={"uppercase"}
                              color={useColorModeValue("white", "white")}
                        >
                            Finances
                        </Text>

                        <Flex
                            display={{base: "none", md: "flex"}}
                            ml={10}
                            align={"center"}
                        >
                            <DesktopNav/>
                        </Flex>
                    </Flex>
                    {auth?.isLoading ? (
                        <Text>Loading...</Text>
                    ) : !auth?.user ? (
                        <Stack
                            flex={{base: 1, md: 0}}
                            justify={"flex-end"}
                            direction={"row"}
                            spacing={6}
                        >
                            <Button
                                as={Link}
                                display={{base: "none", md: "inline-flex"}}
                                fontSize={"sm"}
                                fontWeight={400}
                                variant={"link"}
                                href={"/login"}
                            >
                                Sign In
                            </Button>
                            <Button
                                as={Link}
                                display={{base: "none", md: "inline-flex"}}
                                fontSize={"sm"}
                                fontWeight={600}
                                color={"white"}
                                colorScheme={"blue"}
                                href={"/register"}
                                _hover={{
                                    bg: "blue.700",
                                }}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    ) : (
                        <Stack
                            flex={{base: 1, md: 0}}
                            justify={"flex-end"}
                            direction={"row"}
                            spacing={6}
                        >
                            <Hide below="sm">
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar cursor={'pointer'} _hover={{
                                            border: "2px solid",
                                            borderColor: "gray.500"
                                        }
                                        } size="md" name={auth.user.name} src={auth.user.picture ?? undefined}/>
                                    </MenuButton>
                                    <MenuList>
                                        <Link href={"/profile"}>
                                            <MenuItem>
                                                Profile
                                            </MenuItem>
                                        </Link>
                                        <MenuDivider/>
                                        <MenuItem onClick={auth.logout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Hide>
                        </Stack>
                    )}
                </Container>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav/>
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.500", "gray.200");
    const linkHoverColor = useColorModeValue("gray.100", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <ChakraLink as={Link}
                                        p={2}
                                        href={navItem.href ?? "#"}
                                        fontSize={"sm"}
                                        fontWeight={600}
                                        letterSpacing={0.5}
                                        textTransform={'uppercase'}
                                        fontFamily={"Poppins"}
                                        color={linkColor}
                                        borderRadius={'md'}
                                        _hover={{
                                            textDecoration: "none",
                                            color: linkHoverColor,
                                            bg: "gray.600",
                                        }}
                            >
                                {navItem.label}
                            </ChakraLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({label, href, subLabel}: NavItem) => {
    return (
        <ChakraLink as={Link}
                    href={href}
                    role={"group"}
                    display={"block"}
                    p={2}
                    rounded={"md"}
                    _hover={{bg: useColorModeValue("blue.50", "gray.900")}}
        >
            <Stack direction={"row"} align={"center"}>
                <Box>
                    <Text
                        transition={"all .3s ease"}
                        _groupHover={{color: "blue.400"}}
                        fontWeight={800}
                        fontFamily={'Roboto Condensed'}
                    >
                        {label}
                    </Text>
                    <Text fontSize={"sm"}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={"all .3s ease"}
                    transform={"translateX(-10px)"}
                    opacity={0}
                    _groupHover={{opacity: "100%", transform: "translateX(0)"}}
                    justify={"flex-end"}
                    align={"center"}
                    flex={1}
                >
                    {/*<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />*/}
                </Flex>
            </Stack>
        </ChakraLink>
    );
};

const MobileNav = () => {
    const auth = useAuth();
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{md: "none"}}
        >
            {NAV_ITEMS.map((navItem: NavItem) =>
                navItem.auth && auth.user && <MobileNavItem key={navItem.label} {...navItem} />
            )}
            {auth.user ? (
                <>
                    <MobileNavItem label={"Profile"} href={"/profile"}/>
                    <MobileNavItem label={"Logout"} href={"/logout"}/>
                </>
            ) : (
                <>
                    <MobileNavItem label={"Sign Up"} href={"/register"}/>
                    <MobileNavItem label={"Login"} href={"/login"}/>
                </>
            )}
        </Stack>
    );
};

const MobileNavItem = ({label, children, href}: NavItem) => {
    const {isOpen, onToggle} = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={FaChevronDown}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={4}
                        h={4}
                    />
                )}

            </Flex>

            <Collapse in={isOpen} animateOpacity style={{marginTop: "0!important"}}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map((child) => (
                            <ChakraLink as={Link} key={child.label} py={2} href={child.href}
                                        fontFamily={'Roboto Condensed'} fontWeight={500}>
                                {child.label}
                            </ChakraLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    auth?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Expenses",
        auth: true,
        href: "/expenses"
    },
    {
        label: "Notes",
        auth: true,
        href: "/notes",
        // children: [
        //     {
        //         label: "Notes List",
        //         subLabel: "View all your notes",
        //         href: "/notes",
        //     },
        //     {
        //         label: "New Note",
        //         subLabel: "Create a new note",
        //         href: "/notes/new",
        //     },
        // ],
    }
];
