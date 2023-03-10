import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useToast
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";
import {apiCreateNoteGroup} from "../services/noteGroup.service";
import {useState} from "react";

type PopoverProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
type formData = {
    name: string;
}
const UpdateNoteGroupModal = ({isOpen, onClose}: PopoverProps) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm<formData>({});
    const toast = useToast();
    const closeModal = () => {
        reset();
        onClose();
    };
    const onSubmit = async (data: formData) => {
        setSubmitting(true);
        apiCreateNoteGroup(data).then(() => {
            toast({
                title: "Note Group created.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            closeModal();
        }).catch(() => {
            toast({
                title: "Error",
                description: "Error creating note group",
                status: "error",
                isClosable: true,
            });
        }).finally(() => setSubmitting(false));
    };
    return <>
        <Modal isCentered isOpen={isOpen} onClose={closeModal} size={"lg"}>
            <ModalOverlay/>
            <ModalContent>
                <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader className={"usePoppins"} fontWeight={700}>
                        Note Group
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                            <GridItem colSpan={{base: 12, md: 12}}>
                                <FormControl isInvalid={!!errors.name}>
                                    <FormLabel>Name</FormLabel>
                                    <InputGroup size={"md"}>
                                        {/* eslint-disable-next-line react/no-children-prop */}
                                        <Input
                                            type="text"
                                            {...register("name", {required: true})}
                                        />
                                    </InputGroup>
                                    <CustomFormErrorMessage/>
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" variant={'ghost'} size={'sm'} mr={3} onClick={closeModal}>
                            Fechar
                        </Button>
                        <Button colorScheme={"gray"} variant={'ghost'} size={'sm'} type={"submit"}
                                isLoading={submitting}>
                            Salvar
                        </Button>
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    </>;
};

export default UpdateNoteGroupModal;