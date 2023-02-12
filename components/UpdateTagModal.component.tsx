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
    ModalOverlay,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {apiCreateTag, apiUpdateTag} from "../services/tag.service";
import generateRandomColor from "../utils/generateColor.utils";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";
import {ITag} from "../models/Tag.model";
import {useEffect, useState} from "react";

type TagModalProps = {
    isOpen: boolean;
    onClose: (props?: any) => void;

    tag: ITag | null;
};
type FormData = {
    name: string;
    description?: string;
    color: string;
};
const UpdateTagModal = ({tag, isOpen, onClose}: TagModalProps) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [creating, setCreating] = useState<boolean>(true);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormData>();
    const toast = useToast();
    const onSubmit = async (data: FormData) => {
        setSubmitting(true);
        data.color = generateRandomColor();
        let request =
            !creating && tag?.id
                ? apiUpdateTag(tag?.id as string, data as any)
                : apiCreateTag(data as any);
        request.then((result) => {
            toast({
                title: "Tag criada com sucesso",
                status: "success",
                isClosable: true,
            });
            onClose({
                tag: result.data as ITag,
                success: true,
            });
        }).catch(() => {
            toast({
                title: "Something went wrong. Please try again later.",
                status: "error",
                isClosable: true,
            });
        }).finally(() => setSubmitting(false));
    };
    useEffect(() => {
        console.log(tag);
        if (tag?.id && tag?.id !== "new") {
            setCreating(false);
            reset({
                name: tag.name,
                description: tag.description,
            });
        } else {
            reset({});
            setCreating(true);
        }
    }, [tag?.id]);
    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
                <ModalOverlay/>
                <ModalContent>
                    <Box>
                        <ModalHeader className={"usePoppins"} fontWeight={700}>
                            Tag
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
                                <GridItem colSpan={12}>
                                    <FormControl isInvalid={!!errors.description}>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            {...register("description")}
                                            size={"md"}
                                            rows={5}
                                            placeholder="Here is a sample description of the expensee"
                                        />
                                        <CustomFormErrorMessage/>
                                    </FormControl>
                                </GridItem>
                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" variant={'ghost'} size={'sm'} mr={3} onClick={onClose}>
                                Fechar
                            </Button>
                            <Button colorScheme={"gray"} variant={'ghost'} size={'sm'} type={"submit"}
                                    isLoading={submitting}
                                    onClick={handleSubmit(onSubmit)}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};
export default UpdateTagModal;
