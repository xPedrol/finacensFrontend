import DefaultLayout from "../../components/Layout.component";
import PageHeader from "../../components/PageHeader.component";
import {Box, Button, Flex, Grid, GridItem, Icon, useDisclosure, useToast} from "@chakra-ui/react";
import Seo from "../../components/Seo.component";
import {useQuery} from "react-query";
import {apiDeleteNote, apiNotes, apiNotesCount} from "../../services/note.service";
import Loading from "../../components/LoadingSpinner.component";
import {INote} from "../../models/Note.model";
import NoData from "../../components/NoData.component";
import NoteCard from "../../components/NoteCard.component";
import {AuthProvider} from "../../contexts/auth.context";
import {useEffect, useRef} from "react";
import UpdateNoteModal from "../../components/UpdateNoteModal.component";
import InfoModal from "../../components/InfoModal.component";
import {AiOutlineInfoCircle} from "react-icons/ai";
import AlertModal from "../../components/AlertModal.component";
import {apiExpenseCount} from "../../services/expense.service";
import ReactPaginate from "react-paginate";
import {pageCount} from "../../utils/pagination.utils";
import styles from "../../styles/Pagination.module.scss";
import {useRouter} from "next/router";
import UpdateNoteGroupPopover from "../../components/UpdateNoteGroupPopover.component";
import SwitchNoteGroupModalComponent from "../../components/SwitchNoteGroupModal.component";

const info =
    "Fazer anotações permite que as pessoas tenham um registro claro de suas ideias e tarefas, o que as ajuda a se organizar e a priorizar suas atividades. Isso leva a uma melhor gestão do tempo e aumenta a produtividade, ajudando as pessoas a alcançar seus objetivos pessoais e profissionais de maneira mais eficiente.";


const NotesIndex = () => {
    const {isOpen: isPopoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose} = useDisclosure();
    const {isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose} = useDisclosure();
    const {isOpen: isAlertModalOpen, onOpen: onAlertModalOpen, onClose: onAlertModalClose} = useDisclosure();
    const {
        isOpen: isSwitchNoteGroupModalOpen,
        onOpen: onSwitchNoteGroupModalOpen,
        onClose: onSwitchNoteGroupModalClose
    } = useDisclosure();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const selectedNote = useRef<INote | null>(null);
    const router = useRouter();
    const page = useRef<number>(router.query.page ? Number(router.query.page) : 0);
    const openModal = (note: INote) => {
        selectedNote.current = note as INote;
        onOpen();
    };
    const handlePageClick = (event: any) => {
        if (event.selected === page.current) return;
        router.push({
            pathname: '/notes',
            query: {page: event.selected},
        }, undefined, {shallow: true});
    };

    const openAlertModal = (id: string) => {
        selectedNote.current = {id} as INote;
        onAlertModalOpen();
    };
    const onCloseModal = (props?: any) => {
        onClose();
        selectedNote.current = null;
        if (props?.success) {
            refetchNotes();
        }
    };
    const openSwitchNoteGroupModal = (note: INote) => {
        selectedNote.current = note as INote;
        onSwitchNoteGroupModalOpen();
    };
    const onCloseSwitchNoteGroupModal = (props?: any) => {
        onSwitchNoteGroupModalClose();
        selectedNote.current = null;
        if (props?.success) {
            refetchNotes();
        }
    };
    const closeAlertModal = (next: any) => {
        if (next === true && selectedNote.current?.id) {
            apiDeleteNote(selectedNote.current.id as string).then((res) => {
                toast({
                    title: "Note deleted",
                    description: "Note deleted successfully",
                    status: "success",
                    isClosable: true,
                });
                refetchNotes();
                onAlertModalClose();
                selectedNote.current = null;
            }).catch((err) => {
                toast({
                    title: "Error",
                    description: "Error deleting note",
                    status: "error",
                    isClosable: true,
                });
            });
        } else {
            onAlertModalClose();
            selectedNote.current = null;
        }
    };

    const {
        data: notesTotalPages,
        refetch: refetchNotesCount
    } = useQuery(["notesCount"], () => apiNotesCount().then((res) => res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        enabled: false,
    });

    const {
        data: notes,
        isLoading,
        refetch: refetchNotes,
    } = useQuery("notes", () => apiNotes().then((res) => res.data));
    const toast = useToast();
    useEffect(() => {
        refetchNotesCount();
    }, []);
    useEffect(() => {
        if (router.query.page && page.current !== Number(router.query.page)) {
            page.current = Number(router.query.page);
            refetchNotes();
            refetchNotesCount();
        }
    }, [router.query]);
    return (
        <DefaultLayout>
            <PageHeader
                title={"Notes"}
                subtitle={notesTotalPages ? `${notesTotalPages} records` : ''}
            >
                <Button
                    onClick={() => openModal({id: 'new'} as INote)}
                    size={"sm"}
                    colorScheme={'gray'}
                    variant="outline"
                >
                    Adicionar
                </Button>
                <Button
                    onClick={() => onPopoverOpen()}
                    size={"sm"}
                    colorScheme={'gray'}
                    variant="outline"
                >
                    Adicionar Grupo
                </Button>
                <UpdateNoteGroupPopover isOpen={isPopoverOpen} onOpen={onPopoverOpen} onClose={onPopoverClose}/>
                <Button size={"sm"}
                        colorScheme={'gray'} onClick={onInfoModalOpen}
                        variant="ghost">
                    <Icon as={AiOutlineInfoCircle} boxSize={'17px'}/>
                </Button>
            </PageHeader>
            <Seo title={"Notes"} description={"Notes page"}/>
            <Box mt={'30px'}></Box>
            {isLoading ? <Loading/> : notes && notes.length > 0 ? (
                <Grid templateColumns={'repeat(12,1fr)'} gap={6}>
                    {notes.map((note: INote) => (
                        <GridItem colSpan={{base: 12, md: 6, lg: 4}} key={note.id}>
                            <NoteCard onAlertModalClose={onAlertModalClose} onAlertModalOpen={onAlertModalOpen}
                                      openAlertModal={openAlertModal}
                                      openSwitchNoteGroupModal={openSwitchNoteGroupModal}
                                      refetchNotes={refetchNotes} openModal={openModal} note={note}/>
                        </GridItem>
                    ))}
                </Grid>
            ) : (
                <NoData message={'Nenhuma anotação foi encontrada'}/>
            )}
            {typeof notesTotalPages === 'number' && notesTotalPages > 0 && (
                <Flex mt={'20px'} justify={{base: 'center', sm: 'flex-end'}}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        pageRangeDisplayed={3}
                        pageCount={pageCount(notesTotalPages)}
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
            {selectedNote.current &&
                <>
                    <UpdateNoteModal note={selectedNote.current} onClose={onCloseModal} isOpen={isOpen}/>
                    <SwitchNoteGroupModalComponent isOpen={isSwitchNoteGroupModalOpen}
                                                   onClose={onCloseSwitchNoteGroupModal}
                                                   note={selectedNote.current}/>
                </>}
            <InfoModal info={info} title={'Notes'} isOpen={isInfoModalOpen} onClose={onInfoModalClose}/>
            <AlertModal title={'Delete Note'} isOpen={isAlertModalOpen} onClose={closeAlertModal}/>
        </DefaultLayout>
    );
};
NotesIndex.provider = AuthProvider;
export default NotesIndex;