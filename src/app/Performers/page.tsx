import { db } from "@/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { formSubmissionsTable } from "@/db/schema";

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
  const applications: Application[] = await db
    .select()
    .from(formSubmissionsTable)
    .orderBy(formSubmissionsTable.createdAt);

  if (!applications) {
    throw new Error("Applications not found");
  }

  const performers = JSON.parse(JSON.stringify(applications));

  const Performp = applications.map((item, index) => {
    const result = applications[index].applicantResponse;
    return result;
  });
  console.log(Performp);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-black font-bold mb-4">
        Total Applications: {Performp.length - 1}
      </h1>
      <DataTable columns={columns} data={Performp} />
    </div>
  );
}
