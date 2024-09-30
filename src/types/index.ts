import { Dispatch, SetStateAction } from "react";
// import { v4 as uuidv4 } from "uuid";

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== ORDER PARAMS
// export type CheckoutOrderParams = {
//   eventTitle: string;
//   eventId: string;
//   price: string;
//   isFree: boolean;
//   buyerId: string;
// };

export type CreateOrderParams = {
  stripeId: string;
  buyerId: string;
  amount: string;
  createdAt: Date | string;
};

// export type GetOrdersByEventParams = {
//   eventId: string;
//   searchString: string;
// };

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== APPLICATION PARAMS
export type CreateApplicationParams = {
  applicant: string;
  stageName: string;
  tagline: string;
  applicationSubmitted: boolean;
  applicantResponse: object | null;
  createdAt: Date;
};

export type applicantResponse = {
  tagline: string;
  stageName: string;
};

export type fileUploaderProps = {
  imageUrl: string | undefined;
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export type CreateMarketingPostParams = {
  imageUrl?: string | null;
  copy?: string | null;
  date?: string | null;
};
