"use client";

import JoinRoom from "./components/JoinRoom";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TeamPage from "./components/TeamPage";

function HomeInner() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team");
  return teamId ? <TeamPage teamId={teamId} /> : <JoinRoom />;
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}
