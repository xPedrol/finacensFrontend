import {UseFormReturn} from "react-hook-form";
import {IExpense} from "../models/Expense.model";
import {useEffect, useRef} from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import {categories, EnumCategory} from "../enum/Category.enum";
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Select,
    Skeleton,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {apiTags} from "../services/tag.service";
import UpdateTagModal from "./UpdateTagModal.component";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";
import {DATE_INPUT_FORMAT} from "../const/date.const";

dayjs.extend(utc);

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
    category?: EnumCategory;
};
const UpdateExpenseForm = ({expense, creating, form}: PageData) => {
    const {isOpen: isTagModalOpen, onOpen: onTagModalOpen, onClose: onTagModalClose} = useDisclosure();
    const selectedTag = useRef<string | null>(null);
    const {
        register,
        reset,
        formState: {errors},
    } = form;

    let {
        data: tags,
        refetch: refetchTags,
    } = useQuery(["tags"], () => apiTags().then((res) => res.data));
    useEffect(() => {
        if (!expense) {
            reset({});
        } else {
            reset({
                amount: Math.abs(expense.amount),
                tagId: expense.tagId,
                description: expense.description,
                date: dayjs(expense.date).utc().format(DATE_INPUT_FORMAT),
                category: expense.amount > 0 ? EnumCategory.GAIN : EnumCategory.LOSS,
            });
        }
    }, [expense]);
    const closeTagModal = (props?: any) => {
        onTagModalClose();
        refetchTags();
        if (props && props.tag) {
            selectedTag.current = props.tag.id as string;
        }
    };
    const isLoaded = creating || (!creating && !!expense);
    useEffect(() => {
        if (selectedTag.current) {
            form.setValue("tagId", selectedTag.current);
        } else {
            selectedTag.current = null;
        }
    }, [tags]);
    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                <GridItem colSpan={{base: 12}}>
                    <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                        <FormControl isInvalid={!!errors.amount}>
                            <FormLabel>Amount</FormLabel>
                            <InputGroup size={"md"}>
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
                            <InputGroup size={"md"}>
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
                            <InputGroup size={"md"}>
                                <Select
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
                                <InputRightElement width="5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={onTagModalOpen}
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
                            <InputGroup size={"md"}>
                                <Select
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
                                size={"md"}
                                {...register("description")}
                                rows={5}
                                placeholder="Here is a sample description of the expensee"
                            />
                            <CustomFormErrorMessage/>
                        </FormControl>
                    </Skeleton>
                </GridItem>
            </Grid>
            <UpdateTagModal tag={null} isOpen={isTagModalOpen} onClose={closeTagModal}/>
        </>
    );
};

export default UpdateExpenseForm;