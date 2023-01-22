import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const ConfirmModal = ({ onClose, isOpen, onOk, title }) => {
  const handleOK = () => {
    onOk();
    onClose();
  };
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex justify-center flex-col items-center gap-4"></ModalBody>
          <ModalFooter>
            <Button onClick={handleOK} className="mr-3">
              OK
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
