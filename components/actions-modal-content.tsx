import { Models } from "node-appwrite";
import Image from "next/image";

import { Thumbnail } from "@/components/thumbnail";
import { FormattedDateTime } from "@/components/formatted-datetime";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { convertFileSize, formatDateTime } from "@/lib/utils";

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
      <p className="file-details-label text-left">{label}</p>
      <p className="file-details-value text-left">{value}</p>
    </div>
  );
}

export function FileDetails({ file }: { file: Models.Document }) {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last Edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
}

export function ShareInput({
  file,
  onInputChange,
  onRemove,
}: {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}) {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email adress"
          onChange={(ev) => onInputChange(ev.target.value.trim().split(","))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} users
            </p>
          </div>
          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                className="flex items-center justify-between gap-2"
                key={email}
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="share-remove-user"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}