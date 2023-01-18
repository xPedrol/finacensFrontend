import {AuthProvider} from "../../contexts/auth.context";
import DefaultLayout from "../../components/Layout.component";
import DefaultTable from "../../components/Table.component";
import Seo from "../../components/Seo.component";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Divider,
    Flex, Grid, GridItem,
    Heading,
    Icon, Stack, Text,
    VStack
} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {apiExpenses} from "../../services/expense.service";
import Link from "next/link";
import Loading from "../../components/LoadingSpinner.component";
import NoData from "../../components/NoData.component";
import {AiOutlinePlus} from "react-icons/ai";
import PageHeader from "../../components/PageHeader.component";

const pageSubtitle = 'Organizar despesas permite que as pessoas tenham uma visão\n' +
    '                                    geral de onde\n' +
    '                                    estão gastando seu dinheiro, o que as ajuda a tomar decisões financeiras informadas e a\n' +
    '                                    alcançar seus objetivos financeiros.';
const pageBreadcrumb = [{title: 'Home', link: '/'}, {title: 'Expenses', link: '/expenses'}];
const pageButtons = [{
    title: 'Adicionar',
    link: '/expenses/new',
    colorSchema: 'blue',
    icon: AiOutlinePlus
}];
const Index = () => {
    const {data: query, isLoading, isFetched} = useQuery('expenses', apiExpenses);
    return (
        <DefaultLayout>
            <PageHeader title={'Expenses'} subtitle={pageSubtitle}
                        breadcrumb={pageBreadcrumb}
                        buttons={pageButtons}/>
            <Divider mb={'30px'}/>
            <Seo title={'Expenses'} description={'Expenses page'}/>
            {isLoading && <Loading/>}
            {isFetched && query?.data && query.data.length > 0 ? <DefaultTable/> : <NoData/>}
        </DefaultLayout>
    );
};
Index.provider = AuthProvider;
export default Index;