import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Seo from "../../components/Seo.component";
import PageHeader from "../../components/PageHeader.component";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup, Skeleton,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import DefaultLayout from "../../components/Layout.component";
import {BsArrowLeft} from "react-icons/bs";
import {useForm} from "react-hook-form";
import dayjs, {Dayjs} from "dayjs";
import {apiCreateNote, apiNote} from "../../services/note.service";
import {AuthProvider} from "../../contexts/auth.context";
import {useQuery} from "react-query";
import {apiExpense} from "../../services/expense.service";

const pageBreadcrumb = [
    {title: "Home", link: "/"},
    {title: "Notes", link: "/notes"},
    {
        title: "New",
        link: "/notes/[id]",
    },
];
const pageButtons = [
    {
        title: "Back",
        link: "/notes",
        colorSchema: "blue",
        icon: BsArrowLeft,
    },
];
type FormData = {
    title: string;
    description: string;
    color: string;
    favorite: boolean;
    date: Dayjs;
}
const NotesUpdate = () => {
    const router = useRouter();
    const [creating, setCreating] = useState<boolean>(true);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormData>();
    const toast = useToast();
    const onSubmit = (data: FormData) => {
        apiCreateNote(data as any).then(() => {
            router.push("/notes").then(() => toast({
                title: "Note created.",
                status: "success",
                isClosable: true,
            }));
        }).catch(() => toast({
            title: "Error creating note.",
            status: "error",
            isClosable: true,
        }));
    };
    const {
        data: note,
        isLoading: noteLoading,
        isFetched: noteFetched,
    } = useQuery(
        ["note", router.query?.noteId],
        () => apiNote(router.query?.noteId as string).then((res) => res.data),
        {
            enabled: !creating,
            onSuccess: (data) => {
                reset({
                    title: data.title,
                    description: data.description,
                    color: data.color,
                    favorite: data.favorite,
                    date: dayjs(data.date).format("YYYY-MM-DD"),
                });
            },
        }
    );
    useEffect(() => {
        if (router.query.noteId !== "new") {
            setCreating(false);
        }
    }, []);
    const isLoaded = creating || (!creating && !!note);
    return (
        <DefaultLayout>
            <Seo
                title={creating ? "New Note" : "Update Note"}
                description={"Update Notes page"}
            />
            <PageHeader
                title={"Notes"}
                breadcrumb={pageBreadcrumb}
                buttons={pageButtons}
            />
            <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    <GridItem colSpan={{base: 12, md: 6}}>
                        <Skeleton isLoaded={isLoaded} height="60px" borderRadius={'md'}>
                            <FormControl isInvalid={!!errors.title}>
                                <FormLabel>Title</FormLabel>
                                <InputGroup size={"lg"}>
                                    <Input
                                        type="text"
                                        {...register("title", {required: true})}
                                    />
                                </InputGroup>
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            </FormControl>
                        </Skeleton>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 5}}>
                        <Skeleton isLoaded={isLoaded} height="60px" borderRadius={'md'}>
                            <FormControl isInvalid={!!errors.date}>
                                <FormLabel>Date</FormLabel>
                                <InputGroup size={"lg"}>
                                    <Input type="date" {...register("date", {required: true})} />
                                </InputGroup>
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            </FormControl>
                        </Skeleton>
                    </GridItem>
                    <GridItem colSpan={{base: 12, md: 1}}>
                        <Skeleton isLoaded={isLoaded} height="60px" borderRadius={'md'}>
                            <FormControl isInvalid={!!errors.color}>
                                <FormLabel>Color</FormLabel>
                                <InputGroup size={"lg"}>
                                    <Input type="color" border={'none'} {...register("color", {required: true})} />
                                </InputGroup>
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            </FormControl>
                        </Skeleton>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <Skeleton isLoaded={isLoaded} height="60px" borderRadius={'md'}>
                            <FormControl isInvalid={!!errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    size={"lg"}
                                    {...register("description")}
                                    rows={5}
                                    placeholder="Here is a sample description of the note"
                                />
                                <FormErrorMessage>Description is required.</FormErrorMessage>
                            </FormControl>
                        </Skeleton>
                    </GridItem>
                    <GridItem colSpan={12} as={Flex} justifyContent={"space-between"} alignItems={'flex-start'}>
                        <Checkbox size="lg" colorScheme="blue" {...register("favorite", {required: false})}>
                            <Text fontSize={'15px'}>Favorito</Text>
                        </Checkbox>
                        <Button colorScheme="blue" size="md" type={"submit"} disabled={!isLoaded}>
                            Save
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
        </DefaultLayout>
    );
};
NotesUpdate.provider = AuthProvider;
export default NotesUpdate;