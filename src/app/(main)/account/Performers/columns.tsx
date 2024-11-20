"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  ImageIcon,
  ImageMinus,
  LucideMusic,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MultiSelect } from "./_components/MultiSelect";
import { useState } from "react";
import { LuX } from "react-icons/lu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Performer = {
  applicantResponse: {
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
  index?: number | null;
};

export const columns: ColumnDef<Performer>[] = [
  {
    accessorKey: "uuid",
    header: "",
    cell: ({ row }) => {
      return null;
    },
  },
  {
    header: "",
    id: "row",
    size: 50,
    cell: ({ row }) => {
      return <div> {row.index} </div>;
    },
  },
  {
    accessorKey: "stageName",
    filterFn: "includesString",
    size: 75, //starting column size
    minSize: 50, //enforced during column resizing
    maxSize: 100,
    cell: ({ row }) => {
      const photo = row.getValue("applicantResponse")?.imageUrl as string;
      return (
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 relative flex-none">
            {photo ? (
              <Link href={`${photo}`} target="_blank" rel="noopener noreferrer">
                <Image
                  src={photo}
                  fill
                  className="rounded-sm object-cover"
                  alt="avatar image"
                />
              </Link>
            ) : (
              <div className="flex justify-center items-center content-center">
                <ImageIcon />
              </div>
            )}
          </div>
          <span className="w-[100px]">
            {row.getValue("applicantResponse")?.stageName}
          </span>
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stage Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: "",
    size: 0,
    cell: () => {
      return null;
    },
  },
  {
    // id: "showcase",
    accessorKey: "showcases",
    header: "Showcase(s)",
    cell: ({ row }) => {
      return (
        <div className="w-[340px]">
          {/* <Popover>
            <PopoverTrigger>
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("showcases")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("showcases")}</ScrollArea>
            </PopoverContent>
          </Popover> */}
          <MultiSelect
            // options={frameworksList}
            // onValueChange={setSelectedFrameworks}
            defaultValue={row.getValue("showcases")}
            placeholder="Select showcases"
            variant="inverted"
            animation={2}
            maxCount={3}
            applicationId={row.getValue("uuid")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "applicantResponse",
    header: "Legal Name",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <p className="line-clamp-2 text-ellipsis text-left">
            {row.getValue("applicantResponse")?.legalName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "tagline",
    header: "Tag Line",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {row.getValue("tagline")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.tagline}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "applicantResponse.preferredPronouns",
    header: "Pronouns",
  },
  {
    accessorKey: "nameOfAct",
    header: "Act Name",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.nameOfAct}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.nameOfAct}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "descriptionOfAct",
    cell: ({ row }) => {
      const description = row.getValue("applicantResponse")
        ?.descriptionOfAct as string;
      return (
        <div className="w-[250px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {description}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{description}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
    header: ({ column }) => {
      return <div>Description of Act</div>;
    },
  },

  {
    accessorKey: "musicUrl",
    cell: ({ row }) => {
      const music = row.getValue("applicantResponse")?.musicUrl as string;
      const musicName = row.getValue("applicantResponse")?.musicName as string;
      return (
        <div className="flex items-center justify-center gap-4">
          {music ? (
            <Link href={`${music}`} target="_blank" rel="noopener noreferrer">
              <LucideMusic size={32} />
            </Link>
          ) : (
            <LuX size={24} />
          )}
        </div>
      );
    },
    header: ({ column }) => {
      return <div>Music</div>;
    },
  },

  {
    accessorKey: "performanceVideo",
    size: 75, //starting column size
    minSize: 50, //enforced during column resizing
    maxSize: 100,
    cell: ({ row }) => {
      const video = row.getValue("applicantResponse")
        ?.performanceVideo as string;
      return (
        <div className="flex items-center justify-center gap-4">
          {video ? (
            <Link href={`${video}`} target="_blank" rel="noopener noreferrer">
              <Video size={32} />
            </Link>
          ) : (
            <LuX size={24} />
          )}
        </div>
      );
    },
    header: ({ column }) => {
      return <div>Video</div>;
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.techNotes,
    header: "Tech Notes",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.techNotes}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.techNotes}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.lightingRequests,
    header: "Lighting Requests",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.lightingRequests}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.lightingRequests}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.soundCues,
    header: "Sound Cues",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.soundCues}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.soundCues}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.setupForAct,
    header: "Setup for Act",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.setupForAct}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.setupForAct}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.breakdownForAct,
    header: "Breakdown for Act",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-2 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.breakdownForAct}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.breakdownForAct}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.applicantResponse.socialMediaLinks?.instagram,
    header: "Instagram",
    cell: ({ row }) => {
      return (
        <h1 className="max-w-[200px] text-ellipsis line-clamp-1">
          {row.getValue("applicantResponse")?.socialMediaLinks?.instagram}
        </h1>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.socialMediaLinks?.faceBook,
    header: "FaceBook",
    cell: ({ row }) => {
      return (
        <h1 className="max-w-[200px] text-ellipsis line-clamp-1">
          {row.getValue("applicantResponse")?.socialMediaLinks?.faceBook}
        </h1>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.socialMediaLinks?.tikTok,
    header: "Tik Tok",
    cell: ({ row }) => {
      return (
        <h1 className="max-w-[200px] text-ellipsis line-clamp-1">
          {row.getValue("applicantResponse")?.socialMediaLinks?.tikTok}
        </h1>
      );
    },
  },
  {
    id: "showcase",
    accessorKey: "showcases",
    header: "",
    filterFn: "includesString",
    cell: ({ row }) => {
      return null;
    },
  },
  {
    accessorKey: "submitToCompetition",
    cell: ({ row }) => {
      const submittedToCompetition = row.getValue("applicantResponse")
        ?.submitToCompetition as boolean;
      return (
        <div className="flex items-center justify-center gap-4">
          {submittedToCompetition && <Check />}
        </div>
      );
    },
    header: ({ column }) => {
      return <div>Submitteed for Competition</div>;
    },
  },
];
