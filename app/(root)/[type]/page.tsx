import { Models } from "node-appwrite";

import { Sort } from "@/components/sort";
import { Card } from "@/components/card";

import { getFiles } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const type = (await params)?.type || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types });

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">34 MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {/* Render Files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
}
