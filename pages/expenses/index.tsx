import {AuthProvider} from "../../contexts/auth.context";
import DefaultLayout from "../../components/Layout.component";
import DefaultTable from "../../components/Table.component";
import Seo from "../../components/Seo.component";
import styles from "../../styles/Pagination.module.scss";
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Icon,
    Select,
    Tag,
    Td,
    Tr,
    useDisclosure,
    useToast,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {apiDeleteExpense, apiExpenses} from "../../services/expense.service";
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
import {useEffect, useRef, useState} from "react";
import currentFormat from "../../utils/currentFormat.utils";
import {MdOutlineAccountBalance, MdOutlineAttachMoney, MdOutlineMoneyOffCsred} from "react-icons/md";
import balance from "../../utils/numbersBalance.utils";
import UpdateExpenseModal from "../../components/UpdateExpenseModal.component";
import ReactPaginate from "react-paginate";

const pageSubtitle =
    "Organizar despesas permite que as pessoas tenham uma visão\n" +
    "                                    geral de onde\n" +
    "                                    estão gastando seu dinheiro, o que as ajuda a tomar decisões financeiras informadas e a\n" +
    "                                    alcançar seus objetivos financeiros.";
const pageBreadcrumb = [
    {title: "Home", link: "/"},
    {title: "Expenses", link: "/expenses"},
];

const tableColumns = [
    {title: "Value", key: "value"},
    {title: "Date", key: "date"},
    {title: "Tag", key: "tag"},
    {title: "", key: "actions"},
];
const ExpenseIndex = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [options, setOptions] = useState<{ label: string, value: string }[]>([]);
    const period = useRef<string>('');
    const openModal = (id: string) => {
        expenseId.current = id;
        onOpen();
    };
    const onCloseModal = (props?: any) => {
        onClose();
        expenseId.current = null;
        if (props?.success) {
            refetchExpenses();
            refetchExpensesStatistic();
        }
    };
    const {
        data: expenses,
        isLoading,
        isFetched,
        refetch: refetchExpenses,
    } = useQuery(["expenses"], () => apiExpenses(period.current).then((res) => res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        enabled: false,
    });
    const expenseId = useRef<string | null>(null);
    const {
        data: expensesStatistic,
        refetch: refetchExpensesStatistic
    } = useQuery(["expensesStatistic"], () => apiExpensesStatistic(period.current).then((res) => res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        enabled: false,
    });
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
        const year = dayjs().year();
        const newOptions = [];
        if (options.length === 0) {
            for (let i = 0; i < 12; i++) {
                const month = String(i + 1).padStart(2, "0");
                newOptions.push({
                    label: `${month}/${year}`,
                    value: `${i + 1}-01-${year}`
                });
            }
        } else {
            newOptions.push(...options);
        }
        if (!period.current) {
            period.current = (`${dayjs().month() + 1}-01-${dayjs().year()}`);
        }
        setOptions(newOptions);
        refetchExpenses();
        refetchExpensesStatistic();
    }, []);
    const onPeriodChange = (nPeriod: string) => {
        period.current = nPeriod;
        refetchExpenses();
        refetchExpensesStatistic();
    };
    return (
        <DefaultLayout>
            <PageHeader
                title={"Expenses"}
                subtitle={pageSubtitle}
                breadcrumb={pageBreadcrumb}
                buttons={undefined}
            >
                <Button
                    onClick={() => openModal('new')}
                    size={"sm"}
                    colorScheme={'blue'}
                    variant="outline"
                >
                    <Icon boxSize={"18px"} me={"5px"} as={AiOutlinePlus}></Icon>
                    Adicionar
                </Button>
            </PageHeader>
            <Seo title={"Expenses"} description={"Expenses page"}/>
            <Flex justify={'center'} align={'center'}>
                <Select maxW={'xl'} placeholder={'Select a date...'} value={period.current}
                        onChange={(e) => onPeriodChange(e.target.value)}
                        variant="filled">
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </Flex>
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
                                stat={currentFormat(balance([expensesStatistic.gains, expensesStatistic.losses]))}
                                status={balance([expensesStatistic.gains, expensesStatistic.losses]) < 0 ? 'loss' : 'gain'}
                                title={'Balance'}
                                icon={MdOutlineAccountBalance}/>
                        </GridItem>
                    </>
                }
            </Grid>
            {isLoading ? <Loading/> : expenses && expenses.length > 0 ? (
                <>
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
                                <Td>
                                    {expense.tag ?
                                        <Tag size={'md'} variant="solid" bg={expense.tag.color}>{expense.tag.name}</Tag> :
                                        <Tag colorScheme={"red"}>Não definido</Tag>}
                                </Td>
                                <Td>
                                    <Wrap>
                                        <WrapItem>
                                            {/*<Button*/}
                                            {/*    fontWeight={500}*/}
                                            {/*    colorScheme={"blue"}*/}
                                            {/*    variant={"outline"}*/}
                                            {/*    size={"sm"}*/}
                                            {/*    href={`/expenses/${expense.id}`}*/}
                                            {/*    as={Link}*/}
                                            {/*>*/}
                                            {/*    <FaRegPaperPlane/>*/}
                                            {/*</Button>*/}

                                            <Button
                                                fontWeight={500}
                                                colorScheme={"blue"}
                                                variant={"outline"}
                                                size={"sm"}
                                                onClick={() => openModal(expense.id as string)}
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
                    <Flex mt={'20px'} justify={'flex-end'}>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            pageRangeDisplayed={5}
                            pageCount={5}
                            previousLabel={'Previous'}
                            pageClassName={styles.pageItem}
                            pageLinkClassName={styles.pageLink}
                            previousClassName={styles.pageItem}
                            previousLinkClassName={styles.pageLink}
                            nextClassName={styles.pageItem}
                            nextLinkClassName={styles.pageLink}
                            breakClassName={styles.pageItem}
                            breakLinkClassName={styles.pageLink}
                            containerClassName={styles.pagination}
                            activeClassName={styles.active}
                            renderOnZeroPageCount={null}
                        />
                    </Flex>
                </>
            ) : (
                <NoData/>
            )}
            <UpdateExpenseModal expenseId={expenseId.current} onClose={onCloseModal} isOpen={isOpen}/>
        </DefaultLayout>
    );
};
ExpenseIndex.provider = AuthProvider;
export default ExpenseIndex;
