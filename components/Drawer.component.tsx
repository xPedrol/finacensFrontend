import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Progress,
    Stack,
    StackDivider,
    Text,
    Tooltip, useColorModeValue, useDisclosure, Wrap, WrapItem
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {apiMonthsBalance} from "../services/expenseStatistic.service";
import Loading from "./LoadingSpinner.component";
import {formatNumbersBalanceDate} from "../utils/formatDate.utils";
import currencyFormat, {getCurrencyColor} from "../utils/currentFormat.utils";
import UpdateGoalModal from "./UpdateGoalModal.component";
import {apiGoalByDate} from "../services/goal.service";
import NoData from "./NoData.component";
import {IExpensesByMonth} from "../models/ExpensesByMonth.model";
import {apiNotes} from "../services/note.service";
import {INote} from "../models/Note.model";
import dayjs from "dayjs";

type DrawerProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const DefaultDrawer = ({isOpen, onOpen, onClose}: DrawerProps) => {
    const goal = useRef<string | null>(null);
    const {isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal} = useDisclosure();
    const openModal = (id: string) => {
        goal.current = id;
        onOpenModal();
    };
    const closeModal = (props?: any) => {
        onCloseModal();
        goal.current = null;
    };
    const {
        data: monthsBalance,
        error: monthsBalancesErros,
        isLoading: monthsBalanceLoading,
        refetch: monthsBalanceRefetch,
    } = useQuery('monthsBalance', () => apiMonthsBalance().then(res => res.data), {
        enabled: isOpen
    });
    const {
        data: notes,
        error: notesErrors,
        isLoading: notesLoading,
        refetch: notesRefetch
    } = useQuery('notes', () => apiNotes({
        page: 0,
        limit: 5,
    }).then(res => res.data), {
        enabled: isOpen
    });
    useEffect(() => {
        if (isOpen) {
            monthsBalanceRefetch();
        }
    }, [isOpen]);
    return (
        <>
            <Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton size={'lg'}/>
                    <DrawerHeader fontSize={'20px'}>Drawer</DrawerHeader>
                    <DrawerBody>
                        <Flex align={'center'} justify={'space-between'} mt={'20px'}>
                            <Heading size="xs">
                                Expenses and Goals
                            </Heading>
                            <Button size={'xs'} onClick={() => openModal('new')}>Novo</Button>
                        </Flex>
                        <Divider mt={'10px'} mb={'10px'}/>
                        <Stack divider={<StackDivider/>} spacing="4">
                            {
                                monthsBalanceLoading ?
                                    <Loading/> :
                                    monthsBalance && monthsBalance.length > 0 ? (
                                            monthsBalance?.map((month) => (
                                                    <Box key={month.date}>
                                                        <Flex justify={'space-between'} align={'center'} mb={'10px'}>
                                                            <Text fontSize={'14px'}>
                                                                {formatNumbersBalanceDate(month.date)}
                                                            </Text>
                                                            <Wrap gap={2}>
                                                                <WrapItem>
                                                                    <Tooltip label={'Ganhos'}>
                                                                        <Text fontSize={'12px'} as={'span'}
                                                                              color={'green.400'}>
                                                                            {currencyFormat(month.gains)}
                                                                        </Text>
                                                                    </Tooltip>
                                                                    <Text fontSize={'12px'} mx={'5px'} as={'span'}>-</Text>
                                                                    <Tooltip label={'Despesas'}>
                                                                        <Text fontSize={'12px'} as={'span'}
                                                                              color={'red.400'}>
                                                                            {currencyFormat(month.losses)}
                                                                        </Text>
                                                                    </Tooltip>
                                                                    <Text fontSize={'12px'} mx={'5px'} as={'span'}>=</Text>
                                                                    <Tooltip label={'Saldo Final'}>
                                                                        <Text fontSize={'12px'} as={'span'}
                                                                              color={getCurrencyColor(month.amount)}>
                                                                            {currencyFormat(month.amount)}
                                                                        </Text>
                                                                    </Tooltip>
                                                                </WrapItem>
                                                            </Wrap>
                                                        </Flex>
                                                        <GoalStack month={month}/>
                                                    </Box>
                                                )
                                            )) :
                                        <NoData message={'Sem despesas cadastradas'}/>
                            }
                        </Stack>
                        <Flex align={'center'} justify={'space-between'} mt={'30px'}>
                            <Heading size="xs">
                                Next notes
                            </Heading>
                        </Flex>
                        <Divider mt={'10px'} mb={'10px'}/>
                        <Stack divider={<StackDivider/>} spacing="4">
                            {notesLoading ? <Loading/> : notes && notes.length > 0 ? (
                                notes?.map((note) => (
                                    <NoteStack notes={note} key={note.id}/>
                                ))
                            ) : <NoData message={'Sem notas cadastradas'}/>}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {isOpenModal && goal.current &&
                <UpdateGoalModal goalId={goal.current} onClose={closeModal} isOpen={isOpenModal}/>}
        </>
    );
};

type GoalStackProps = {
    month: IExpensesByMonth
}
const GoalStack = ({month}: GoalStackProps) => {
    const {data: goal} = useQuery(['goal', month.date], () => apiGoalByDate(month.date).then(res => res.data));
    const [percentage, setPercentage] = useState<number>(0);
    useEffect(() => {
        if (goal) {
            const percentage = Math.abs(month.losses / goal.amount);
            const value = (percentage * 100);
            setPercentage(value);
        }
    }, [month, goal]);
    return (
        <>
            {goal ?
                <>
                    <Progress value={percentage} size="xs" colorScheme="gray"/>
                    <Text fontSize="13px" mt={'5px'}>
                        Your goal is not to spend more than <Text as={'span'}
                                                            color={getCurrencyColor(goal.amount)}>{currencyFormat(goal.amount)}</Text> — {percentage}%
                        reached.
                    </Text>
                </>
                :
                <Text fontSize="sm">
                    No goal set for this month.
                </Text>
            }
        </>
    );
};

type NoteStackProps = {
    notes: INote
}
const NoteStack = ({notes}: NoteStackProps) => {
    return (
        <>
            <Flex align={'center'} justify={'space-between'}>
                <Text fontSize={'14px'}>{notes.title}</Text>
                <Text fontSize={'14px'} color={'gray.400'}>{dayjs(notes.date).format('DD/MM/YYYY')}</Text>
            </Flex>
            <Text fontSize={'13px'}>{notes.description}</Text>
        </>
    );
};
export default DefaultDrawer;