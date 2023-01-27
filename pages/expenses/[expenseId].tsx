import {AuthProvider} from "../../contexts/auth.context";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {apiCreateExpense, apiExpense, apiUpdateExpense,} from "../../services/expense.service";
import {useQuery} from "react-query";
import DefaultLayout from "../../components/Layout.component";
import Seo from "../../components/Seo.component";

import {useToast,} from "@chakra-ui/react";
import {BsArrowLeft} from "react-icons/bs";
import PageHeader from "../../components/PageHeader.component";
import {EnumCategory} from "../../enum/Category.enum";
import UpdateExpenseForm from "../../components/UpdateExpenseForm.component";
import {useForm} from "react-hook-form";

const pageBreadcrumb = [
    {title: "Home", link: "/"},
    {title: "Expenses", link: "/expenses"},
    {
        title: "New",
        link: "/expenses/[id]",
    },
];
const pageButtons = [
    {
        title: "Back",
        link: "/expenses",
        colorSchema: "blue",
        icon: BsArrowLeft,
    },
];

type FormData = {
    amount: number;
    tagId: string;
    description: string;
    date: string;
    category: EnumCategory;
};
const ExpensesUpdate = () => {
    const router = useRouter();

    const [creating, setCreating] = useState<boolean>(true);

    const form = useForm<FormData>();
    const toast = useToast();
    const {
        data: expense,
        isLoading: expenseLoading,
        isFetched: expenseFetched,
    } = useQuery(
        ["expense", router.query?.expenseId],
        () => apiExpense(router.query?.expenseId as string).then((res) => res.data),
        {
            enabled: !creating,
            onSuccess: (data) => {

            },
        }
    );

    const onSubmit = async (data: FormData) => {
        let request =
            !creating && router.query?.expenseId
                ? apiUpdateExpense(router.query.id as string, data as any)
                : apiCreateExpense(data as any);
        request
            .then(() => {
                router.push("/expenses").then(() =>
                    toast({
                        title: `Expense ${creating ? "created" : "updated"} successfully`,
                        status: "success",
                        isClosable: true,
                    })
                );
            })
            .catch(() => {
                toast({
                    title: "Something went wrong. Please try again later.",
                    status: "error",
                    isClosable: true,
                });
            });
    };
    useEffect(() => {
        if (router.query.expenseId && router.query.expenseId !== "new") {
            setCreating(false);
        } else {
            setCreating(true);
        }
    }, []);

    return (
        <DefaultLayout>
            <Seo
                title={creating ? "New Expense" : "Update Expense"}
                description={"Update Expenses page"}
            />
            <PageHeader
                title={"Expenses"}
                breadcrumb={pageBreadcrumb}
                buttons={pageButtons}
            />
             {/*@ts-ignore*/}
            <UpdateExpenseForm expense={expense} form={form} creating={creating}/>

        </DefaultLayout>
    );
};
ExpensesUpdate.provider = AuthProvider;
export default ExpensesUpdate;
