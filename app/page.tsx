"use client";

import JoinRoom from "./components/JoinRoom";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TeamPage from "./components/TeamPage";
import styles from "./page.module.css";

function HomeInner() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team");
  return (
    <div className={styles.appOuterContainer}>
      <div className={styles.appInnerContainer}>
        {teamId ? <TeamPage teamId={teamId} /> : <JoinRoom />}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}
