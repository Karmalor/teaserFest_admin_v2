"use client";

import React, { useState } from "react";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { MultiSelect } from "../_components/MultiSelect";

const frameworksList = [
  {
    value: "queen of the striptease",
    label: "Queen of the Striptease",
    icon: Turtle,
  },
  { value: "varietease", label: "VarieTEASE", icon: Cat },
  { value: "sensualite", label: "Sensualité", icon: Dog },
  { value: "locals only", label: "Locals Only!", icon: Rabbit },
  { value: "the champagne gala", label: "The Champagne Gala", icon: Fish },
];

function Home() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "varietease",
    "sensualite",
  ]);

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1>
      <MultiSelect
        options={frameworksList}
        onValueChange={setSelectedFrameworks}
        defaultValue={selectedFrameworks}
        placeholder="Select frameworks"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
      {/* <div className="mt-4">
        <h2 className="text-xl font-semibold">Selected Frameworks:</h2>
        <ul className="list-disc list-inside">
          {selectedFrameworks.map((framework) => (
            <li key={framework}>{framework}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default Home;
