import {
    Box,
    Button,
    Flex,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useRadio,
    useRadioGroup,
    useToast,
} from "@chakra-ui/react";
import {INote} from "../models/Note.model";
import {useQuery} from "react-query";
import {useEffect, useRef, useState} from "react";
import {apiNoteGroups, apiNoteGroupsCount} from "../services/noteGroup.service";
import ReactPaginate from "react-paginate";
import {pageCount} from "../utils/pagination.utils";
import styles from "../styles/Pagination.module.scss";
import {INoteGroup} from "../models/NoteGroup.model";
import {apiRemoveFromNoteGroup, apiSwitchNoteGroup} from "../services/note.service";

type SwitchNoteGroupModalProps = {
    isOpen: boolean;
    onClose: (props?: any) => void;
    note: INote | null
};

const SwitchNoteGroupModal = ({isOpen, onClose, note}: SwitchNoteGroupModalProps) => {
        const toast = useToast();
        const [noteGroupId, setNoteGroupId] = useState<string>('');
        const page = useRef(0);
        const search = useRef('');
        const switchNoteGroup = (id: string) => {
            setNoteGroupId(id);
        };
        const {getRootProps, getRadioProps} = useRadioGroup({
            name: 'framework',
            defaultValue: note?.noteGroupId || '',
            onChange: switchNoteGroup,
        });
        const {data: noteGroupsTotalPages} = useQuery(['noteGroupsTotalPages', search], () => apiNoteGroupsCount().then(res => res.data));
        const {data: noteGroups, refetch: refetchNoteGroups} = useQuery(['noteGroups', page, search], () => apiNoteGroups({
            page: page.current,
            perPage: 5
        }).then(res => res.data));
        const onSubmit = async () => {
            await apiSwitchNoteGroup(note?.id as string, noteGroupId)
                .then(() => {
                    toast({
                        title: "Note saved successfully.",
                        status: "success",
                        isClosable: true,
                    });
                    onClose({success: true});
                })
                .catch(() => {
                    toast({
                        title: "Error while saving note.",
                        status: "error",
                        isClosable: true,
                    });
                });
        };
        useEffect(() => {
            if (note && note.noteGroupId) setNoteGroupId(note.noteGroupId);
            else setNoteGroupId('');
        }, [note]);
        const onRemove = async () => {
            await apiRemoveFromNoteGroup(note?.id as string).then(() => {
                toast({
                    title: "Note saved successfully.",
                    status: "success",
                    isClosable: true,
                });
                onClose({success: true});
            }).catch(() => {
                toast({
                    title: "Error while saving note.",
                    status: "error",
                    isClosable: true,
                });
            });
        };
        const handlePageClick = (data: any) => {
            if (data.selected === page.current) return;
            page.current = data.selected;
            refetchNoteGroups();
        };
        return (
            <>
                <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>
                            Alterar Grupo
                            <Text as={'p'} fontSize={'13px'}>{note?.title}</Text>
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <List spacing={3}>
                                {noteGroups && noteGroups.map((value: INoteGroup) => {
                                    const radio = getRadioProps({id: value.id, value: value.id});
                                    return (
                                        <ListItem key={value.id}>
                                            <RadioCard {...radio}>
                                                {value.name}
                                            </RadioCard>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            {typeof noteGroupsTotalPages === 'number' && (
                                <Flex mt={'20px'} justify={{base: 'center', sm: 'center'}}>
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="Next"
                                        pageRangeDisplayed={3}
                                        pageCount={pageCount(noteGroupsTotalPages)}
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
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" variant={'ghost'} size={'sm'} mr={3}
                                    onClick={() => onClose({success: true})}>
                                Fechar
                            </Button>
                            <Button isDisabled={!noteGroupId} colorScheme={"red"} variant={'ghost'} size={'sm'}
                                    type={"submit"} onClick={onRemove}>
                                Remove
                            </Button>
                            <Button isDisabled={!noteGroupId} colorScheme={"gray"} variant={'ghost'} size={'sm'}
                                    type={"submit"} onClick={onSubmit}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    }
;

const RadioCard = (props: any) => {
    const {getInputProps, getCheckboxProps} = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();
    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: 'blue.400',
                    color: 'white',
                    borderColor: 'blue.400',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    );
};
export default SwitchNoteGroupModal;
