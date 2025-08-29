"use client";

import JoinRoom from "./components/JoinRoom";
// import { useState } from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team");

  return teamId ? <div>{teamId}</div> : <JoinRoom />;
}
