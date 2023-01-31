import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Icon,
    Stack,
    Text, useColorModeValue,
    useToast
} from "@chakra-ui/react";
import {FiTrash} from "react-icons/fi";
import {FaRegPaperPlane} from "react-icons/fa";
import {apiDeleteNote, apiToggleFixed} from "../services/note.service";
import {useEffect, useState} from "react";
import {INote} from "../models/Note.model";
import {BsPin, BsPinFill} from "react-icons/bs";
import dayjs from "dayjs";

type NoteCardProps = {
    note: INote;
    refetchNotes: () => void;
    openModal: (id: string) => void;
    onAlertModalClose: () => void;
    openAlertModal: (id: string) => void;
    onAlertModalOpen: () => void;
}
const NoteCard = ({
                      note,
                      openModal,
                      openAlertModal
                  }: NoteCardProps) => {
    const toast = useToast();
    const [isFixed, setIsFixed] = useState<boolean>(false);

    const toggleFixed = () => {
        apiToggleFixed(note.id as string).then((res) => {
            setIsFixed(!isFixed);
        }).catch((err) => {
            toast({
                title: 'Error',
                description: 'Error updating note',
                status: 'error',
                isClosable: true,
            });
        });
    };

    useEffect(() => {
        setIsFixed(note.fixed || false);
    }, [note]);
    return (
        <Card borderBottom={'1px solid'} boxShadow={'none'} border={'1px solid'} borderColor={useColorModeValue('gray.200', 'gray.700')}
              bg={useColorModeValue("white", "#111111")}
              borderBottomColor={note.color}>
            <CardBody>
                <Stack spacing="3">
                    <Flex justify={'space-between'} align={'center'}>
                        <Text size="md" fontWeight={600}>{note.title}</Text>
                        <Box onClick={toggleFixed}>
                            {!isFixed ? <Icon as={BsPin} boxSize={'20px'} color={note.color}
                                              cursor={'pointer'}></Icon> :
                                <Icon as={BsPinFill} boxSize={'20px'} color={note.color} cursor={'pointer'}></Icon>}
                        </Box>
                    </Flex>
                    {note.description &&
                        <Text fontWeight={400}>
                            {note.description}
                        </Text>
                    }
                </Stack>
            </CardBody>
            <CardFooter justify={'space-between'} p={'13px'}>
                <Text fontSize={'12px'} alignSelf={'flex-end'}
                      color={'gray.500'}>{dayjs(note.date).format('DD/MM/YYYY hh:mm')}</Text>
                <ButtonGroup spacing="2" size={'sm'} variant={'outline'}>
                    <Button colorScheme="gray" variant={'ghost'} onClick={() => openModal(note.id as string)}>
                        <FaRegPaperPlane/>
                    </Button>
                    <Button colorScheme="red" variant={'ghost'} onClick={() => openAlertModal(note.id as string)}>
                        <FiTrash/>
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default NoteCard;