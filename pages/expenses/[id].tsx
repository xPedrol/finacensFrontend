import {AuthProvider} from "../../contexts/auth.context";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {apiCreateExpense, apiExpense, apiUpdateExpense,} from "../../services/expense.service";
import {useQuery} from "react-query";
import DefaultLayout from "../../components/Layout.component";
import Seo from "../../components/Seo.component";

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Select,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import {BsArrowLeft} from "react-icons/bs";
import PageHeader from "../../components/PageHeader.component";
import {useForm} from "react-hook-form";
import {AiOutlinePlus} from "react-icons/ai";
import CategoryModal from "../../components/CategoryModal.component";
import {apiCategories} from "../../services/category.service";
import dayjs from "dayjs";

const pageBreadcrumb = [
    {title: "Home", link: "/"},
    {title: "Expenses", link: "/expenses"},
    {
        title: "New",
        link: "/expenses/[id]",
    },
];
const pageButtons = [
    {
        title: "Voltar",
        link: "/expenses",
        colorSchema: "blue",
        icon: BsArrowLeft,
    },
];

type FormData = {
    amount: number;
    categoryId: string;
    description: string;
    date: string;
};
const ExpensesUpdate = () => {
    const router = useRouter();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [creating, setCreating] = useState<boolean>(true);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormData>();
    const toast = useToast();
    const {
        data: expense,
        isLoading: expenseLoading,
        isFetched: expenseFetched,
    } = useQuery(
        ["expenses", router.query?.id],
        () => apiExpense(router.query?.id as string),
        {
            enabled: !creating,
            onSuccess: (data) => {
                reset({
                    amount: data.data.amount,
                    categoryId: data.data.categoryId,
                    description: data.data.description,
                    date: dayjs(data.data.date).format("YYYY-MM-DD"),
                });
            },
        }
    );
    const {
        data: categories,
        isLoading: categoriesLoading,
        isFetched: categoriesFetched,
    } = useQuery(["categories"], () => apiCategories());

    const onSubmit = async (data: FormData) => {
        let request =
            !creating && router.query?.id
                ? apiUpdateExpense(router.query.id as string, data)
                : apiCreateExpense(data);
        request
            .then(() => {
                router.push("/expenses").then(() =>
                    toast({
                        title: `Expense ${creating ? "created" : "updated"} successfully`,
                        status: "success",
                        isClosable: true,
                    })
                );
            })
            .catch(() => {
                toast({
                    title: "Something went wrong. Please try again later.",
                    status: "error",
                    isClosable: true,
                });
            });
    };
    useEffect(() => {
        if (router.query.id !== "new") {
            setCreating(false);
        }
    }, []);
    return (
        <DefaultLayout>
            <Seo
                title={creating ? "New Expense" : "Update Expense"}
                description={"Update Expenses page"}
            />
            <PageHeader
                title={"Expenses"}
                breadcrumb={pageBreadcrumb}
                buttons={pageButtons}
            />
            <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    <GridItem colSpan={{base: 12, md: 4}}>
                        <FormControl isInvalid={!!errors.amount}>
                            <FormLabel>Amount</FormLabel>
                            <InputGroup size={"lg"}>
                                {/* eslint-disable-next-line react/no-children-prop */}
                                <InputLeftAddon children="R$"/>
                                <Input
                                    type="text"
                                    {...register("amount", {required: true})}
                                />
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 4}}>
                        <FormControl isInvalid={!!errors.date}>
                            <FormLabel>Date</FormLabel>
                            <InputGroup size={"lg"}>
                                {/* eslint-disable-next-line react/no-children-prop */}
                                <Input type="date" {...register("date", {required: true})} />
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 4}}>
                        <FormControl isInvalid={!!errors.categoryId}>
                            <FormLabel>Category</FormLabel>
                            <InputGroup size={"lg"}>
                                <Select
                                    size={"lg"}
                                    {...register("categoryId", {required: true})}
                                    placeholder="Select option..."
                                >
                                    {categories?.data &&
                                        categories.data.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </Select>
                                <InputRightElement width="6.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        leftIcon={<AiOutlinePlus/>}
                                        onClick={onOpen}
                                    >
                                        Novo
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl isInvalid={!!errors.description}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                size={"lg"}
                                {...register("description")}
                                rows={5}
                                placeholder="Here is a sample description of the expensee"
                            />
                            <FormErrorMessage>Description is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12} as={Flex} justifyContent={"flex-end"}>
                        <Button colorScheme="blue" size="md" type={"submit"}>
                            Salvar
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
            <CategoryModal isOpen={isOpen} onClose={onClose}/>
        </DefaultLayout>
    );
};
ExpensesUpdate.provider = AuthProvider;
export default ExpensesUpdate;
