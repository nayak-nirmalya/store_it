import { Models } from "node-appwrite";

import { Thumbnail } from "@/components/thumbnail";
import { FormattedDateTime } from "@/components/formatted-datetime";

import { convertFileSize } from "@/lib/utils";

function ImageThumbnail({ file }: { file: Models.Document }) {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <p className="file-details-label">{label}</p>
      <p className="file-details-value">{value}</p>
    </div>
  );
}

export function FileDetails({ file }: { file: Models.Document }) {
  return (
    <>
      <ImageThumbnail file={file} />
      <DetailRow label="Format:" value={file.extension} />
      <DetailRow label="Size:" value={convertFileSize(file.size)} />
      <DetailRow label="Format:" value={file.extension} />
      <DetailRow label="Format:" value={file.extension} />
    </>
  );
}
