import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="h-full bg-slate-200 p-2">
      <UserButton afterSwitchSessionUrl="/" />
    </main>
  );
}
