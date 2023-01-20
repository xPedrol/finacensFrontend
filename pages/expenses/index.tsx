import {AuthProvider} from "../../contexts/auth.context";
import DefaultLayout from "../../components/Layout.component";
import DefaultTable from "../../components/Table.component";
import Seo from "../../components/Seo.component";
import {Button, Divider, Grid, GridItem, Tag, Td, Tr} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {apiExpenses} from "../../services/expense.service";
import Link from "next/link";
import Loading from "../../components/LoadingSpinner.component";
import NoData from "../../components/NoData.component";
import {AiOutlinePlus} from "react-icons/ai";
import PageHeader from "../../components/PageHeader.component";
import {IExpense} from "../../models/Expense.model";
import dayjs from "dayjs";
import ExpenseCard from "../../components/ExpenseCard.component";
import {apiExpensesStatistic} from "../../services/expenseStatistic.service";

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
const Index = () => {
    const {
        data: expenses,
        isLoading,
        isFetched,
    } = useQuery("expenses", () => apiExpenses().then((res) => res.data));
    const {data: expensesStatistic} = useQuery("expensesStatistic", () => apiExpensesStatistic().then((res) => res.data));
    return (
        <DefaultLayout>
            <PageHeader
                title={"Expenses"}
                subtitle={pageSubtitle}
                breadcrumb={pageBreadcrumb}
                buttons={pageButtons}
            />
            <Divider mb={"30px"}/>
            <Seo title={"Expenses"} description={"Expenses page"}/>
            <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={'30px'} mx={'auto'} w={'100%'}>
                <GridItem colSpan={12}>
                    {expensesStatistic &&
                        <ExpenseCard gains={expensesStatistic.gains} losses={expensesStatistic.losses}/>}
                </GridItem>
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
                                <Button
                                    fontWeight={500}
                                    colorScheme={"blue"}
                                    variant={"outline"}
                                    size={"xs"}
                                    href={`/expenses/${expense.id}`}
                                    as={Link}
                                >
                                    Acessar
                                </Button>
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
Index.provider = AuthProvider;
export default Index;
