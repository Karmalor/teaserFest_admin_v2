import { db } from "@/db";
import { columns, Performer } from "./columns";
import { DataTable } from "./data-table";
import { formSubmissionsTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { columnsLocked } from "./columnsLocked";
import { ColumnDef } from "@tanstack/react-table";

import { CSVDownload, CSVLink } from "react-csv";
import CSVExportButton from "./_components/CSVExportButton";

interface Application {
  uuid: string;
  applicantResponse:
    | {
        nameOfAct?: string;
      }
    | unknown;
  applicationSubmitted: boolean | null;
}

export default async function DemoPage() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  console.log(userEmail);

  const applications: Application[] = await db
    .select()
    .from(formSubmissionsTable)
    .orderBy(desc(formSubmissionsTable.showcases));

  if (!applications) {
    throw new Error("Applications not found");
  }

  let tableColumns: ColumnDef<Performer>[] = [];

  if (userEmail === "suzanne.s.mcdonald@gmail.com" || "karmalor@gmail.com") {
    tableColumns = columns;
  } else {
    tableColumns = columnsLocked;
  }

  // const performers = JSON.parse(JSON.stringify(applications));

  // const Performp = applications.map((item, index) => {
  //   const result = applications[index].applicantResponse;
  //   return result;
  // });

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  return (
    <>
      <div className="mx-4 pb-10 md:pr-4">
        <h1 className="text-black font-bold mb-4 mt-4 md:mt-0">
          {/* Total Applications: {Performp.length - 1} */}
        </h1>
        <DataTable
          columns={tableColumns}
          data={applications}
          // data={sampleData}
        />
        <CSVExportButton data={applications} />
      </div>
    </>
  );
}
