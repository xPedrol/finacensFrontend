import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";

type AlertProps = {
  status: "success" | "error" | "warning" | "info";
  title?: string;
  description: string;
  isClosable?: boolean;
};
const CustomAlert = ({
  status,
  title,
  description,
  isClosable,
}: AlertProps) => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert status={status} borderRadius={"lg"}>
      <AlertIcon />
      <Box w={"100%"}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </Box>
      {isClosable && (
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      )}
    </Alert>
  ) : (
    <></>
  );
};
export default CustomAlert;
