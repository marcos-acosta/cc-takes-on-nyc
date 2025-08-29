"use client";

import JoinRoom from "./components/JoinRoom";
// import styles from "./page.module.css";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomeInner() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team");
  return teamId ? <div>{teamId}</div> : <JoinRoom />;
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}
