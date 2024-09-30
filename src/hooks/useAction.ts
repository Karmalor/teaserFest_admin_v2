"use server";

import React from "react";

const useAction = async (formData: FormData) => {
  console.log("Select Date", formData.get("date"));
};

export default useAction;
