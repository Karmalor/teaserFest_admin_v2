"use client";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

export default function DateSelector({ name }: { name: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  let dater = date?.toString();

  const handleChange = () => {};

  return {
    date,
    render: (
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
        <input
          onChange={() => handleChange()}
          type=""
          name={name}
          value={date?.toISOString()}
        />
      </div>
    ),
  };
}
