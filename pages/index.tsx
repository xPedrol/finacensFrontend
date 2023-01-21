import {AuthProvider, useAuth} from "../contexts/auth.context";
import DefaultLayout from "../components/Layout.component";
import Seo from "../components/Seo.component";
import {Box, Container, Divider, Flex, Grid, GridItem, Stack, Text, useToast} from "@chakra-ui/react";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import HomeCards from "../components/HomeCards.component";
import Statistics from "../components/Statistics.component";
import {useQuery} from "react-query";
import {apiExpensesStatistic} from "../services/expenseStatistic.service";
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

export default function Home() {
    const {
        data: expensesStatistic,
        refetch: refetchExpensesStatistic
    } = useQuery("expensesStatistic", () => apiExpensesStatistic().then((res) => res.data));
    const {
        data: noteCount
    } = useQuery("countNotes", () => apiCountNotes().then((res) => res.data));
    return (
        <>
            <DefaultLayout>
                <Seo title={"Dashboard"} description={"Dashboard page"}/>
                <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={'30px'} mx={'auto'} w={'100%'} mt={'30px'}
                      maxW={'6xl'}>
                    {expensesStatistic &&
                        <>
                            <GridItem colSpan={{base:12,md:6,lg:3}}>
                                <StatisticCard stat={currentFormat(expensesStatistic.gains)} status={'gain'}
                                               title={'Gains'}
                                               icon={MdOutlineAttachMoney}/>
                            </GridItem>
                            <GridItem colSpan={{base:12,md:6,lg:3}}>
                                <StatisticCard stat={currentFormat(expensesStatistic.losses)} status={'loss'}
                                               title={'Loss'}
                                               icon={MdOutlineMoneyOffCsred}/>
                            </GridItem>
                            <GridItem colSpan={{base:12,md:6,lg:3}}>
                                <StatisticCard
                                    stat={currentFormat(balance([expensesStatistic.gains, -expensesStatistic.losses]))}
                                    status={'balance'} title={'Balance'}
                                    icon={MdOutlineAccountBalance}/>
                            </GridItem>
                            <GridItem colSpan={{base:12,md:6,lg:3}}>
                                <StatisticCard
                                    stat={noteCount?._count}
                                    status={'note'} title={'Notes'}
                                    icon={MdOutlineStickyNote2}/>
                            </GridItem>
                        </>
                    }
                </Grid>
                <Flex justifyContent={"center"} flexDirection={"column"}>
                    <HomeCards/>
                    {/*<Statistics />*/}
                </Flex>
            </DefaultLayout>
        </>
    );
}

Home.provider = AuthProvider;
