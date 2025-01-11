import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { CSVLink } from "react-csv";

type CSVExportModalProps = {
  data: any;
  fileName: any;
};

const CSVExportModal = ({ data, fileName }: CSVExportModalProps) => {
  const desiredOrder = [
    "order",
    "stageName",
    "tagline",
    "nameOfAct",
    "descriptionOfAct",
    "setupForAct",
    "breakdownForAct",
    "soundCues",
    "techNotes",
    "lightingRequests",
    "musicName",
    "musicUrl",
    "performanceVideo",
    "imageUrl",
    "legalName",
    "preferredPronouns",
    "socialMediaLinks",
  ];

  const rearangedData = data.map((item) => {
    const orderedItem = {};
    desiredOrder.forEach((key) => {
      orderedItem[key] = item[key];
    });
    return orderedItem;
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Export Showcase</Button>
        </DialogTrigger>
        <DialogContent className="bg-[#FFF0F0]">
          <DialogHeader>
            <DialogTitle>Select columns for export</DialogTitle>
            <DialogDescription className="flex flex-col gap-4">
              Soon there will be functionality for selecting columns,a nd
              arragning before export.
              <Button onClick={() => console.log(fileName)}>
                <CSVLink data={rearangedData} filename={`${fileName}`}>
                  Export Showcase
                </CSVLink>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CSVExportModal;
