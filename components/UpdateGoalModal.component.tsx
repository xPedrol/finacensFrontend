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
    ModalOverlay,
    useToast
} from "@chakra-ui/react";
import {Dayjs} from "dayjs";
import UpdateGoalForm from "./UpdateGoalForm.component";
import {useQuery} from "react-query";
import {apiCreateGoal, apiGoal, apiUpdateGoal} from "../services/goal.service";

type PageProps = {
    goalId: string | null | undefined;
    isOpen: boolean;
    onClose: (props?: any) => void;
}
type FormData = {
    amount: number;
    date: Dayjs;
}
const UpdateGoalModal = ({goalId, isOpen, onClose}: PageProps) => {
    const router = useRouter();

    const [creating, setCreating] = useState<boolean>(true);
    const form = useForm<FormData>();

    const toast = useToast();

    const {
        data: goal,
        isLoading: goalLoading,
        isFetched: goalFetched,
    } = useQuery(
        ["goal", goalId],
        () => apiGoal(goalId as string).then((res) => res.data),
        {
            enabled: !creating && !!goalId,
            onSuccess: (data) => {

            },
        }
    );
    useEffect(() => {
        if (goalId && goalId !== "new") {
            setCreating(false);
        } else {
            form.reset({});
            setCreating(true);
        }
    }, [goalId]);
    const onSubmit = async (data: FormData) => {
        let request =
            !creating && goalId
                ? apiUpdateGoal(goalId as string, data as any)
                : apiCreateGoal(data as any);
        request
            .then(() => {
                toast({
                    title: "Goal saved successfully.",
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
                    <ModalHeader className={"usePoppins"} fontWeight={700}>
                        {creating ? 'New' : ''} Goal {goal ? ` - ${goal.amount}` : ''}
                    </ModalHeader>
                    <ModalCloseButton/>
                    <Box as={"form"} onSubmit={form.handleSubmit(onSubmit)}>
                        <ModalBody>
                            <UpdateGoalForm form={form} goal={goal} creating={creating}/>
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

export default UpdateGoalModal;