import {AuthProvider} from "../../contexts/auth.context";
import DefaultLayout from "../../components/Layout.component";
import DefaultTable from "../../components/Table.component";
import Seo from "../../components/Seo.component";
import styles from "../../styles/Pagination.module.scss";
import {
    Button,
    Flex,
    Grid,
    GridItem, Icon,
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
import {apiDeleteExpense, apiExpenseCount, apiExpenses} from "../../services/expense.service";
import Loading from "../../components/LoadingSpinner.component";
import NoData from "../../components/NoData.component";
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
import {useRouter} from "next/router";
import InfoModal from "../../components/InfoModal.component";
import {AiOutlineInfoCircle} from "react-icons/ai";
import AlertModal from "../../components/AlertModal.component";
import {pageCount} from "../../utils/pagination.utils";

const info = "Ao organizar suas despesas, as pessoas ganham uma visão clara e detalhada de onde estão gastando seu dinheiro, o que lhes permite tomar decisões financeiras conscientes e bem informadas. Isso é crucial para alcançar metas financeiras, controlar gastos e manter a saúde financeira. Além disso, ao acompanhar suas despesas, é possível identificar áreas onde é possível economizar e fazer ajustes para atingir seus objetivos financeiros de maneira mais eficiente.";

const tableColumns = [
    {title: "Value", key: "value"},
    {title: "Date", key: "date"},
    {title: "Tag", key: "tag"},
    {title: "", key: "actions"},
];
const ExpenseIndex = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isOpen: isAlertModalOpen, onOpen: onAlertModalOpen, onClose: onAlertModalClose} = useDisclosure();
    const {isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose} = useDisclosure();
    const router = useRouter();
    const [options, setOptions] = useState<{ label: string, value: string }[]>([]);
    const period = useRef<string>('');
    const page = useRef<number>(router.query.page ? Number(router.query.page) : 0);
    const selectedExpense = useRef<string | null>(null);
    const openModal = (id: string) => {
        expenseId.current = id;
        onOpen();
    };
    const closeAlertModal = (next: any) => {
        if (next === true && selectedExpense.current) {
            apiDeleteExpense(selectedExpense.current).then((res) => {
                toast({
                    title: "Expense deleted",
                    description: "Expense deleted successfully",
                    status: "success",
                    isClosable: true,
                });
                refetchExpenses();
                refetchExpensesStatistic();
                onAlertModalClose();
                selectedExpense.current = null;
            }).catch(() => {
                toast({
                    title: "Error",
                    description: "Error deleting expense",
                    status: "error",
                    isClosable: true,
                });
            });
        } else {
            onAlertModalClose();
            selectedExpense.current = null;
        }
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
        data: expensesTotalPages,
        refetch: refetchExpensesCount
    } = useQuery(["expensesCount"], () => apiExpenseCount({
        date: period.current,
    }).then((res) => res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        enabled: false,
    });
    const {
        data: expenses,
        isLoading,
        isFetched,
        refetch: refetchExpenses,
    } = useQuery(["expenses"], () => apiExpenses({
        date: period.current,
        page: page.current
    }).then((res) => res.data), {
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
    } = useQuery(["expensesStatisticByMonth"], () => apiExpensesStatistic({
        date: period.current,
    }).then((res) => res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        enabled: false,
    });
    const toast = useToast();
    const deleteExpense = (id: string) => {
        selectedExpense.current = id;
        onAlertModalOpen();
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
        refetchExpensesCount();
        refetchExpensesStatistic();
    }, []);
    useEffect(() => {
        if (router.query.page && page.current !== Number(router.query.page)) {
            page.current = Number(router.query.page);
            refetchExpenses();
            refetchExpensesCount();
        }
    }, [router.query]);
    const onPeriodChange = (nPeriod: string) => {
        period.current = nPeriod;
        refetchExpenses();
        refetchExpensesCount();
        refetchExpensesStatistic();
    };
    const handlePageClick = (event: any) => {
        if (event.selected === page.current) return;
        router.push({
            pathname: '/expenses',
            query: {page: event.selected},
        }, undefined, {shallow: true});
    };


    return (
        <DefaultLayout>
            <PageHeader
                title={"Expenses"}
                subtitle={expensesTotalPages ? `${expensesTotalPages} records` : ''}
            >
                <Button
                    onClick={() => openModal('new')}
                    size={"sm"}
                    colorScheme={'gray'}
                    variant="outline"
                >
                    Adicionar
                </Button>
                <Button size={"sm"}
                        colorScheme={'gray'} onClick={onInfoModalOpen}
                        variant="ghost">
                    <Icon as={AiOutlineInfoCircle} boxSize={'17px'}/>
                </Button>
            </PageHeader>
            <Seo title={"Expenses"} description={"Expenses page"}/>
            <Flex justify={'flex-end'} align={'center'}>
                <Select maxW={'xl'} placeholder={'Select a date...'} value={period.current}
                        onChange={(e) => onPeriodChange(e.target.value)}
                        variant="outline">
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </Flex>

            <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={'30px'} mx={'auto'} w={'100%'} mt={'30px'}>
                {expensesStatistic &&
                    <>
                        <GridItem colSpan={{base: 12, md: 6, lg: 4}}>
                            <StatisticCard stat={currentFormat(expensesStatistic.gains)} status={'gain'}
                                           title={'Gains'}
                                           icon={MdOutlineAttachMoney}/>
                        </GridItem>
                        <GridItem colSpan={{base: 12, md: 6, lg: 4}}>
                            <StatisticCard stat={currentFormat(expensesStatistic.losses)} status={'loss'}
                                           title={'Loss'}
                                           icon={MdOutlineMoneyOffCsred}/>
                        </GridItem>
                        <GridItem colSpan={{base: 12, md: 6, lg: 4}}>
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
                    <DefaultTable columns={tableColumns} variant={"simple"}>
                        {expenses.map((expense: IExpense) => (
                            <Tr key={expense.id} fontSize={'15px'}>
                                <Td color={expense.amount > 0 ? 'green.400' : 'red.400'}>{Math.abs(expense.amount).toLocaleString('pt-BR', {
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
                                        <Tag size={'md'} variant="solid"
                                             bg={expense.tag.color}>{expense.tag.name}</Tag> :
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
                                                colorScheme={"gray"}
                                                variant={"ghost"}
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
                                                    variant={"ghost"}
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
                </>
            ) : (
                <NoData/>
            )}
            {typeof expensesTotalPages === 'number' && (
                <Flex mt={'20px'} justify={{base: 'center', sm: 'flex-end'}}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        pageRangeDisplayed={3}
                        pageCount={pageCount(expensesTotalPages)}
                        forcePage={page.current}
                        previousLabel={'Previous'}
                        pageClassName={styles.pageItem}
                        pageLinkClassName={styles.pageLink}
                        previousClassName={styles.pageItem}
                        previousLinkClassName={styles.pageLink}
                        nextClassName={styles.pageItem}
                        nextLinkClassName={styles.pageLink}
                        breakClassName={styles.pageItem}
                        breakLinkClassName={styles.pageLink}
                        containerClassName={`${styles.pagination} ${styles.paginationSm}`}
                        activeClassName={styles.active}
                        onPageChange={handlePageClick}
                        // @ts-ignore
                        renderOnZeroPageCount={null}
                    />
                </Flex>
            )}
            <UpdateExpenseModal expenseId={expenseId.current} onClose={onCloseModal} isOpen={isOpen}/>
            <InfoModal info={info} title={'Expenses'} isOpen={isInfoModalOpen} onClose={onInfoModalClose}/>
            <AlertModal title={'Delete Note'} isOpen={isAlertModalOpen} onClose={closeAlertModal}/>
        </DefaultLayout>
    );
};
ExpenseIndex.provider = AuthProvider;
export default ExpenseIndex;
