"use client";

import JoinRoom from "./components/JoinRoom";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import TeamPage from "./components/TeamPage";
import styles from "./page.module.css";
import { combineClasses } from "./util";

function HomeInner() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team");
  const [castingConstraintId, setCastingConstraintId] = useState<string | null>(
    null
  );
  return (
    <div
      className={combineClasses(
        styles.appOuterContainer,
        castingConstraintId && styles.noScroll
      )}
    >
      <div className={styles.appInnerContainer}>
        {teamId ? (
          <TeamPage
            teamId={teamId}
            setCastingConstraintId={setCastingConstraintId}
            castingConstraintId={castingConstraintId}
          />
        ) : (
          <JoinRoom />
        )}
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
