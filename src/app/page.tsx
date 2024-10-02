import ApplicationList from "@/components/ApplicationList";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { formSubmissionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

interface Application {
  uuid: string;
  applicantResponse:
    | {
        nameOfAct?: string;
      }
    | unknown;
  applicationSubmitted: boolean | null;
}

export default async function Home() {
  const applications: Application[] = await db

    .select()
    .from(formSubmissionsTable)
    .orderBy(formSubmissionsTable.createdAt);

  if (!applications) {
    throw new Error("Applications not found");
  }

  console.log(applications);

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href={"/account/Performers"}>
        <Button>Performers</Button>
      </Link>
      <Link href={"/account/PostCalendar"}>
        <Button>Post Calendar</Button>
      </Link>
      <Link href={"/account/PostUploader"}>
        <Button>Post Uploader</Button>
      </Link>
    </div>
    // pee
  );
}
