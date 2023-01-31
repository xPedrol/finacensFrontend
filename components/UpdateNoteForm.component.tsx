import {UseFormReturn} from "react-hook-form";
import {INote} from "../models/Note.model";
import dayjs, {Dayjs} from "dayjs";
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel, Grid,
    GridItem,
    Input,
    InputGroup,
    Skeleton, Text,
    Textarea
} from "@chakra-ui/react";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";
import {useEffect} from "react";

type PageData = {
    note: INote | null | undefined
    creating: boolean
    form: UseFormReturn<FormData, any>;
}

type FormData = {
    title: string;
    description: string;
    color: string;
    fixed: boolean;
    date: Dayjs;
}
const UpdateNoteForm = ({note, creating, form}: PageData) => {
    const {
        register,
        handleSubmit,
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
                color: note.color,
                fixed: note.fixed,
                date: dayjs(note.date).format("YYYY-MM-DD")
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
            <GridItem colSpan={{base: 12, md: 8}}>
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
            <GridItem colSpan={{base: 12, md: 4}}>
                <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                    <FormControl isInvalid={!!errors.color}>
                        <FormLabel>Color</FormLabel>
                        <InputGroup size={"md"}>
                            <Input type="color" border={'none'} {...register("color", {required: true})} />
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
                            rows={5}
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