"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { getMarketingPostByDate } from "@/lib/actions/post.actions";
import copy from "copy-to-clipboard";
import { useRouter } from "next/navigation";
import { CreateMarketingPostParams } from "@/types";

interface MarketingPost {
  imageUrl?: string | null;
  copy?: string | null;
  date?: string | null;
}

// let fullfilled = false;
// let promise: Promise<void> | null = null;

// const useTimeout = (ms: number) => {
//   if (!fullfilled) {
//     throw (promise ||= new Promise((res) => {
//       setTimeout(() => {
//         fullfilled = true;
//         res();
//       }, ms);
//     }));
//   }
// };

const MarketingPostCard = ({ date }: { date: string }) => {
  const [post, setPost] = useState<CreateMarketingPostParams>();
  const [copied, setCopiedId] = useState<string>();
  const [copiedText, setCopiedText] = useState<string>();
  const [copiedImage, setCopiedImage] = useState<string>();

  const state = {
    value: "",
    copied: false,
  };

  //   const router = useRouter();

  //   useEffect(() => {
  //     router.refresh();
  //   }, [useTimeout(2000)]);

  useEffect(() => {
    const fetchData = async () => {
      const result: MarketingPost[] = await getMarketingPostByDate(
        date.split("T")[0]
      );

      // const post: MarketingPost = await getMarketingPostByDate(date);
      // .then((res) => res.json());
      console.log("result", result);

      if (result) {
        const post: MarketingPost = result[result.length - 1];
        setPost(post);
      } else {
        setPost({
          imageUrl: null,
          copy: null,
          date: null,
        });
      }
    };
    fetchData();
  }, [date]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {post?.imageUrl && (
          <Image
            src={post?.imageUrl}
            alt="imageUrl"
            width={250}
            height={250}
            className="rounded-md"
          />
        )}
      </div>
      <Textarea className="mt-4 h-40" readOnly value={post?.copy} />

      <div className="flex justify-end mt-2 h-40">
        <Button
          className=""
          onClick={async () => {
            // Writing text with writeText and a fallback using copy-to-clipboard

            if ("clipboard" in navigator) {
              await navigator.clipboard.writeText(`${post!.copy}`);
            } else {
              copy("await navigator.clipboard.writeText()");
            }

            setCopiedId("write-text");
          }}
        >
          {copied === "write-text" ? "Copy" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default MarketingPostCard;
