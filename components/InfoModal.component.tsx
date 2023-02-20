import {
    Box,
    Button, Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import {BsEmojiSmile} from "react-icons/bs";

type PageProps = {
    info: string;
    title: string;
    isOpen: boolean;
    onClose: (props?: any) => void;
}

const InfoModal = ({title, info, isOpen, onClose}: PageProps) => {

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize={'18px'}>{title}</Text>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <Box as={"form"}>
                        <ModalBody>
                            {info}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme={"gray"} type={"button"} onClick={onClose} size={'sm'} variant={'ghost'}>
                                Entendido
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InfoModal;