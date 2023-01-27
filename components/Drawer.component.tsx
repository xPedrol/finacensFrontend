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
    Tooltip, useDisclosure
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {apiMonthsBalance} from "../services/expenseStatistic.service";
import Loading from "./LoadingSpinner.component";
import {formatNumbersBalanceDate} from "../utils/formatDate.utils";
import currencyFormat, {getCurrencyColor} from "../utils/currentFormat.utils";
import UpdateGoalModal from "./UpdateGoalModal.component";
import {apiGoalByDate} from "../services/goal.service";

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
    useEffect(() => {
        if (isOpen) {
            monthsBalanceRefetch();
        }
    }, [isOpen]);
    return (
        <>
            <Drawer onClose={onClose} isOpen={isOpen} size={'md'}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton size={'lg'}/>
                    <DrawerHeader fontFamily={'Poppins'} fontSize={'24px'}>Visão Geral</DrawerHeader>
                    <DrawerBody>
                        <Alert status="info">
                            <AlertIcon/>
                            Aqui é possivel acompanhar cronologicamente as suas atividades e suas metas.
                        </Alert>
                        <Flex align={'center'} justify={'space-between'} mt={'20px'}>
                            <Heading size="sm" textTransform="uppercase">
                                Metas
                            </Heading>
                            <Button size={'xs'} onClick={() => openModal('new')}>Novo</Button>
                        </Flex>
                        <Divider mt={'10px'} mb={'10px'}/>
                        <Stack divider={<StackDivider/>} spacing="4">
                            {
                                monthsBalanceLoading ?
                                    <Loading/> : monthsBalance && monthsBalance?.map((month, index) => (
                                    <Box key={month.date}>
                                        <Flex justify={'space-between'} align={'center'} mb={'10px'}>
                                            <Text fontSize={'14px'}>
                                                {formatNumbersBalanceDate(month.date)}
                                            </Text>
                                            <Tooltip label={'Sua meta'}>
                                                <Text fontSize={'14px'}
                                                      color={month.amount > 0 ? 'green.400' : 'red.400'}>
                                                    {currencyFormat(month.amount)}
                                                </Text>
                                            </Tooltip>
                                        </Flex>
                                        <GoalStack date={month.date} expenseAmount={month.amount}/>
                                    </Box>
                                ))
                            }
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <UpdateGoalModal goalId={goal.current} onClose={closeModal} isOpen={isOpenModal}/>
        </>
    );
};

type GoalStackProps = {
    date: string;
    expenseAmount: number;
}
const GoalStack = ({date, expenseAmount}: GoalStackProps) => {
    const {data: goal} = useQuery(['goal', date], () => apiGoalByDate(date).then(res => res.data));
    const [percentage, setPercentage] = useState<number>(0);
    useEffect(() => {
        if (goal) {
            const percentage = expenseAmount / goal.amount;
            if (percentage < 0) {
                setPercentage(100);
            } else {
                const value = 100 - (percentage * 100);
                console.log(percentage)
                console.log(value)
                setPercentage(value);
            }
        }
    }, [goal]);
    return (
        <>
            {goal ?
                <>
                    <Tooltip label={'20% da meta foi gasta'}>
                        <Progress value={percentage} size="xs" colorScheme="pink"/>
                    </Tooltip>
                    <Text fontSize="sm" mt={'5px'}>
                        Sua meta é gastar até <Text as={'span'}
                                                  color={getCurrencyColor(goal.amount)}>{currencyFormat(goal.amount)}</Text>. {percentage.toFixed(2)}% da meta foi gasta.
                    </Text>
                </>
                :
                <Text fontSize="sm">
                    Você não tem uma meta para este mês
                </Text>
            }
        </>
    );
};
export default DefaultDrawer;