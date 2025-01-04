// import { SelectFormSubmission } from "@/db/schema";
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
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:min-w-[500px]">
        <Image
          src={act?.imageUrl as string}
          alt={`photo of ${act.stageName}`}
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col justify-start text-left gap-4 break-words overflow-auto">
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Name of Act:</h1>
          <h3>{act.nameOfAct}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Tagline:</h1>
          <h3>{act.tagline}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Description of Act:</h1>
          <h3>{act.descriptionOfAct}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Preferred Pronouns:</h1>
          <h3>{act.preferredPronouns}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Image URL:</h1>
          <h3 className="truncate">{act.imageUrl}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Music URL:</h1>
          <h3 className="truncate">{act.musicUrl}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Song Name:</h1>
          <h3>{act.musicName}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Performance Video:</h1>
          <h3 className="truncate">{act.performanceVideo}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Tech Notes:</h1>
          <h3>{act.techNotes}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Lighting Requests:</h1>
          <h3>{act.lightingRequests}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Sound Cues:</h1>
          <h3>{act.soundCues}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Setup for Act:</h1>
          <h3>{act.setupForAct}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Breakdown for Act:</h1>
          <h3>{act.breakdownForAct}</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Social Media Links:</h1>
          <div>
            <p>Instagram: {act.socialMediaLinks?.instagram}</p>
            <p>Facebook: {act.socialMediaLinks?.faceBook}</p>
            <p>TikTok: {act.socialMediaLinks?.tikTok}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActDetails;
