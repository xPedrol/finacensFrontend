import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Heading,
    Icon,
    Stack,
    Text, useToast
} from "@chakra-ui/react";
import {FiTrash} from "react-icons/fi";
import {FaRegPaperPlane} from "react-icons/fa";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {apiDeleteNote, apiToggleFavorite} from "../services/note.service";
import {useEffect, useState} from "react";
import Link from "next/link";
import {INote} from "../models/Note.model";

type NoteCardProps = {
    note: INote;
    refetchNotes: () => void;
    openModal: (id: string) => void;
}
const NoteCard = ({note, refetchNotes, openModal}: NoteCardProps) => {
    const toast = useToast();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const toggleFavorite = () => {
        apiToggleFavorite(note.id as string).then((res) => {
            setIsFavorite(!isFavorite);
        }).catch((err) => {
            toast({
                title: 'Error',
                description: 'Error updating note',
                status: 'error',
                isClosable: true,
            });
        });
    };
    const deleteNote = () => {
        apiDeleteNote(note.id as string).then((res) => {
            toast({
                title: "Note deleted",
                description: "Note deleted successfully",
                status: "success",
                isClosable: true,
            });
            refetchNotes();
        }).catch((err) => {
            toast({
                title: "Error",
                description: "Error deleting note",
                status: "error",
                isClosable: true,
            });
        });
    };
    useEffect(() => {
        setIsFavorite(note.favorite || false);
    }, [note]);
    return (
        <Card borderBottom={'3px solid'} borderBottomColor={note.color}>
            <CardBody>
                <Stack spacing="3">
                    <Flex justify={'space-between'} align={'center'}>
                        <Heading size="md">{note.title}</Heading>
                        <Box onClick={toggleFavorite}>
                            {!isFavorite ? <Icon as={AiOutlineStar} boxSize={'25px'} color={'yellow.300'}
                                                 cursor={'pointer'}></Icon> :
                                <Icon as={AiFillStar} boxSize={'25px'} color={'yellow.300'} cursor={'pointer'}></Icon>}
                        </Box>
                    </Flex>
                    {note.description &&
                        <Text>
                            {note.description}
                        </Text>
                    }
                </Stack>
            </CardBody>
            {/*<Divider color={'gray.300'} w={'93%'} mx={'auto'}/>*/}
            <CardFooter justify={'flex-end'} p={'13px'}>
                <ButtonGroup spacing="2" size={'sm'} variant={'outline'}>
                    <Button colorScheme="blue" onClick={() => openModal(note.id as string)}>
                        <FaRegPaperPlane/>
                    </Button>
                    <Button colorScheme="red" onClick={deleteNote}>
                        <FiTrash/>
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default NoteCard;