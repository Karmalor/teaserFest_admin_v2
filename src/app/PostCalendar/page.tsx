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

export default async function PostCalendar() {
  const [date, setDate] = useState("");
  const [calendarValue, setCalendarValue] = React.useState<Date | undefined>(
    new Date()
  );

  useEffect(() => {
    setCalendarValue(new Date());
  }, [2000]);

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
        </form>
      </div>
      <div>
        <h1 className="w-full"></h1>

        {date ? <MarketingPostCard date={date} /> : <h1>no post scheduled</h1>}
      </div>
    </div>
  );
}
