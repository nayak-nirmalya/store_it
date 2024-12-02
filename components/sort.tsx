"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";

export function Sort() {
  const router = useRouter();
  const path = usePathname();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes.at(0)?.value}>
      <SelectTrigger className="sort-select">
        <SelectValue placeholder={sortTypes.at(0)?.value} />
      </SelectTrigger>
      <SelectContent className="sort-select-content">
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.value}
            className="shad-select-item"
            value={sort.value}
          >
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
