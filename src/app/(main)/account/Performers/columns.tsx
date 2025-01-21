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
  LucideEdit,
  LucideMusic,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MultiSelect } from "./_components/MultiSelect";
import { LuX } from "react-icons/lu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ActDetails from "./_components/ActDetails";
import { Input } from "@/components/ui/input";
import ShowcaseOrderInput from "./_components/ShowcaseOrderInput";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Performer = {
  applicant: string;
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
    paymentMethods?: {
      venmo?: string;
      payPal?: string;
      zelle?: string;
    };
  };
  index?: number | null;
  order: number | null;
};

export const columns: ColumnDef<Performer>[] = [
  {
    id: "select",
    size: 56, //starting column size

    header: ({ table }) => (
      <div className="mx-4">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-white"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="mx-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "uuid",
    header: "",
    cell: ({ row }) => {
      return null;
    },
  },

  {
    accessorFn: (row) => row.order, // Convert to timestamp
    id: "order",
    size: 75, //starting column size
    minSize: 50, //enforced during column resizing
    maxSize: 100,
    cell: ({ row }) => {
      const order = row.original.order; // Parse the raw value
      return (
        <div className="flex items-center gap-4">
          <ShowcaseOrderInput
            order={order}
            applicationId={row.getValue("uuid")}
          />
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "basic", // Optional: Ensure sorting works with numbers
  },

  {
    accessorKey: "stageName",
    filterFn: "includesString",
    size: 5, //starting column size
    minSize: 5, //enforced during column resizing
    maxSize: 10,
    cell: ({ row }) => {
      const photo = row.getValue("applicantResponse")?.imageUrl as string;
      return (
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger>
              <LucideEdit />
            </SheetTrigger>
            <SheetContent className=" bg-[#FFF0F0] z-[100] w-full max-w-full sm:w-[75vw] sm:max-w-[75vw] overflow-scroll">
              <SheetHeader>
                <SheetTitle className="text-4xl">
                  {row.getValue("showcases")}
                </SheetTitle>
                <SheetTitle>{row.getValue("stageName")}</SheetTitle>
                <SheetDescription>
                  <ActDetails
                    act={row.getValue("applicantResponse")}
                    showcase={"showcase"}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <div className="h-11 w-11 relative flex-none">
            {photo ? (
              <Link href={`${photo}`} target="_blank" rel="noopener noreferrer">
                <Image
                  src={photo || ""}
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
    accessorFn: (row) => row.applicantResponse.paymentMethods?.venmo,
    header: "Venmo",
    cell: ({ row }) => {
      return (
        <>
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-1 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.paymentMethods?.venmo}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.paymentMethods?.venmo}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.paymentMethods?.payPal,
    header: "payPal",
    cell: ({ row }) => {
      return (
        <>
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-1 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.paymentMethods?.payPal}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.paymentMethods?.payPal}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </>
      );
    },
  },
  {
    accessorFn: (row) => row.applicantResponse.paymentMethods?.zelle,
    header: "Zelle",
    cell: ({ row }) => {
      return (
        <>
          <Popover>
            <PopoverTrigger>
              <p className="line-clamp-1 text-ellipsis text-left">
                {row.getValue("applicantResponse")?.paymentMethods?.zelle}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                {row.getValue("applicantResponse")?.paymentMethods?.zelle}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </>
      );
    },
  },
  {
    // id: "showcase",
    accessorKey: "showcases",
    header: "Showcase(s)",
    cell: ({ row }) => {
      return (
        <div className="w-[340px]">
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
    accessorFn: (row) => row.applicant,
    header: "eMail",
    cell: ({ row }) => {
      return (
        <h1 className="text-ellipsis line-clamp-1">{row.getValue("eMail")}</h1>
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

  {
    accessorFn: (row) => new Date(row.createdAt).getTime(), // Convert to timestamp
    id: "createdAt",
    size: 75, //starting column size
    minSize: 50, //enforced during column resizing
    maxSize: 100,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt); // Parse the raw value
      return (
        <div className="flex items-center gap-4">
          {date.toLocaleDateString()} {/* Format as needed */}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "basic", // Optional: Ensure sorting works with numbers
  },
];
