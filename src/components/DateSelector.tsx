"use client";

import React from "react";
import { Calendar } from "./ui/calendar";

interface DateSelectorProps {
  name: string;
  register: (name: string) => {
    onChange: (event: { target: { value: string } }) => void;
  };
}

export default function DateSelector({ name, register }: DateSelectorProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setDate(selectedDate);
    console.log("Selected Date:", selectedDate); // Log the selected date
  };

  React.useEffect(() => {
    if (date) {
      register(name).onChange({
        target: { value: date?.toISOString().split("T")[0] },
      });
    }
  }, [date, name, register]);

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => {
          setDate(date);
          console.log("Calendar Date Selected:", date); // Log selected date from Calendar
        }}
        className="rounded-md border shadow"
      />
      <input
        type="date"
        name={name}
        value={date?.toISOString().split("T")[0]} // Format for input type="date"
        onChange={handleChange}
        className="mt-2"
      />
    </div>
  );
}
