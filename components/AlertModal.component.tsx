import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay
} from "@chakra-ui/modal";
import {useRef} from "react";
import {Button} from "@chakra-ui/react";

type AlertModalProps = {
    title: string;
    message?: string;
    isOpen: boolean;
    onClose: (props?: any) => void;
}
const AlertModal = ({title, message, isOpen,onClose}:AlertModalProps) => {
    const cancelRef:any = useRef()
    return (
        <AlertDialog isCentered
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {message ? message : "Are you sure? You can't undo this action afterwards."}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button variant={'ghost'} size={'sm'} ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" variant={'ghost'} size={'sm'} onClick={()=>onClose(true)} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default AlertModal;