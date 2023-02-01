import {
    Avatar,
    Box,
    Button,
    Collapse,
    Flex,
    Hide,
    Icon,
    IconButton,
    Link as ChakraLink,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Show,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import {HiOutlineMenu} from "react-icons/hi";
import Link from "next/link";
import {useAuth} from "../contexts/auth.context";
import {FaChevronDown} from "react-icons/fa";
import {MdClear} from "react-icons/md";
import {useRouter} from "next/router";

const siteName = process.env.NEXT_PUBLIC_FULL_SITE_NAME as string;
export default function DefaultNavbar() {
    const {isOpen, onToggle} = useDisclosure();
    const {toggleColorMode} = useColorMode();
    const auth = useAuth();
    const router = useRouter();
    const navItemBorderBottomColor = useColorModeValue("gray.400", "gray.500");
    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "#111111")}
                color={useColorModeValue("gray.600", "white")}
                minH={'60px'}
                px={{base: 4}}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                justify={'center'}
                flexDirection={'column'}
            >
                <Flex justify={'space-between'} py={{base: 4}} pt={'30px'} px={{base: 0, sm: '30px'}}>
                    <Flex align={'center'}>
                        <Text textTransform={'uppercase'} fontFamily={'Poppins'} fontWeight={600}
                              fontSize={'16px'}>{siteName}</Text>
                        <Hide below={'md'}>
                            {auth.user &&
                                <>
                                    <svg data-testid="geist-icon" fill="none" height="32"
                                         shapeRendering="geometricPrecision"
                                         style={{color: '#eaeaea'}}
                                         stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                         strokeWidth="1"
                                         viewBox="0 0 24 24" width="32">
                                        <path d="M16.88 3.549L7.12 20.451"></path>
                                    </svg>
                                    <Text fontFamily={'Inter'}>{auth.user.email}</Text>
                                </>
                            }
                        </Hide>
                    </Flex>
                    <Flex align={'center'} gap={4}>
                        <Show below={'md'}>
                            <IconButton
                                onClick={onToggle}
                                icon={
                                    isOpen ? (
                                        <Icon w={8} h={8} color={'gray.400'} as={MdClear}></Icon>
                                    ) : (
                                        <Icon w={7} h={7} color={'gray.400'} as={HiOutlineMenu}></Icon>
                                    )
                                }
                                variant={"ghost"}
                                aria-label={"Toggle Navigation"}
                            />
                        </Show>
                        <Hide below={'md'}>
                            <Button size={'sm'} onClick={toggleColorMode}>Theme</Button>
                            {auth?.isLoading ? (
                                <Text>Loading...</Text>
                            ) : !auth || !auth.user ? (
                                <>
                                    <Button as={Link} size={'sm'} href={'/login'}>Login</Button>
                                    <Button as={Link} size={'sm'} href={'/register'}>Register</Button>
                                </>
                            ) : (
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
                                        } size="sm" name={auth.user.name} src={auth.user.picture ?? undefined}/>
                                    </MenuButton>
                                    <MenuList>
                                        <Link href={"/profile"}>
                                            <MenuItem>
                                                Profile
                                            </MenuItem>
                                        </Link>
                                        <MenuItem onClick={auth.logout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                        </Hide>
                    </Flex>
                </Flex>
                <Flex fontFamily={'Inter'} fontSize={'14px'} justify={{base: 'space-around', sm: 'flex-start'}}>
                    {NAV_ITEMS.map((navItem: NavItem) =>
                        (navItem.auth && auth?.user) || !navItem.auth ?
                            <Link href={navItem.href ?? '#'} key={navItem.label}>
                                <Text
                                    borderBottom={router.pathname === navItem.href ? '2px solid' : 'none'}
                                    borderBottomColor={navItemBorderBottomColor}
                                    p={'10px'}>{navItem.label}</Text>
                            </Link> : null
                    )}
                </Flex>
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
    href: string;
    auth?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Home",
        href: "/",
        auth: true
    },
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
