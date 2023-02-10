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
    ModalOverlay,
    Text,
    useToast
} from "@chakra-ui/react";
import {Dayjs} from "dayjs";
import UpdateNoteForm from "./UpdateNoteForm.component";
import {apiCreateNote, apiUpdateNote} from "../services/note.service";
import {INote} from "../models/Note.model";

type PageProps = {
    note: INote | null;
    isOpen: boolean;
    onClose: (props?: any) => void;
}
type FormData = {
    title: string;
    description?: string;
    fixed: boolean;
    date?: Dayjs;
}
const UpdateNoteModal = ({note, isOpen, onClose}: PageProps) => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [creating, setCreating] = useState<boolean>(true);
    const form = useForm<FormData>();

    const toast = useToast();

    useEffect(() => {
        if (note?.id && note?.id !== "new") {
            setCreating(false);
        } else {
            form.reset({});
            setCreating(true);
        }
    }, [note?.id]);
    const onSubmit = async (data: FormData) => {
        setSubmitting(true);
        let request =
            !creating && note?.id
                ? apiUpdateNote(note?.id as string, data as any)
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
            }).catch(() => setSubmitting(false));
    };

    return (
        <>

            <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        {creating ? 'New' : ''} Note
                        <Text as={'p'} fontSize={'13px'}>{note?.title}</Text>
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
                            <Button size={'sm'} colorScheme={"gray"} type={"submit"} variant={'ghost'} isLoading={submitting}>
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