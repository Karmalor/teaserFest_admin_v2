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
    <div className="flex flex-col md:flex-row gap-4 max-w-screen-sm">
      <div className="md:min-w-[500px]">
        <Image
          src={act?.imageUrl as string}
          alt={`photo of ${act.stageName}`}
          width={500}
          height={500}
        />
      </div>
      <div className="max-w-screen-sm flex flex-col gap-2 overflow-ellipsis flex-wrap">
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
          <h1 className="font-bold"> Preferred Pronouns:</h1>{" "}
          {act.preferredPronouns}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> ImageUrl:</h1> {act.imageUrl}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> MusicUrl:</h1> {act.musicUrl}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> Song Name:</h1>
          {act.musicName}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> Performance Video:</h1>{" "}
          {act.performanceVideo}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> Tech Notes:</h1>
          {act.techNotes}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> Lighting Requests:</h1>{" "}
          {act.lightingRequests}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> Sound Cues:</h1> {act.soundCues}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> Setup for Act:</h1> {act.setupForAct}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold"> Breakdown for Act:</h1>{" "}
          {act.breakdownForAct}{" "}
        </div>

        <div className="flex gap-2">
          <h1 className="font-bold">
            {" "}
            socialMediaLinks?: instagram?: string; faceBook?: string; tikTok?:
            string;
          </h1>{" "}
        </div>
      </div>
    </div>
  );
};

export default ActDetails;
