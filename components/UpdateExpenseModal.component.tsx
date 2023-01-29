import {useRouter} from "next/router";
import {useEffect, useState} from "react";
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
import {useQuery} from "react-query";
import {apiCreateExpense, apiExpense, apiUpdateExpense} from "../services/expense.service";
import UpdateExpenseForm from "./UpdateExpenseForm.component";
import {EnumCategory} from "../enum/Category.enum";
import {useForm} from "react-hook-form";
import currentFormat from "../utils/currentFormat.utils";

type PageProps = {
    expenseId: string | null | undefined;
    isOpen: boolean;
    onClose: (props?: any) => void;
}
type FormData = {
    amount: number;
    tagId: string;
    description: string;
    date: string;
    category?: EnumCategory;
};
const UpdateExpenseModal = ({expenseId, isOpen, onClose}: PageProps) => {
    const router = useRouter();

    const [creating, setCreating] = useState<boolean>(true);
    const form = useForm<FormData>();

    const toast = useToast();
    const {
        data: expense,
        isLoading: expenseLoading,
        isFetched: expenseFetched,
    } = useQuery(
        ["expense", expenseId],
        () => apiExpense(expenseId as string).then((res) => res.data),
        {
            enabled: !creating && !!expenseId,
            onSuccess: (data) => {

            },
        }
    );
    useEffect(() => {
        if (expenseId && expenseId !== "new") {
            setCreating(false);
        } else {
            form.reset({});
            setCreating(true);
        }
    }, [expenseId]);
    const onSubmit = async (data: FormData) => {
        if (data.category === EnumCategory.LOSS) {
            data.amount = -Math.abs(data.amount);
        }
        delete data.category;
        let request =
            !creating && expenseId
                ? apiUpdateExpense(expenseId as string, data as any)
                : apiCreateExpense(data as any);
        request
            .then(() => {
                toast({
                    title: "Expense saved successfully.",
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

            <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize={'18px'}>{creating ? 'New' : ''} Expense {expense ? ` - ${currentFormat(expense.amount)}` : ''}</Text>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <Box as={"form"} onSubmit={form.handleSubmit(onSubmit)}>
                        <ModalBody>
                            <UpdateExpenseForm form={form} expense={expense} creating={creating}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose} size={'sm'} variant={'ghost'}>
                                Fechar
                            </Button>
                            <Button colorScheme={"gray"} type={"submit"} size={'sm'} variant={'ghost'}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateExpenseModal;