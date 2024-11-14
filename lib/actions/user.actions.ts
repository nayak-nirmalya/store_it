"use server";

import { ID, Query } from "node-appwrite";

import { avatarPlaceholderUrl } from "@/constants";
import { parseStringify } from "@/lib/utils";

import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

const handleError = ({
  error,
  message,
}: {
  error: unknown;
  message: string;
}) => {
  console.error(error, message);
  throw error;
};

const getUserByEmail = async ({ email }: { email: string }) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError({ error, message: "Failed to send email OTP" });
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail({ email });

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      { fullName, email, avatar: avatarPlaceholderUrl, accountId }
    );
  }

  return parseStringify({ accountId });
};
