import { SelectFormSubmission } from "@/db/schema";
import Image from "next/image";
import React from "react";

export type actProps = {
  stageName: string;
  legalName: string;
  tagline: string;
  preferredPronouns: string;
  nameOfAct: string;
  descriptionOfAct: string;
  imageUrl: string;
  musicUrl: string;
  musicName?: string;
  performanceVideo: string;
  techNotes?: string;
  lightingRequests?: string;
  soundCues?: string;
  setupForAct?: string;
  breakdownForAct?: string;
  socialMediaLinks?: {
    instagram?: string;
    faceBook?: string;
    tikTok?: string;
  };
  submitToCompetition: boolean;
};

const ActDetails = ({ act }: { act: actProps }) => {
  console.log(act);

  return (
    <div>
      <Image
        src={act?.imageUrl as string}
        alt={`photo of ${act.stageName}`}
        width={300}
        height={300}
      />
      <div className="flex gap-2">
        <h1 className="font-bold">Name of Act:</h1>
        <h3>{act.nameOfAct}</h3>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Tagline:</h1>
        <h3>{act.tagline}</h3>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Description of Act:</h1>
        <h3>{act.descriptionOfAct}</h3>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Description of Act:</h1>
        <h3>{act.descriptionOfAct}</h3>
      </div>
      <h1></h1>preferredPronouns: string;
      <h1></h1>nameOfAct: string;
      <h1></h1>descriptionOfAct: string;
      <h1></h1>imageUrl: string;
      <h1></h1>musicUrl: string;
      <h1></h1>musicName?: string;
      <h1></h1>performanceVideo: string;
      <h1></h1>techNotes?: string;
      <h1></h1>lightingRequests?: string;
      <h1></h1>soundCues?: string;
      <h1></h1>setupForAct?: string;
      <h1></h1>breakdownForAct?: string;
      <h1>
        {" "}
        socialMediaLinks?: instagram?: string; faceBook?: string; tikTok?:
        string;
      </h1>
    </div>
  );
};

export default ActDetails;
