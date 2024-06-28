import Link from "next/link";

import { NavHeader } from "components/NavHeader";
import { GigList } from "components/GigList";

import { AddGig } from "components/AddGig";
import { ModalProvider } from "providers/ModalProvider";
import { getServerAuthSession } from "~/server/auth";
export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main>
      <NavHeader />
      <ModalProvider>
        <AddGig session={session} />
      </ModalProvider>
      <GigList />
    </main>
  );
}
