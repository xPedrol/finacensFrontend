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
import TagModal from "../../components/TagModal.component";
import {apiTags} from "../../services/tag.service";
import dayjs from "dayjs";
import {categories, EnumCategory} from "../../enum/Category.enum";

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
    tagId: string;
    description: string;
    date: string;
    category: EnumCategory;
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
    const closeTagModal = ()=>{
        onClose();
        refetchTags();
    }
    const toast = useToast();
    const {
        data: expense,
        isLoading: expenseLoading,
        isFetched: expenseFetched,
    } = useQuery(
        ["expenses", router.query?.expenseId],
        () => apiExpense(router.query?.expenseId as string).then((res) => res.data),
        {
            enabled: !creating,
            onSuccess: (data) => {
                reset({
                    amount: data.amount,
                    tagId: data.tagId,
                    description: data.description,
                    date: dayjs(data.date).format("YYYY-MM-DD"),
                    category: data.category,
                });
            },
        }
    );
    const {
        data: tags,
        isLoading: tagsLoading,
        isFetched: tagsFetched,
        refetch: refetchTags,
    } = useQuery(["tags"], () => apiTags().then((res) => res.data));

    const onSubmit = async (data: FormData) => {
        let request =
            !creating && router.query?.expenseId
                ? apiUpdateExpense(router.query.id as string, data as any)
                : apiCreateExpense(data as any);
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
        if (router.query.expenseId !== "new") {
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
                    <GridItem colSpan={{base: 12, md: 3}}>
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
                    <GridItem colSpan={{base: 12, md: 3}}>
                        <FormControl isInvalid={!!errors.date}>
                            <FormLabel>Date</FormLabel>
                            <InputGroup size={"lg"}>
                                {/* eslint-disable-next-line react/no-children-prop */}
                                <Input type="date" {...register("date", {required: true})} />
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 3}}>
                        <FormControl isInvalid={!!errors.tagId}>
                            <FormLabel>Tag</FormLabel>
                            <InputGroup size={"lg"}>
                                <Select
                                    size={"lg"}
                                    {...register("tagId", {required: true})}
                                    placeholder="Select option..."
                                >
                                    {Array.isArray(tags) &&
                                        tags.map((tag) => (
                                            <option key={tag.id} value={tag.id}>
                                                {tag.name}
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
                    <GridItem colSpan={{base: 12, md: 3}}>
                        <FormControl isInvalid={!!errors.tagId}>
                            <FormLabel>Category</FormLabel>
                            <InputGroup size={"lg"}>
                                <Select
                                    size={"lg"}
                                    {...register("category", {required: true})}
                                    placeholder="Select option..."
                                >
                                    {
                                        categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                </Select>
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
            <TagModal isOpen={isOpen} onClose={closeTagModal}/>
        </DefaultLayout>
    );
};
ExpensesUpdate.provider = AuthProvider;
export default ExpensesUpdate;
