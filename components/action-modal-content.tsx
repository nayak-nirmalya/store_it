import { Models } from "node-appwrite";

import { Thumbnail } from "@/components/thumbnail";

function ImageThumbnail({ file }: { file: Models.Document }) {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    </div>
  );
}

export function FileDetails({ file }: { file: Models.Document }) {
  return (
    <>
      <ImageThumbnail file={file} />
    </>
  );
}
