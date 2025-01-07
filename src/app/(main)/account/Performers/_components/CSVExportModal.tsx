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
                <CSVLink data={data} filename={`${fileName}`}>
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
