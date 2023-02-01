import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useToast
} from "@chakra-ui/react";
import {Dayjs} from "dayjs";
import UpdateNoteForm from "./UpdateNoteForm.component";
import {useQuery} from "react-query";
import {apiCreateNote, apiNote, apiUpdateNote} from "../services/note.service";

type PageProps = {
    noteId: string | null | undefined;
    isOpen: boolean;
    onClose: (props?: any) => void;
}
type FormData = {
    title: string;
    description: string;
    fixed: boolean;
    date: Dayjs;
}
const UpdateNoteModal = ({noteId, isOpen, onClose}: PageProps) => {
    const router = useRouter();

    const [creating, setCreating] = useState<boolean>(true);
    const form = useForm<FormData>();

    const toast = useToast();

    const {
        data: note,
        isLoading: noteLoading,
        isFetched: noteFetched,
    } = useQuery(
        ["note", noteId],
        () => apiNote(noteId as string).then((res) => res.data),
        {
            enabled: !creating && !!noteId,
            onSuccess: (data) => {

            },
        }
    );
    useEffect(() => {
        if (noteId && noteId !== "new") {
            setCreating(false);
        } else {
            form.reset({});
            setCreating(true);
        }
    }, [noteId]);
    const onSubmit = async (data: FormData) => {
        let request =
            !creating && noteId
                ? apiUpdateNote(noteId as string, data as any)
                : apiCreateNote(data as any);
        request
            .then(() => {
                toast({
                    title: "Note saved successfully.",
                    status: "success",
                    isClosable: true,
                });
                onClose({success: true});
            })
            .catch(() => {
                toast({
                    title: "Something went wrong. Please try again later.",
                    status: "error",
                    isClosable: true,
                });
            });
    };

    return (
        <>

            <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize={'18px'}>{creating ? 'New' : ''} Note {note ? ` - ${note.title}` : ''}</Text>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <Box as={"form"} onSubmit={form.handleSubmit(onSubmit)}>
                        <ModalBody>
                            <UpdateNoteForm form={form} note={note} creating={creating}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button size={'sm'} colorScheme="red" mr={3} onClick={onClose} variant={'ghost'}>
                                Fechar
                            </Button>
                            <Button size={'sm'} colorScheme={"gray"} type={"submit"} variant={'ghost'}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateNoteModal;