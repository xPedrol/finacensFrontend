import DefaultLayout from "../../components/Layout.component";
import PageHeader from "../../components/PageHeader.component";
import {Box, Button, Grid, GridItem, Icon, useDisclosure, useToast} from "@chakra-ui/react";
import Seo from "../../components/Seo.component";
import {AiOutlinePlus} from "react-icons/ai";
import {useQuery} from "react-query";
import {apiNotes} from "../../services/note.service";
import Loading from "../../components/LoadingSpinner.component";
import {INote} from "../../models/Note.model";
import NoData from "../../components/NoData.component";
import NoteCard from "../../components/NoteCard.component";
import {AuthProvider} from "../../contexts/auth.context";
import {useRef} from "react";
import UpdateNoteModal from "../../components/UpdateNoteModal.component";

const pageSubtitle =
    "Nessa página é possível armazenar informações relevantes e importantes de forma organizada e acessível. Ela pode ser utilizada para anotar ideias, tarefas, lembretes, entre outros conteúdos.";
const pageBreadcrumb = [
    {title: "Home", link: "/"},
    {title: "Notes", link: "/notes"},
];

const NotesIndex = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const openModal = (id: string) => {
        noteId.current = id;
        onOpen();
    };
    const onCloseModal = (props?: any) => {
        onClose();
        noteId.current = null;
        if (props?.success) {
            refetchNotes();
        }
    };
    const noteId = useRef<string | null>(null);

    const {
        data: notes,
        isLoading,
        isFetched,
        refetch: refetchNotes,
    } = useQuery("notes", () => apiNotes().then((res) => res.data));
    const toast = useToast();
    return (
        <DefaultLayout>
            <PageHeader
                title={"Notes"}
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
            <Seo title={"Notes"} description={"Notes page"}/>
            {/*<Grid templateColumns="repeat(12, 1fr)" gap={6} mb={'30px'} mx={'auto'} w={'100%'}>*/}
            {/*    <GridItem colSpan={12}>*/}
            {/*        {notesStatistic &&*/}
            {/*            <NoteCard gains={notesStatistic.gains} losses={notesStatistic.losses}/>}*/}
            {/*    </GridItem>*/}
            {/*</Grid>*/}
            <Box mt={'30px'}></Box>
            {isLoading ? <Loading/> : notes && notes.length > 0 ? (
                <Grid templateColumns={'repeat(12,1fr)'} gap={6}>
                    {notes.map((note: INote) => (
                        <GridItem colSpan={{base:12,md:6,lg:4}} key={note.id}>
                            <NoteCard refetchNotes={refetchNotes} openModal={openModal} note={note}/>
                        </GridItem>
                    ))}
                </Grid>
            ) : (
                <NoData/>
            )}
            <UpdateNoteModal noteId={noteId.current} onClose={onCloseModal} isOpen={isOpen}/>
        </DefaultLayout>
    );
};
NotesIndex.provider = AuthProvider;
export default NotesIndex;