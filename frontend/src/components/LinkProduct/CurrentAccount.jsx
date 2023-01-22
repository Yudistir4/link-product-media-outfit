import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { HiOutlineX, HiPencil, HiUser } from "react-icons/hi";
import { deleteAccount } from "../../services/Account";
import IconButton from "../IconButton";
import ConfirmModal from "./ConfirmModal";
import UpdateAccountModal from "./UpdateAccountModal";

const CurrentAccount = ({ currentAccount }) => {
  const { mutate: deleteAccountBtn } = deleteAccount(currentAccount?.id);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: openConfirmModal,
    onClose: closeConfirmModal,
    isOpen: isCofirmModalOpen,
  } = useDisclosure();

  return (
    <div className="relative group m-auto">
      <ConfirmModal
        title="Delete Accounts"
        onClose={closeConfirmModal}
        isOpen={isCofirmModalOpen}
        onOk={deleteAccountBtn}
      />
      {isOpen && (
        <UpdateAccountModal
          profilePicUrl={currentAccount.profilePicUrl}
          id={currentAccount.id}
          username={currentAccount.username}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      <IconButton
        className="absolute top-0 left-0"
        icon={<HiPencil />}
        color="blue"
        onClick={onOpen}
      />
      <IconButton
        onClick={openConfirmModal}
        className="absolute top-0 right-0"
        icon={<HiOutlineX />}
        color="red"
      />
      {currentAccount?.profilePicUrl ? (
        <img
          className="w-28 h-28 rounded-full hover:shadow-lg shadow-black"
          src={currentAccount?.profilePicUrl}
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
      <h1 className="text-center">{currentAccount?.username}</h1>
    </div>
  );
};

export default CurrentAccount;
