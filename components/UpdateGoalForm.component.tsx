import {UseFormReturn} from "react-hook-form";
import dayjs, {Dayjs} from "dayjs";
import {FormControl, FormLabel, Grid, GridItem, Input, InputGroup, Skeleton} from "@chakra-ui/react";
import CustomFormErrorMessage from "./CustomFormErrorMessage.component";
import {useEffect} from "react";
import {IGoal} from "../models/Goal.model";

type PageData = {
    goal: IGoal | null | undefined
    creating: boolean
    form: UseFormReturn<FormData, any>;
}

type FormData = {
    amount: number;
    date: Dayjs;
}
const UpdateGoalForm = ({goal, creating, form}: PageData) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = form;
    useEffect(() => {
        if (!goal) {
            reset({});
        } else {
            reset({
                amount: goal.amount,
                date: dayjs(goal.date).format("YYYY-MM-DD")
            });
        }
    }, [goal]);
    const isLoaded = creating || (!creating && !!goal);
    return (
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            <GridItem colSpan={{base: 12}}>
                <Skeleton isLoaded={isLoaded} minH="60px" borderRadius={'md'}>
                    <FormControl isInvalid={!!errors.amount}>
                        <FormLabel>Amount</FormLabel>
                        <InputGroup size={"lg"}>
                            <Input
                                type="number"
                                {...register("amount", {required: true})}
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
                        <InputGroup size={"lg"}>
                            <Input type="date" {...register("date", {required: true})} />
                        </InputGroup>
                        <CustomFormErrorMessage/>
                    </FormControl>
                </Skeleton>
            </GridItem>
        </Grid>
    );
};

export default UpdateGoalForm;