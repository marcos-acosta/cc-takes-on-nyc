"use client";

import JoinRoom from "./components/JoinRoom";
// import styles from "./page.module.css";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team");

  return <Suspense>{teamId ? <div>{teamId}</div> : <JoinRoom />}</Suspense>;
}
