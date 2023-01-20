import {AuthProvider} from "../../contexts/auth.context";
import DefaultLayout from "../../components/Layout.component";
import DefaultTable from "../../components/Table.component";
import Seo from "../../components/Seo.component";
import {Button, Divider, Grid, GridItem, Tag, Td, Tr} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {apiExpenses} from "../../services/expense.service";
import Link from "next/link";
import {Link as ChakraLink} from "@chakra-ui/react";
import Loading from "../../components/LoadingSpinner.component";
import NoData from "../../components/NoData.component";
import {AiOutlinePlus} from "react-icons/ai";
import PageHeader from "../../components/PageHeader.component";
import {IExpense} from "../../models/Expense.model";
import dayjs from "dayjs";
import ExpenseCard from "../../components/ExpenseCard.component";

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
    {title: "Valor", key: "value"},
    {title: "Data", key: "date"},
    {title: "Categoria", key: "category"},
    {title: "", key: "actions"},
];
const Index = () => {
    const {
        data: expenses,
        isLoading,
        isFetched,
    } = useQuery("expenses", apiExpenses);
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
            <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={'30px'}>
                <GridItem colSpan={{base: 12, lg: 12}}>
                    <ExpenseCard/>
                </GridItem>
            </Grid>
            {isLoading && <Loading/>}
            {!isLoading && expenses?.data && expenses.data.length > 0 ? (
                <DefaultTable columns={tableColumns} variant={"striped"}>
                    {expenses.data.map((expense: IExpense) => (
                        <Tr key={expense.id} fontSize={'15px'}>
                            <Td>R$ {expense?.amount}</Td>
                            <Td>
                                {expense ? dayjs(expense?.date)?.format("DD/MM/YYYY") : (
                                    <Tag colorScheme={"red"}>Não definido</Tag>
                                )}
                            </Td>
                            <Td>{expense?.category?.name}</Td>
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
