import {FormErrorMessage} from "@chakra-ui/react";

type CustomFormErrorMessageProps = {
    message?: string
    children?: any
}
const CustomFormErrorMessage = ({message,children}: CustomFormErrorMessageProps) => {
    return (
        <FormErrorMessage fontSize={'xs'}>{(message ?? children) ?? 'Required Field.'}</FormErrorMessage>
    );
};

export default CustomFormErrorMessage;