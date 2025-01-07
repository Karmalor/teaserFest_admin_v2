"use client";

import React from "react";
import { CSVLink } from "react-csv";

const CSVExportButton = ({ data }: { data: [] }) => {
  return (
    <div>
      <CSVLink data={data}>Export Showcase</CSVLink>
    </div>
  );
};

export default CSVExportButton;
