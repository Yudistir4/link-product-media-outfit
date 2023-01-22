import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { HiPlusSm, HiUser } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import { createAccount, getAccounts } from "../services/Account";
import { useToast } from "@chakra-ui/react";
import CurrentAccount from "../components/LinkProduct/CurrentAccount";
import Convert from "../components/LinkProduct/Convert";
import CreateMultipleLink from "../components/LinkProduct/CreateMultipleLink";
import LinkLists from "../components/LinkProduct/LinkLists";
import { getGenerateLink } from "../services/Link";

const LinkProduct = () => {
  const { id } = useParams();
  const { data: accounts, isFetching: isFetchingGetAcc } = getAccounts({
    page: 1,
    limit: 5,
  });
  const currentAccount = accounts?.data.docs.find((doc) => doc.id === id);
  const { refetch, isFetching } = getGenerateLink(id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentAccount && !isFetchingGetAcc) {
      navigate("/404");
    }
  }, []);

  const toast = useToast();

  const { mutate: addAccountBtn } = createAccount(
    {},
    (data) => {
      toast({ title: data.message, status: "success" });
    },
    (err) => toast({ title: err.message, status: "error" })
  );

  return (
    <div className="flex flex-col gap-5 p-5 max-w-2xl m-auto">
      {/* User */}
      <div className="flex items-center  m-3 gap-3 justify-center">
        {accounts?.data.docs.map((doc) => {
          if (doc.id !== id)
            return (
              <Link
                key={doc.id}
                to={`/links/${doc.id}`}
                className="relative group"
              >
                {doc.profilePicUrl ? (
                  <img
                    className="w-16 h-16 rounded-full hover:shadow-lg shadow-black"
                    src={doc.profilePicUrl}
                    alt=""
                  />
                ) : (
                  <div
                    key={doc.id}
                    className="bg-gray-300 flex items-center justify-center text-3xl w-16 h-16 rounded-full hover:shadow-lg shadow-black"
                  >
                    <HiUser />
                  </div>
                )}
              </Link>
            );
        })}
        <div
          onClick={addAccountBtn}
          className="bg-gray-300 cursor-pointer flex items-center justify-center text-3xl w-16 h-16 rounded-full hover:shadow-lg shadow-black"
        >
          <HiPlusSm />
        </div>
      </div>

      {/* CURRENT USER */}
      {currentAccount && <CurrentAccount currentAccount={currentAccount} />}

      <Button
        isLoading={isFetching}
        onClick={refetch}
        size="sm"
        colorScheme="blue"
        variant="solid"
      >
        Copy Result
      </Button>
      {currentAccount && (
        <>
          <Convert username={currentAccount.username} key={id} />
          <CreateMultipleLink id={id} username={currentAccount.username} />
          <LinkLists id={id} key={id + "linklist"} />
        </>
      )}
    </div>
  );
};

export default LinkProduct;
