import {IExpensesGroup} from "../models/ExpensesGroup.model";
import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text
} from "@chakra-ui/react";
import {formatNumbersBalanceDate} from "../utils/formatDate.utils";
import currentFormat from "../utils/currentFormat.utils";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import {DATE_OUTPUT_FORMAT, DATE_TIME_OUTPUT_FORMAT} from "../const/date.const";
import {getStatusColor} from "../utils/handleColor.utils";
import {FaRegPaperPlane} from "react-icons/fa";
import {FiTrash} from "react-icons/fi";

type ExpensesDetailedViewProps = {
    expensesGroup: IExpensesGroup[]
    openModal: (id: string) => void
    deleteExpense: (id: string) => void
}
const ExpensesDetailedView = ({expensesGroup,openModal,deleteExpense}: ExpensesDetailedViewProps) => {
    return (
        <div>
            {expensesGroup.map((group) => (
                <Box key={group.date}>
                    <Text>{formatNumbersBalanceDate(group.date)}</Text>
                    <Divider/>
                    <Grid templateColumns={'repeat(12,1fr)'} gap={4} my={'20px'}>
                        {group.expenses.map((expense) => (
                            <GridItem key={expense.id} colSpan={{base: 12,sm:6, md: 3, lg: 2}}>
                                <Stat>
                                    <StatLabel>
                                        <Flex justifyContent={'space-between'} alignItems={'center'}>
                                            <Text>{expense.tag?.name ?? '---'}</Text>
                                            <Box>
                                                <Button
                                                    fontWeight={500}
                                                    colorScheme={"gray"}
                                                    variant={"ghost"}
                                                    size={"xs"}
                                                    onClick={() => openModal(expense.id as string)}
                                                >
                                                    <FaRegPaperPlane/>
                                                </Button>
                                                <Button onClick={() => deleteExpense(expense.id as string)}
                                                        fontWeight={500}
                                                        colorScheme={"red"}
                                                        variant={"ghost"}
                                                        size={"xs"}
                                                >
                                                    <FiTrash/>
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </StatLabel>
                                    <StatNumber fontSize={'20px'}
                                                color={getStatusColor(expense.amount)}>{currentFormat(expense.amount)}</StatNumber>
                                    <StatHelpText
                                        fontSize={'12px'}>{dayjs(expense.date).utc().format(DATE_OUTPUT_FORMAT)}</StatHelpText>
                                </Stat>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            ))}
        </div>
    );
};

export default ExpensesDetailedView;