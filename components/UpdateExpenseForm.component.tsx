import {UseFormReturn} from "react-hook-form";
import {IExpense} from "../models/Expense.model";
import {useEffect, useState} from "react";
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
import {apiTags} from "../services/tag.service";
import UpdateTagModal from "./UpdateTagModal.component";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";
import {DATE_INPUT_FORMAT} from "../const/date.const";
import useDebounce from "../hooks/useDebounce.hook";
import {ITag} from "../models/Tag.model";
import {cleanObject} from "../utils/cleanObject.utils";

dayjs.extend(utc);


type PageData = {
    expense: IExpense | null | undefined
    creating: boolean
    form: UseFormReturn<FormData, any>;
}
type FormData = {
    amount: number;
    tagId: string;
    tag: ITag | null;
    description: string;
    date: string;
    category?: EnumCategory;
};
const UpdateExpenseForm = ({expense, creating, form}: PageData) => {
    const {isOpen: isTagModalOpen, onOpen: onTagModalOpen, onClose: onTagModalClose} = useDisclosure();
    const [tags, setTags] = useState<ITag[]>([]);
    const watchTagId = useDebounce(form.watch("tagId"), 500);
    const {
        register,
        reset,
        formState: {errors, isSubmitted},
    } = form;
    const getTags = (clearParams = false) => {
        if (clearParams) {
            form.setValue('tag', null);
        }
        let request = apiTags({
            name: watchTagId,
            id: null
        });
        request = cleanObject(request);
        request.then((res) => {
            if (res.data) {
                setTags(res.data);
            }
        });
        return request;
    };
    const closeTagModal = (props?: any) => {
        onTagModalClose();
        getTags(true);
        if (props && props.tag) {
            form.setValue("tagId", props.tag.name);
        }
    };
    useEffect(() => {
        if (!expense) {
            reset({});
        } else {
            reset({
                amount: Math.abs(expense.amount),
                tagId: expense.tag ? expense.tag.name : '',
                description: expense.description,
                date: dayjs(expense.date).utc().format(DATE_INPUT_FORMAT),
                category: expense.amount > 0 ? EnumCategory.GAIN : EnumCategory.LOSS,
            });
        }
    }, [expense]);
    const isLoaded = creating || (!creating && !!expense);
    useEffect(() => {
        if (watchTagId) {
            getTags().then((res) => {
                const tag = res.data.find((tag) => tag.name === watchTagId);
                if (tag) {
                    form.setValue("tag", tag);
                } else {
                    form.setValue("tag", null);
                }
            });
        } else {
            if (tags.length > 0) {
                getTags();
            }
            form.setValue("tag", null);
        }
    }, [watchTagId]);
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
                        <FormControl isInvalid={!!errors.tagId || (isSubmitted && !form.getValues('tag'))}>
                            <FormLabel>Tag</FormLabel>
                            <InputGroup size={"md"}>
                                <Input {...register("tagId", {required: true})} list={'tagList'}
                                       placeholder={'Escolha uma tag...'}/>
                                <datalist id="tagList">
                                    {tags && tags.map((tag) => (
                                        <option key={tag.id} value={tag.name}/>
                                    ))}
                                </datalist>
                                {/*<Select*/}
                                {/*    {...register("tagId", {required: true})}*/}
                                {/*    placeholder="Select option..."*/}
                                {/*>*/}
                                {/*    {Array.isArray(tags) &&*/}
                                {/*        tags.map((tag) => (*/}
                                {/*            <option key={tag.id} value={tag.id}>*/}
                                {/*                {tag.name}*/}
                                {/*            </option>*/}
                                {/*        ))}*/}
                                {/*</Select>*/}
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
                            {errors.tagId ? <CustomFormErrorMessage/> :
                                <CustomFormErrorMessage>Tag não encontrada</CustomFormErrorMessage>}

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