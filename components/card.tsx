import { Models } from "node-appwrite";

export function Card({ file }: { file: Models.Document }) {
  return <div>{file.name}</div>;
}
