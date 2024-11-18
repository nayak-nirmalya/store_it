import Image from "next/image";

import { signOutUser } from "@/lib/actions/user.actions";

import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";
import { FileUploader } from "@/components/file-uploader";

export function Header() {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}
