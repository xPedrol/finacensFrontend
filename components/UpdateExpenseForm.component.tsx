import {useForm, UseFormReturn} from "react-hook-form";
import {IExpense} from "../models/Expense.model";
import {useEffect} from "react";
import dayjs from "dayjs";
import {categories, EnumCategory} from "../enum/Category.enum";
import {
    Box, Button, Flex,
    FormControl, FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftAddon, InputRightElement, Select,
    Skeleton, Textarea, useDisclosure
} from "@chakra-ui/react";
import {AiOutlinePlus} from "react-icons/ai";
import {useQuery} from "react-query";
import {apiTags} from "../services/tag.service";
import TagModal from "./TagModal.component";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";

type PageData = {
    expense: IExpense | null | undefined
    creating: boolean
    form: UseFormReturn<FormData, any>;
}
type FormData = {
    amount: number;
    tagId: string;
    description: string;
    date: string;
    category: EnumCategory;
};
const UpdateExpenseForm = ({expense, creating, form}: PageData) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = form;

    const {
        data: tags,
        isLoading: tagsLoading,
        isFetched: tagsFetched,
        refetch: refetchTags,
    } = useQuery(["tags"], () => apiTags().then((res) => res.data));
    useEffect(() => {
        if (!expense) {
            reset({});
        } else {
            reset({
                amount: expense.amount,
                tagId: expense.tagId,
                description: expense.description,
                date: dayjs(expense.date).format("YYYY-MM-DD"),
                category: expense.category,
            });
        }
    }, [expense]);
    const closeTagModal = () => {
        onClose();
        refetchTags();
    };
    const isLoaded = creating || (!creating && !!expense);
    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={{base: 12}}>
                    <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
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
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </Skeleton>
                </GridItem>
                <GridItem colSpan={{base: 12}}>
                    <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                        <FormControl isInvalid={!!errors.date}>
                            <FormLabel>Date</FormLabel>
                            <InputGroup size={"lg"}>
                                {/* eslint-disable-next-line react/no-children-prop */}
                                <Input type="date" {...register("date", {required: true})} />
                            </InputGroup>
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </Skeleton>
                </GridItem>
                <GridItem colSpan={{base: 12}}>
                    <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
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
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </Skeleton>
                </GridItem>
                <GridItem colSpan={{base: 12}}>
                    <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
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
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </Skeleton>
                </GridItem>
                <GridItem colSpan={12}>
                    <Skeleton isLoaded={isLoaded} borderRadius={'md'}>
                        <FormControl isInvalid={!!errors.description}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                size={"lg"}
                                {...register("description")}
                                rows={5}
                                placeholder="Here is a sample description of the expensee"
                            />
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </Skeleton>
                </GridItem>
            </Grid>
            <TagModal isOpen={isOpen} onClose={closeTagModal}/>
        </>
    );
};

export default UpdateExpenseForm;