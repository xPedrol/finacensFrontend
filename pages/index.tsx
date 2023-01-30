import {AuthProvider} from "../contexts/auth.context";
import DefaultLayout from "../components/Layout.component";
import Seo from "../components/Seo.component";
import {Box, Button, Flex, Grid, GridItem, Text} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {apiExpensesStatistic, apiMonthsBalance} from "../services/expenseStatistic.service";
import StatisticCard from "../components/StatisticCard.component";
import currentFormat from "../utils/currentFormat.utils";
import {
    MdOutlineAccountBalance,
    MdOutlineAttachMoney,
    MdOutlineMoneyOffCsred,
    MdOutlineStickyNote2
} from "react-icons/md";
import balance from "../utils/numbersBalance.utils";
import {apiCountNotes} from "../services/note.service";
import MyResponsiveBar from "../components/ChartTest.component";
import PageHeader from "../components/PageHeader.component";
import {useEffect, useState} from "react";
import {months} from "../utils/formatDate.utils";

export default function Home() {
    const [formattedData, setFormattedData] = useState<{ month: string, value: string }[]>([]);
    const {
        data: expensesStatistic,
    } = useQuery("expensesStatistic", () => apiExpensesStatistic().then((res) => res.data));
    const {
        data: noteCount
    } = useQuery("countNotes", () => apiCountNotes().then((res) => res.data));
    const {
        data: monthsBalance,
        refetch: refetchBalances,
        isLoading: isLoadingBalances,
        isRefetching: isRefetchingBalances
    } = useQuery("monthsBalance", () => apiMonthsBalance().then((res) => res.data));
    useEffect(() => {
        const aux: { month: string, value: string }[] = [];
        for (let i = 0; i < 12; i++) {
            if (monthsBalance && monthsBalance[i]) {
                aux.push({
                    month: months[i],
                    value: String(monthsBalance[i].amount)
                });
            } else {
                aux.push({
                    month: months[i],
                    value: '0'
                });
            }
        }
        setFormattedData(aux);
    }, [monthsBalance]);
    return (
        <>
            <DefaultLayout>
                <Seo title={"Dashboard"} description={"Dashboard page"}/>
                <Flex mt={'30px'}>
                    <Text as={'small'}>Valores referentes ao mês atual</Text>
                </Flex>
                <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={'30px'}>
                    {expensesStatistic &&
                        <>
                            <GridItem colSpan={{base: 12, md: 6, lg: 3}}>
                                <StatisticCard stat={currentFormat(expensesStatistic.gains)} status={'gain'}
                                               title={'Gains'}
                                               icon={MdOutlineAttachMoney}/>
                            </GridItem>
                            <GridItem colSpan={{base: 12, md: 6, lg: 3}}>
                                <StatisticCard stat={currentFormat(expensesStatistic.losses)} status={'loss'}
                                               title={'Loss'}
                                               icon={MdOutlineMoneyOffCsred}/>
                            </GridItem>
                            <GridItem colSpan={{base: 12, md: 6, lg: 3}}>
                                <StatisticCard
                                    stat={currentFormat(balance([expensesStatistic.gains, expensesStatistic.losses]))}
                                    status={balance([expensesStatistic.gains, expensesStatistic.losses]) < 0 ? 'loss' : 'gain'}title={'Balance'}
                                    icon={MdOutlineAccountBalance}/>
                            </GridItem>
                            <GridItem colSpan={{base: 12, md: 6, lg: 3}}>
                                <StatisticCard
                                    stat={noteCount?._count}
                                    status={'note'} title={'Notes'}
                                    icon={MdOutlineStickyNote2}/>
                            </GridItem>
                        </>
                    }
                </Grid>
                <PageHeader
                    title={"Gains and Losses"}
                    subtitle={"Gains and losses per months"}
                >
                    <Button
                        size={"sm"}
                        colorScheme={'gray'}
                        variant="outline"
                        onClick={() => refetchBalances()}
                        isLoading={isLoadingBalances || isRefetchingBalances}
                    >
                        Atualizar
                    </Button>
                </PageHeader>
                {formattedData && formattedData.length > 0 &&
                    <Box overflow={'auto'}>
                        <Flex ms={{base: 0,md: '100px'}} h={'400px'} flexDirection={{base: 'column'}}
                              minW={'1000px'}>
                            <MyResponsiveBar data={formattedData} keys={["value"]} indexBy={"month"}/>
                        </Flex>
                    </Box>
                }
            </DefaultLayout>
        </>
    );
}

Home.provider = AuthProvider;
