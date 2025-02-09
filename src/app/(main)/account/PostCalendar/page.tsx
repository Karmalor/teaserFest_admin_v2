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
import MarketingPostCard from "@/components/MarketingPostCard";
import Link from "next/link";

// interface MarketingPost {
//   imageUrl: string;
//   copy: string;
//   date: string;
// }

let fullfilled = false;
let promise: Promise<void> | null = null;

const useTimeout = (ms: number) => {
  if (!fullfilled) {
    throw (promise ||= new Promise((res) => {
      setTimeout(() => {
        fullfilled = true;
        res();
      }, ms);
    }));
  }
};

export default function PostCalendar() {
  const [date, setDate] = useState("");
  const [calendarValue, setCalendarValue] = React.useState<Date | undefined>(
    new Date()
  );

  useEffect(() => {
    setCalendarValue(new Date());

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() - 1);

    setDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  console.log("Calendar Value", calendarValue);
  console.log("Date", date);

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-center items-center gap-y-4 gap-x-16 md:mt-16">
      <div>
        <form>
          <div className="md:mb-8">
            <Label>Select Date</Label>
            {/* <DateSelector name="date" register={register} /> */}
            <Calendar
              today={new Date()}
              defaultMonth={new Date()}
              mode="single"
              selected={calendarValue}
              onSelect={(date) => {
                setDate(date?.toISOString().split("T")[0]);
                setCalendarValue(date);
                console.log(
                  "Calendar Date Selected:",
                  date?.toISOString().split("T")[0]
                ); // Log selected date from Calendar
              }}
              className="w-[250px] mt-4 rounded-md border shadow flex justify-centern border-black"
            />
          </div>
        </form>
      </div>
      <div>
        <h1 className="w-full"></h1>

        {date ? (
          <div className="md:w-[250px]">
            <MarketingPostCard date={date} />
          </div>
        ) : (
          <div>
            <h1>No post scheduled</h1>
            <Link href={"/account/PostUploader"}>
              <Button className="mt-4">Add post to Calendar</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
