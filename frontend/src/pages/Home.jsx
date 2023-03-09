import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import IconButton from "../components/IconButton";

import { HiPlusSm, HiUser } from 'react-icons/hi';
// import { Button } from "@chakra-ui/react";
import { createAccount, getAccounts } from '../services/Account';
import { useToast } from '@chakra-ui/react';
// import CurrentAccount from "../components/LinkProduct/CurrentAccount";
// import Convert from "../components/LinkProduct/Convert";
// import CreateMultipleLink from "../components/LinkProduct/CreateMultipleLink";
// import LinkLists from "../components/LinkProduct/LinkLists";
import { getGenerateLink, getLinks } from '../services/Link';

const LinkProduct = () => {
  const { id } = useParams();
  const { data: accounts } = getAccounts({ page: 1, limit: 5 });
  const currentAccount = accounts?.data.docs.find((doc) => doc.id === id);
  const { refetch, isFetching } = getGenerateLink(id);

  // console.log(links);
  // let items = [];
  // links?.pages.map((page) => {
  //   page?.data.docs.map((doc) => {
  //     items.push(doc);
  //   });
  // });

  // console.log(items);
  const toast = useToast();
  // console.log(currentAccount);
  const { mutate: addAccountBtn } = createAccount(
    {},
    (data) => {
      toast({ title: data.message, status: 'success' });
    },
    (err) => toast({ title: err.message, status: 'error' })
  );

  return (
    <div className="flex flex-col gap-5 p-5 max-w-2xl m-auto">
      <h1 className="text-center font-serif text-xl">Choose Account</h1>
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
    </div>
  );
};

export default LinkProduct;
