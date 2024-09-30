import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostScheduler } from "@/lib/validator";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createMarketingPost } from "@/lib/actions/post.actions";

const page = () => {
  const [date, setDate] = React.useState<string>("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [calendarValue, setCalendarValue] = React.useState<Date | undefined>(
    new Date()
  );
  const form = useForm<z.infer<typeof PostScheduler>>({
    mode: "onSubmit",
    resolver: zodResolver(PostScheduler),
  });

  async function onSubmit(data: z.infer<typeof PostScheduler>) {
    alert("congrations!");

    const formData = {
      ...data,
    };

    await createMarketingPost(formData);

    console.log(formData);
  }

  return (
    <div className="flex items-center justify-around mt-8">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-6"
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <div className="">
                      {/* <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    /> */}
                      {uploadedImage ? (
                        <div
                          className="mt-2 flex flex-col items-center justify-center rounded-lg border border-black text-center h-[245px] px-6 py-2 ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer
                      "
                        >
                          <div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50 items-center justify-center">
                            <Suspense fallback={<h1>Loading Image...</h1>}>
                              <a
                                target="_blank"
                                href={uploadedImage}
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={uploadedImage}
                                  alt=""
                                  width={250}
                                  height={250}
                                />
                              </a>
                            </Suspense>
                          </div>

                          <Button
                            type={"button"}
                            onClick={() => setUploadedImage("")}
                            className="group relative mt-4 mb-4 flex h-10 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-md border-none text-base text-white after:transition-[width] after:duration-500 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 bg-black p-4 disabled:pointer-events-none"
                            data-ut-element="button"
                            data-state="ready"
                          >
                            Change Photo
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <UploadDropzone
                            className="ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              alert("Congrats!");
                              form.setValue("imageUrl", `${res[0].url}`);
                              setUploadedImage(res[0].url);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    {/* {files.length > 0 && (
                    <div>
                      <Button onClick={handleUpload}>Upload Image</Button>
                    </div>
                  )} */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Of the Act</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter tech notes..."
                      {...field}
                      className="border border-black h-60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Date</FormLabel>
                    <FormControl>
                      <div>
                        <Calendar
                          mode="single"
                          selected={calendarValue}
                          onSelect={(date) => {
                            setCalendarValue(date);
                            setDate(date?.toISOString());
                            form.setValue("date", date?.toISOString());

                            console.log("Calendar Date Selected:", date); // Log selected date from Calendar
                          }}
                          className="rounded-md border shadow flex justify-center"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="my-4"
              // onClick={handleSubmitForm}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      {/* <PostExhibitor /> */}
    </div>
  );
};

export default page;
