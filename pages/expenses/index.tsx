import {AuthProvider} from "../../contexts/auth.context";
import DefaultLayout from "../../components/Layout.component";
import DefaultTable from "../../components/Table.component";
import Seo from "../../components/Seo.component";
import {Button, Divider, Grid, GridItem, Stack, Tag, Td, Tr, useToast, Wrap, WrapItem} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {apiDeleteExpense, apiExpenses} from "../../services/expense.service";
import Link from "next/link";
import Loading from "../../components/LoadingSpinner.component";
import NoData from "../../components/NoData.component";
import {AiOutlinePlus} from "react-icons/ai";
import PageHeader from "../../components/PageHeader.component";
import {IExpense} from "../../models/Expense.model";
import dayjs from "dayjs";
import StatisticCard from "../../components/StatisticCard.component";
import {apiExpensesStatistic} from "../../services/expenseStatistic.service";
import {FiTrash} from "react-icons/fi";
import {FaRegPaperPlane} from "react-icons/fa";
import {useEffect} from "react";
import currentFormat from "../../utils/currentFormat.utils";
import {
    MdOutlineAccountBalance,
    MdOutlineAccountBalanceWallet,
    MdOutlineAttachMoney,
    MdOutlineMoneyOffCsred
} from "react-icons/md";
import balance from "../../utils/numbersBalance.utils";

const pageSubtitle =
    "Organizar despesas permite que as pessoas tenham uma visão\n" +
    "                                    geral de onde\n" +
    "                                    estão gastando seu dinheiro, o que as ajuda a tomar decisões financeiras informadas e a\n" +
    "                                    alcançar seus objetivos financeiros.";
const pageBreadcrumb = [
    {title: "Home", link: "/"},
    {title: "Expenses", link: "/expenses"},
];
const pageButtons = [
    {
        title: "Adicionar",
        link: "/expenses/new",
        colorSchema: "blue",
        icon: AiOutlinePlus,
    },
];
const tableColumns = [
    {title: "Value", key: "value"},
    {title: "Date", key: "date"},
    {title: "Category", key: "category"},
    {title: "Tag", key: "tag"},
    {title: "", key: "actions"},
];
const ExpenseIndex = () => {
    const {
        data: expenses,
        isLoading,
        isFetched,
        refetch: refetchExpenses,
    } = useQuery("expenses", () => apiExpenses().then((res) => res.data));
    const {
        data: expensesStatistic,
        refetch: refetchExpensesStatistic
    } = useQuery("expensesStatistic", () => apiExpensesStatistic().then((res) => res.data));
    const toast = useToast();
    const deleteExpense = (id: string) => {
        apiDeleteExpense(id).then((res) => {
            toast({
                title: "Expense deleted",
                description: "Expense deleted successfully",
                status: "success",
                isClosable: true,
            });
            refetchExpenses();
            refetchExpensesStatistic();
        }).catch((err) => {
            toast({
                title: "Error",
                description: "Error deleting expense",
                status: "error",
                isClosable: true,
            });
        });
    };
    useEffect(() => {

    }, [expensesStatistic]);
    return (
        <DefaultLayout>
            <PageHeader
                title={"Expenses"}
                subtitle={pageSubtitle}
                breadcrumb={pageBreadcrumb}
                buttons={pageButtons}
            />
            <Seo title={"Expenses"} description={"Expenses page"}/>
            <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={'30px'} mx={'auto'} w={'100%'} mt={'30px'} maxW={'6xl'}>
                {expensesStatistic &&
                    <>
                        <GridItem colSpan={4}>
                            <StatisticCard stat={currentFormat(expensesStatistic.gains)} status={'gain'} title={'Gains'}
                                           icon={MdOutlineAttachMoney}/>
                        </GridItem>
                        <GridItem colSpan={4}>
                            <StatisticCard stat={currentFormat(expensesStatistic.losses)} status={'loss'} title={'Loss'}
                                           icon={MdOutlineMoneyOffCsred}/>
                        </GridItem>
                        <GridItem colSpan={4}>
                            <StatisticCard
                                stat={currentFormat(balance([expensesStatistic.gains, -expensesStatistic.losses]))}
                                status={'balance'} title={'Balance'}
                                icon={MdOutlineAccountBalance}/>
                        </GridItem>
                    </>
                }
            </Grid>
            {isLoading ? <Loading/> : expenses && expenses.length > 0 ? (
                <DefaultTable columns={tableColumns} variant={"striped"}>
                    {expenses.map((expense: IExpense) => (
                        <Tr key={expense.id} fontSize={'15px'}>
                            <Td>{expense.amount.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}</Td>
                            <Td>
                                {expense ? dayjs(expense?.date)?.format("DD/MM/YYYY") : (
                                    <Tag colorScheme={"red"}>Não definido</Tag>
                                )}
                            </Td>
                            <Td textTransform={'capitalize'}>{expense.category}</Td>
                            <Td>
                                {expense.tag ?
                                    <Tag size={'md'} variant="solid" bg={expense.tag.color}>{expense.tag.name}</Tag> :
                                    <Tag colorScheme={"red"}>Não definido</Tag>}
                            </Td>
                            <Td>
                                <Wrap>
                                    <WrapItem>
                                        <Button
                                            fontWeight={500}
                                            colorScheme={"blue"}
                                            variant={"outline"}
                                            size={"sm"}
                                            href={`/expenses/${expense.id}`}
                                            as={Link}
                                        >
                                            <FaRegPaperPlane/>
                                        </Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button onClick={() => deleteExpense(expense.id as string)}
                                                fontWeight={500}
                                                colorScheme={"red"}
                                                variant={"outline"}
                                                size={"sm"}
                                        >
                                            <FiTrash/>
                                        </Button>
                                    </WrapItem>
                                </Wrap>
                            </Td>
                        </Tr>
                    ))}
                </DefaultTable>
            ) : (
                <NoData/>
            )}
        </DefaultLayout>
    );
};
ExpenseIndex.provider = AuthProvider;
export default ExpenseIndex;
