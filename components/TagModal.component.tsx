import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
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
    ModalOverlay,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {apiCreateTag} from "../services/tag.service";
import generateRandomColor from "../utils/generateColor.utils";

type TagModalProps = {
    isOpen: boolean;
    onClose: () => void;
};
type FormData = {
    name: string;
    description: string;
    color: string;
};
const TagModal = ({isOpen, onClose}: TagModalProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();
    const toast = useToast();
    const onSubmit = async (data: FormData) => {
        data.color = generateRandomColor();
        await apiCreateTag(data)
            .then(() => {
                toast({
                    title: "Tag criada com sucesso",
                    status: "success",
                    isClosable: true,
                });
                onClose();
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
                    <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className={"usePoppins"} fontWeight={700}>
                            Tag
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                                <GridItem colSpan={{base: 12, md: 12}}>
                                    <FormControl isInvalid={!!errors.name}>
                                        <FormLabel>Name</FormLabel>
                                        <InputGroup size={"lg"}>
                                            {/* eslint-disable-next-line react/no-children-prop */}
                                            <Input
                                                type="text"
                                                {...register("name", {required: true})}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>Email is required.</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={12}>
                                    <FormControl isInvalid={!!errors.description}>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            {...register("description", {required: true})}
                                            size={"lg"}
                                            rows={5}
                                            placeholder="Here is a sample description of the expensee"
                                        />
                                        <FormErrorMessage>Email is required.</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Fechar
                            </Button>
                            <Button colorScheme={"blue"} type={"submit"}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};
export default TagModal;
