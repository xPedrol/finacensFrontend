import {FormErrorMessage} from "@chakra-ui/react";

type CustomFormErrorMessageProps = {
    message?: string
}
const CustomFormErrorMessage = ({message}: CustomFormErrorMessageProps) => {
    return (
        <FormErrorMessage fontSize={'xs'}>{message ?? 'Required Field.'}</FormErrorMessage>
    );
};

export default CustomFormErrorMessage;