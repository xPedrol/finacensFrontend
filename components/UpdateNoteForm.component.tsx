import {UseFormReturn} from "react-hook-form";
import {INote} from "../models/Note.model";
import dayjs, {Dayjs} from "dayjs";
import {
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup, Select,
    Skeleton,
    Text,
    Textarea
} from "@chakra-ui/react";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";
import {useEffect} from "react";
import {DATE_TIME_INPUT_FORMAT} from "../const/date.const";

type PageData = {
    note: INote | null | undefined
    creating: boolean
    form: UseFormReturn<FormData, any>;
}

type FormData = {
    title: string;
    description: string;
    fixed: boolean;
    date: Dayjs;

    noteGroupId: string;
}
const UpdateNoteForm = ({note, creating, form}: PageData) => {
    const {
        register,
        reset,
        formState: {errors},
    } = form;
    useEffect(() => {
        if (!note) {
            reset({});
        } else {
            reset({
                title: note.title,
                description: note.description,
                fixed: note.fixed,
                date: dayjs(note.date).format(DATE_TIME_INPUT_FORMAT),
                noteGroupId: note.noteGroupId,
            });
        }
    }, [note]);
    const isLoaded = creating || (!creating && !!note);
    return (
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
            <GridItem colSpan={{base: 12}}>
                <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                    <FormControl isInvalid={!!errors.title}>
                        <FormLabel>Title</FormLabel>
                        <InputGroup size={"md"}>
                            <Input
                                type="text"
                                {...register("title", {required: true})}
                            />
                        </InputGroup>
                        <CustomFormErrorMessage/>
                    </FormControl>
                </Skeleton>
            </GridItem>
            <GridItem colSpan={12}>
                <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                    <FormControl isInvalid={!!errors.date}>
                        <FormLabel>Date</FormLabel>
                        <InputGroup size={"md"}>
                            <Input type="datetime-local" {...register("date", {required: true})} />
                        </InputGroup>
                        <CustomFormErrorMessage/>
                    </FormControl>
                </Skeleton>
            </GridItem>
            <GridItem colSpan={12}>
                <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                    <FormControl isInvalid={!!errors.date}>
                        <FormLabel>Group</FormLabel>
                        <InputGroup size={"md"}>
                            <Select  {...register("noteGroupId")} placeholder={'Select a group...'}>
                            </Select>
                        </InputGroup>
                        <CustomFormErrorMessage/>
                    </FormControl>
                </Skeleton>
            </GridItem>
            <GridItem colSpan={12}>
                <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                    <FormControl isInvalid={!!errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Textarea size={'md'}
                                  {...register("description")}
                                  rows={7}
                                  placeholder="Here is a sample description of the note"
                        />
                        <CustomFormErrorMessage/>
                    </FormControl>
                </Skeleton>
            </GridItem>
            <GridItem colSpan={12} as={Flex} justifyContent={"space-between"} alignItems={'flex-start'}>
                <Checkbox size="lg" colorScheme="blue" {...register("fixed", {required: false})}>
                    <FormLabel as={Text}>Fixed</FormLabel>
                </Checkbox>
            </GridItem>
        </Grid>
    );
};

export default UpdateNoteForm;