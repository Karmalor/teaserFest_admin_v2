"use client";

import React from "react";
import { CSVLink } from "react-csv";

const CSVExportButton = ({
  data,
  fileName,
}: {
  data: [];
  fileName: string;
}) => {
  return (
    <div>
      <CSVLink data={data} filename={fileName}>
        Export Showcase
      </CSVLink>
    </div>
  );
};

export default CSVExportButton;
