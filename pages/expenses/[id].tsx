import {AuthProvider} from "../../contexts/auth.context";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {apiExpense} from "../../services/expense.service";
import {useQuery} from "react-query";
import DefaultLayout from "../../components/Layout.component";
import Seo from "../../components/Seo.component";
import {
    Box,
    Button,
    Divider, Flex,
    FormControl, FormErrorMessage,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup, InputLeftAddon,
    Select, Textarea
} from "@chakra-ui/react";
import {BsArrowLeft} from "react-icons/bs";
import PageHeader from "../../components/PageHeader.component";
import {useForm} from "react-hook-form";

const pageBreadcrumb = [
    {title: 'Home', link: '/'},
    {title: 'Expenses', link: '/expenses'},
    {
        title: 'New',
        link: '/expenses/[id]'
    }
];
const pageButtons = [{
    title: 'Voltar',
    link: '/expenses',
    colorSchema: 'blue',
    icon: BsArrowLeft
}];

type FormData = {
    amount: number;
    category: string;
    description: string;
    date: string;
}
const ExpensesUpdate = () => {
    const router = useRouter();
    const [creating, setCreating] = useState<boolean>(true);
    const {
        data,
        isLoading,
        isFetched
    } = useQuery(['expenses', router.query?.id], () => apiExpense(router.query?.id as string), {
        enabled: !creating
    });
    const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>();
    const onSubmit = (data: FormData) => console.log(data);
    useEffect(() => {
        if (router.query.id !== 'new') {
            setCreating(false);
        }
    }, []);
    return (
        <DefaultLayout>
            <Seo title={creating ? 'New Expense' : 'Update Expense'} description={'Update Expenses page'}/>
            <PageHeader title={'Expenses'}
                        breadcrumb={pageBreadcrumb}
                        buttons={pageButtons}/>
            <Divider mb={'30px'}/>
            <Box as={'form'} onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    <GridItem colSpan={{base:12,md:4}}>
                        <FormControl isInvalid={!!errors.amount}>
                            <FormLabel>Amount</FormLabel>
                            <InputGroup size={'lg'}>
                                {/* eslint-disable-next-line react/no-children-prop */}
                                <InputLeftAddon children="R$"/>
                                <Input type="number" {...register("amount", {required: true})}/>
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base:12,md:4}}>
                        <FormControl isInvalid={!!errors.date}>
                            <FormLabel>Date</FormLabel>
                            <InputGroup size={'lg'}>
                                {/* eslint-disable-next-line react/no-children-prop */}
                                <Input type="date" {...register("date", {required: true})}/>
                            </InputGroup>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{base:12,md:4}}>
                        <FormControl isInvalid={!!errors.category}>
                            <FormLabel>Category</FormLabel>
                            <Select size={'lg'} {...register("category", {required: true})}></Select>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <FormControl isInvalid={!!errors.category}>
                            <FormLabel>Description</FormLabel>
                            <Textarea rows={5} placeholder='Here is a sample description of the expensee' />
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={12} as={Flex} justifyContent={'flex-end'}>
                        <Button colorScheme="blue" size="md" type={'submit'}>
                            Salvar
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
        </DefaultLayout>
    );
};
ExpensesUpdate.provider = AuthProvider;
export default ExpensesUpdate;