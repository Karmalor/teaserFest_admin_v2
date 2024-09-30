"use client";

import { Calendar } from "@/components/ui/calendar";
import PostExhibitor from "@/components/PostExhibitor";
import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

import { Label } from "@/components/ui/label";
import DateSelector from "@/components/DateSelector";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useAction from "@/hooks/useAction";
import { useForm, useWatch } from "react-hook-form";
import { formSubmissionsTable } from "@/db/schema";
import { db } from "@/db";
import { getAllFormSubmissions } from "@/lib/actions/application.actions";
import {
  getAllMarketingPosts,
  getMarketingPostByDate,
} from "@/lib/actions/post.actions";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

interface MarketingPost {
  imageUrl: string;
  copy: string;
  date: string;
}

export function PostCalendar() {
  const [date, setDate] = useState("");
  const [calendarValue, setCalendarValue] = React.useState<Date | undefined>(
    new Date()
  );

  const [post, setPost] = useState({});
  const state = {
    value: "",
    copied: false,
  };

  const [copied, setCopiedId] = useState<string>();
  const [copiedText, setCopiedText] = useState<string>();
  const [copiedImage, setCopiedImage] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const result: MarketingPost[] = await getMarketingPostByDate(date);

      // const post: MarketingPost = await getMarketingPostByDate(date);
      // .then((res) => res.json());
      console.log("result", result);

      const post = result[result.length - 1];

      setPost(post);
    };
    fetchData();
  }, [date]);

  //   const action = useAction(formData.getValues());

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-around md:mt-48 m-8">
      <div>
        <form>
          <div className="my-4">
            <Label>Select Date</Label>
            {/* <DateSelector name="date" register={register} /> */}
            <Calendar
              today={new Date()}
              defaultMonth={new Date()}
              mode="single"
              selected={calendarValue}
              onSelect={(date) => {
                setDate(date?.toISOString());
                setCalendarValue(date);
                console.log("Calendar Date Selected:", date?.toISOString()); // Log selected date from Calendar
              }}
              className="rounded-md border shadow flex justify-center"
            />
          </div>
          {/* <Button
            type="button"
            onClick={() => {
              console.log("Date Value from Form:", date); // Log the value retrieved from the form
            }}
            className="mt-4"
          >
            Submit
          </Button> */}
        </form>
      </div>
      <div>
        <h1 className="w-full"></h1>

        {post ? (
          <div>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={post?.imageUrl}
                alt="imageUrl"
                width={250}
                height={250}
                className="rounded-md"
              />
            </div>
            <Textarea className="mt-4 h-40" readOnly value={post?.copy} />

            <div className="flex justify-end mt-2 h-40">
              <Button
                className=""
                onClick={async () => {
                  // Writing text with writeText and a fallback using copy-to-clipboard

                  if ("clipboard" in navigator) {
                    await navigator.clipboard.writeText(`${post?.copy}`);
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
        ) : (
          <h1>no post scheduled</h1>
        )}
      </div>
    </div>
  );
}

export default PostCalendar;
