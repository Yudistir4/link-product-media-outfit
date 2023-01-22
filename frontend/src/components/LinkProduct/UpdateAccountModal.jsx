import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiCamera, HiUser } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import { updateAccount, updateProfilePic } from "../../services/Account";

const UpdateAccountModal = ({
  id,
  onClose,
  isOpen,
  profilePicUrl,
  username,
}) => {
  const [file, setFile] = useState(null);
  const [input, setInput] = useState(username || "");

  const { mutate, isLoading } = updateProfilePic(id);
  const { mutate: editAccount } = updateAccount(id);

  let status = false;
  if (profilePicUrl || file) {
    status = true;
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Update Account </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex justify-center flex-col items-center gap-4">
            <div className="relative">
              <input
                className="hidden"
                type="file"
                id="profilePic"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                    const formdata = new FormData();
                    formdata.append("image", e.target.files[0]);
                    mutate(formdata);
                  }

                  // mutate(e)
                }}
                name="file"
              />
              <label
                htmlFor={isLoading ? "" : "profilePic"}
                className={`${
                  isLoading && "animate-spin "
                } bg-blue-500 cursor-pointer absolute top-0 right-0 hover:shadow-lg hover:shadow-black/30 transition-all w-8 h-8 flex items-center justify-center text-white text-xl rounded-full`}
              >
                {isLoading ? <CgSpinner /> : <HiCamera />}
              </label>
              {status ? (
                <img
                  className="w-28 h-28 rounded-full hover:shadow-lg shadow-black"
                  src={file ? URL.createObjectURL(file) : profilePicUrl}
                  alt=""
                />
              ) : (
                <div
                  className="bg-gray-300 flex items-center justify-center text-6xl w-28 h-28 rounded-full hover:shadow-lg shadow-black"
                  alt=""
                >
                  <HiUser />
                </div>
              )}
            </div>
            <Input
              placeholder="Username"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <Button
              className="w-full"
              colorScheme="blue"
              variant="solid"
              onClick={() => editAccount({ username: input })}
            >
              Submit
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateAccountModal;
