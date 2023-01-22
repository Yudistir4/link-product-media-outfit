import { Button, Input, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { convertLink } from "../../services/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Convert = ({ username }) => {
  console.log(username);
  const toast = useToast();
  const [originUrl, setOriginUrl] = useState("");
  const [result, setResult] = useState("");
  const { mutate, isLoading } = convertLink((data) =>
    setResult(data.data.shortLink)
  );
  // console.log(data);
  const submit = (e) => {
    e.preventDefault();
    if (!username) {
      toast({ title: "Username Wajib Ada", status: "error" });
      return;
    }
    mutate({ originUrl, tags: [username] });
  };
  return (
    <form
      onSubmit={submit}
      className="justify-center flex flex-col gap-3 p-3 border rounded-md"
    >
      <h2 className="text-center font-semibold">Single Link</h2>
      <div className="flex gap-2">
        <Input
          value={originUrl}
          onChange={(e) => setOriginUrl(e.target.value)}
          size="sm"
          className="flex-1"
          placeholder="Single Link"
        />

        <Button
          isLoading={isLoading}
          type="submit"
          size="sm"
          colorScheme="blue"
          variant="solid"
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            setResult("");
            setOriginUrl("");
          }}
          type="button"
          size="sm"
          colorScheme="red"
          variant="solid"
        >
          Reset
        </Button>
      </div>
      <div className="flex gap-3">
        <Input
          size="sm"
          value={result}
          readOnly
          className=""
          placeholder="Result"
        />
        <CopyToClipboard
          text={result}
          onCopy={() => toast({ title: "Copied!!", status: "success" })}
        >
          <Button type="button" size="sm" colorScheme="blue" variant="solid">
            Copy
          </Button>
        </CopyToClipboard>
      </div>
    </form>
  );
};

export default Convert;
