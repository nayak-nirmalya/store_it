import { Models } from "node-appwrite";

export function ShareInput({
  file,
  onInputChange,
  onRemove,
}: {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}) {
  return <div>ShareInput</div>;
}
