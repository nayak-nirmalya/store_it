import React from "react";

import { Sidebar } from "@/components/sidebar";
import { MobileNavigation } from "@/components/mobile-navigation";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation />
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
}
