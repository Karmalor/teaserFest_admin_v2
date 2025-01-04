import { Input } from "@/components/ui/input";
import React from "react";
import { UpdateShowcaseOrderById } from "../_actions/performer.actions";

interface ShowcaseOrderInputProps {
  order: number;
  applicationId: string;
}

const ShowcaseOrderInput = ({
  order,
  applicationId,
}: ShowcaseOrderInputProps) => {
  const onValueChange = async (value: number) => {
    await UpdateShowcaseOrderById(applicationId, value);
  };

  return (
    <div>
      <Input
        type="number"
        defaultValue={order}
        onChangeCapture={(e) => onValueChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default ShowcaseOrderInput;
