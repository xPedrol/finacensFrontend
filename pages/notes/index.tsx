import DefaultLayout from "../../components/Layout.component";
import PageHeader from "../../components/PageHeader.component";
import {Box, Divider, Grid, GridItem, useToast} from "@chakra-ui/react";
import Seo from "../../components/Seo.component";
import {AiOutlinePlus} from "react-icons/ai";
import {useQuery} from "react-query";
import {apiNotes} from "../../services/note.service";
import Loading from "../../components/LoadingSpinner.component";
import {INote} from "../../models/Note.model";
import NoData from "../../components/NoData.component";
import NoteCard from "../../components/NoteCard.component";
import {AuthProvider} from "../../contexts/auth.context";

const pageSubtitle =
    "Nessa página é possível armazenar informações relevantes e importantes de forma organizada e acessível. Ela pode ser utilizada para anotar ideias, tarefas, lembretes, entre outros conteúdos.";
const pageBreadcrumb = [
    {title: "Home", link: "/"},
    {title: "Notes", link: "/notes"},
];
const pageButtons = [
    {
        title: "Adicionar",
        link: "/notes/new",
        colorSchema: "blue",
        icon: AiOutlinePlus,
    },
];
const tableColumns = [
    {title: "Title", key: "title"},
    {title: "Date", key: "date"},
    {title: "Favorite", key: "favorite"},
    {title: "", key: "actions"},
];
const NotesIndex = () => {
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
                buttons={pageButtons}
            />
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
                        <GridItem colSpan={4} key={note.id}>
                            <NoteCard refetchNotes={refetchNotes} note={note}/>
                        </GridItem>
                    ))}
                </Grid>
            ) : (
                <NoData/>
            )}
        </DefaultLayout>
    );
};
NotesIndex.provider= AuthProvider;
export default NotesIndex;