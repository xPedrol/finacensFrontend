import DefaultLayout from "../../components/Layout.component";
import PageHeader from "../../components/PageHeader.component";
import {Button, Flex, Icon, Tag, Td, Tr, useDisclosure, useToast, Wrap, WrapItem} from "@chakra-ui/react";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {useQuery} from "react-query";
import {AuthProvider} from "../../contexts/auth.context";
import {apiDeleteTag, apiTagCount, apiTags} from "../../services/tag.service";
import {useEffect, useRef} from "react";
import {useRouter} from "next/router";
import Loading from "../../components/LoadingSpinner.component";
import DefaultTable from "../../components/Table.component";
import {ITag} from "../../models/Tag.model";
import {FaRegPaperPlane} from "react-icons/fa";
import {FiTrash} from "react-icons/fi";
import NoData from "../../components/NoData.component";
import ReactPaginate from "react-paginate";
import {pageCount} from "../../utils/pagination.utils";
import styles from "../../styles/Pagination.module.scss";
import AlertModal from "../../components/AlertModal.component";
import InfoModal from "../../components/InfoModal.component";
import UpdateTagModal from "../../components/UpdateTagModal.component";
import dayjs from "dayjs";
import {DATE_TIME_OUTPUT_FORMAT} from "../../const/date.const";
import Seo from "../../components/Seo.component";

const info = "As tags são elementos de marcação que são usados para identificar e categorizar informações em diversos contextos. Em finanças, por exemplo, as tags podem ser usadas para rotular transações financeiras, categorizar gastos ou identificar ativos financeiros. Essas tags ajudam a organizar e facilitar a análise de dados financeiros, permitindo uma visão mais clara e precisa das finanças de uma empresa ou indivíduo.";

const tableColumns = [
    {title: "Name", key: "title"},
    {title: "CreateAt", key: "createdAt"},
    {title: "Description", key: "description"},
    {title: "", key: "actions"},
];
const TagIndex = () => {
    const router = useRouter();
    const {isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose} = useDisclosure();
    const {
        isOpen: isTagModalOpen,
        onOpen: onTagModalOpen,
        onClose: onTagModalClose
    } = useDisclosure();
    const page = useRef<number>(router.query.page ? Number(router.query.page) : 0);
    const selectedTag = useRef<ITag | null>(null);
    const toast = useToast();
    const {isOpen: isAlertModalOpen, onOpen: onAlertModalOpen, onClose: onAlertModalClose} = useDisclosure();
    const closeAlertModal = (next: any) => {
        if (next === true && selectedTag.current) {
            apiDeleteTag(selectedTag.current?.id as string).then((res) => {
                toast({
                    title: "Tag deleted",
                    description: "Tag deleted successfully",
                    status: "success",
                    isClosable: true,
                });
                refetchTags();
                refetchTagsCount();
                onAlertModalClose();
                selectedTag.current = null;
            }).catch((err) => {
                if (err.response && err.response.data && err.response.data.showError) {
                    toast({
                        title: "Error",
                        description: err.response.data.message,
                        status: "error",
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Error deleting tag",
                        status: "error",
                        isClosable: true,
                    });
                }
            });
        } else {
            onAlertModalClose();
            selectedTag.current = null;
        }
    };
    const {
        data: tagsTotalPages,
        refetch: refetchTagsCount
    } = useQuery(["tagsCount"], () => apiTagCount().then((res) => res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        enabled: false,
    });
    const {
        data: tags,
        isLoading,
        isFetched,
        refetch: refetchTags,
    } = useQuery(["tags"], () => apiTags({
        page: page.current
    }).then((res) => res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        enabled: false,
    });

    const openTagModal = (tag: ITag) => {
        selectedTag.current = tag as ITag;
        onTagModalOpen();
    };
    const closeTagModal = (props?: any) => {
        onTagModalClose();
        selectedTag.current = null;
        if (props?.success) {
            refetchTags();
            refetchTagsCount();
        }
    };
    const deleteTag = (id: string) => {
        selectedTag.current = {id} as ITag;
        onAlertModalOpen();
    };
    const handlePageClick = (event: any) => {
        if (event.selected === page.current) return;
        router.push({
            pathname: '/tags',
            query: {page: event.selected},
        }, undefined, {shallow: true});
    };
    useEffect(() => {
        refetchTags();
        refetchTagsCount();
    }, []);
    useEffect(() => {
        if (router.query.page && page.current !== Number(router.query.page)) {
            page.current = Number(router.query.page);
            refetchTags();
            refetchTagsCount();
        }
    }, [router.query]);
    return (
        <DefaultLayout>
            <Seo title={"Tags"} description={"Tags page"}/>
            <PageHeader
                title={"Tags"}
                subtitle={tagsTotalPages ? `${tagsTotalPages} records` : ''}
            >
                <Button
                    onClick={() => openTagModal({id: 'new'} as ITag)}
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

            {isLoading ? <Loading/> : tags && tags.length > 0 ? (
                <>
                    <DefaultTable columns={tableColumns} variant={"simple"}>
                        {tags.map((tag: ITag) => (
                            <Tr key={tag.id} fontSize={'15px'}>
                                <Td borderLeft={'5px solid'} borderLeftColor={tag.color}>
                                    <Tag size={'md'} variant="subtle">{tag.name}</Tag>
                                </Td>
                                <Td>
                                    {dayjs(tag.createdAt).format(DATE_TIME_OUTPUT_FORMAT)}
                                </Td>
                                <Td>
                                    {tag.description}
                                </Td>
                                <Td>
                                    <Wrap>
                                        <WrapItem>
                                            {/*<Button*/}
                                            {/*    fontWeight={500}*/}
                                            {/*    colorScheme={"blue"}*/}
                                            {/*    variant={"outline"}*/}
                                            {/*    size={"sm"}*/}
                                            {/*    href={`/tags/${tag.id}`}*/}
                                            {/*    as={Link}*/}
                                            {/*>*/}
                                            {/*    <FaRegPaperPlane/>*/}
                                            {/*</Button>*/}

                                            <Button
                                                fontWeight={500}
                                                colorScheme={"gray"}
                                                variant={"ghost"}
                                                size={"sm"}
                                                onClick={() => openTagModal(tag as ITag)}
                                            >
                                                <FaRegPaperPlane/>
                                            </Button>
                                        </WrapItem>
                                        <WrapItem>
                                            <Button onClick={() => deleteTag(tag.id as string)}
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
            {typeof tagsTotalPages === 'number' && tagsTotalPages > 0 && (
                <Flex mt={'20px'} justify={{base: 'center', sm: 'flex-end'}}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        pageRangeDisplayed={3}
                        pageCount={pageCount(tagsTotalPages)}
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
            <InfoModal info={info} title={'Tags'} isOpen={isInfoModalOpen} onClose={onInfoModalClose}/>
            <AlertModal btnTitle={'Delete'} btnColorScheme={'red'} title={'Delete Tag'} isOpen={isAlertModalOpen} onClose={closeAlertModal}/>
            {selectedTag.current &&
                <UpdateTagModal tag={selectedTag.current} isOpen={isTagModalOpen} onClose={closeTagModal}/>
            }
        </DefaultLayout>
    );
};
TagIndex.provider = AuthProvider;
export default TagIndex;