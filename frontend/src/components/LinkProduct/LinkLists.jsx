import { Button, Input, useDisclosure } from "@chakra-ui/react";
// import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineExternalLink, HiOutlineX, HiTrash } from "react-icons/hi";
import { deleteLink, getLinks, updateLink } from "../../services/Link";
import IconButton from "../IconButton";
import InfiniteScroll from "react-infinite-scroll-component";
import ConfirmModal from "./ConfirmModal";

// import * as Yup from "yup";

// const FORM_VALIDATION = Yup.object().shape({
//   number: Yup.number("Harus nomor").required("Wajib diisi"),
//   links: [
//     {
//       text: Yup.string().required("Wajib diisi"),
//       link: Yup.string().required("Wajib diisi"),
//     },
//   ],
// });

const Link = ({ id, number, links }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    // formState: { errors, isSubmitting },
  } = useForm({
    // resolver: yupResolver(FORM_VALIDATION),
    defaultValues: {
      number,
      links,
    },
  });

  const linksForms = watch("links");

  const { mutate, isLoading } = updateLink(id, () => setIsEdit(false));
  const { mutate: handleDeleteLink } = deleteLink(id);
  const submit = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="relative justify-center flex flex-col gap-2 p-3 border rounded-md"
    >
      <ConfirmModal
        title="Delete Link"
        onClose={onClose}
        isOpen={isOpen}
        onOk={handleDeleteLink}
      />
      <IconButton
        className="absolute -top-4 -right-4 z-10"
        icon={<HiOutlineX />}
        onClick={onOpen}
        color="red"
      />

      <Input
        readOnly={!isEdit}
        type="number"
        size="sm"
        {...register("number")}
        className="text-center"
        placeholder="Number"
      />

      {/* ROW */}
      {linksForms.map((row, i) => (
        <div key={row.name + row.link + i} className=" flex gap-1 items-center">
          {/* <div className="h-8 rounded-md border w-8 flex items-center justify-center shrink-0">
            {row.number}
          </div> */}
          <Input
            readOnly={!isEdit}
            // isDisabled={!isEdit}
            {...register(`links[${i}].number`)}
            size="sm"
            className="!w-20 !p-0 text-center"
            type="number"
            placeholder="No"
          />
          <Input
            readOnly={!isEdit}
            // isDisabled={!isEdit}
            {...register(`links[${i}].name`)}
            size="sm"
            className=""
            placeholder="Title"
          />
          <Input
            readOnly={!isEdit}
            // isDisabled={!isEdit}
            {...register(`links[${i}].link`)}
            size="sm"
            className=""
            placeholder="Link"
          />
          {isEdit && (
            <IconButton
              onClick={() => {
                linksForms.splice(i, 1);
                console.log(linksForms);
                setValue("links", linksForms);
              }}
              className="shrink-0"
              icon={<HiTrash />}
              color="red"
            />
          )}
          <a href={row.link}>
            <IconButton
              className="shrink-0"
              icon={<HiOutlineExternalLink />}
              color="blue"
            />
          </a>
        </div>
      ))}

      {isEdit && (
        <>
          <Button
            size="sm"
            className="w-full"
            colorScheme="blue"
            variant="solid"
            onClick={() => {
              setValue("links", [
                ...linksForms,
                { number: "", name: "", link: "" },
              ]);
            }}
          >
            ADD
          </Button>
          <div className="flex gap-3">
            <Button
              size="sm"
              className="w-full"
              colorScheme="blue"
              variant="solid"
              type="submit"
              isLoading={isLoading}
            >
              SUBMIT
            </Button>
            <Button
              size="sm"
              className="w-full"
              colorScheme="red"
              variant="solid"
              onClick={() => {
                setIsEdit(false);
                reset({
                  number,
                  links,
                });
              }}
            >
              CANCEL
            </Button>
          </div>
        </>
      )}
      {!isEdit && (
        <Button
          onClick={() => setIsEdit(true)}
          size="sm"
          className="w-full"
          //   colorScheme="blue"
          //   variant="solid"
        >
          Edit
        </Button>
      )}
    </form>
  );
};

const LinkLists = ({ id }) => {
  const {
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = getLinks({ limit: 5, account: id });

  let items = [];
  data?.pages.map((page) => {
    page?.data.docs.map((doc) => {
      items.push(doc);
    });
  });

  // console.log(items);

  // console.log(hasNextPage);
  return (
    <div>
      <h2 className="text-center">Daftar Link</h2>
      <InfiniteScroll
        className="flex flex-col gap-5 !overflow-visible"
        dataLength={items.length} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data?.pages?.map((page) => {
          return page?.data?.docs.map((doc, i) => (
            <Link key={doc.id} {...doc} />
          ));
        })}
      </InfiniteScroll>
    </div>
  );
};

export default LinkLists;
