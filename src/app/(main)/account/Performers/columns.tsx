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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Performer = {
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

export const columns: ColumnDef<Performer>[] = [
  {
    accessorKey: "stageName",
    size: 75, //starting column size
    minSize: 50, //enforced during column resizing
    maxSize: 100,
    cell: ({ row }) => {
      const photo = row.getValue("imageUrl") as string;
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
          <span className="w-[100px]">{row.getValue("stageName")}</span>
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
    accessorKey: "legalName",
    header: "Legal Name",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <p className="line-clamp-3 text-ellipsis text-left">
            {row.getValue("legalName")}
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
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("tagline")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("tagline")}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "preferredPronouns",
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
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("nameOfAct")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("nameOfAct")}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "descriptionOfAct",
    cell: ({ row }) => {
      const description = row.getValue("descriptionOfAct") as string;
      return (
        <div className="w-[250px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-3 text-ellipsis text-left">
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
      const music = row.getValue("musicUrl") as string;
      const musicName = row.getValue("musicName") as string;

      return (
        <div className="flex items-center justify-center gap-4">
          <Link href={`${music}`} target="_blank" rel="noopener noreferrer">
            <LucideMusic size={32} />
          </Link>
          <p>{musicName}</p>
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
      const video = row.getValue("performanceVideo") as string;
      return (
        <div className="flex items-center justify-center gap-4">
          <Link href={`${video}`} target="_blank" rel="noopener noreferrer">
            <Video size={32} />
          </Link>
        </div>
      );
    },
    header: ({ column }) => {
      return <div>Video</div>;
    },
  },
  {
    accessorKey: "techNotes",
    header: "Tech Notes",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("techNotes")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("techNotes")}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "lightingRequests",
    header: "Lighting Requests",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("lightingRequests")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("lightingRequests")}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "soundCues",
    header: "Sound Cues",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("soundCues")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("soundCues")}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "setupForAct",
    header: "Setup for Act",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("setupForAct")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("setupForAct")}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "breakdownForAct",
    header: "Breakdown for Act",
    cell: ({ row }) => {
      return (
        <div className="w-[140px]">
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-3 text-ellipsis text-left">
                {row.getValue("breakdownForAct")}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>{row.getValue("breakdownForAct")}</ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "socialMediaLinks.instagram",
    header: "Instagram",
  },
  {
    accessorKey: "socialMediaLinks.faceBook",
    header: "FaceBook",
  },
  {
    accessorKey: "socialMediaLinks.tikTok",
    header: "Tik Tok",
  },

  {
    accessorKey: "submitToCompetition",
    cell: ({ row }) => {
      const submittedToCompetition = row.getValue(
        "submitToCompetition"
      ) as boolean;
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
