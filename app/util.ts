import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Team } from "./interfaces";

export const convertDbTeamDocToClientTeam = (
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  const data = doc.data();
  const teamData = {
    ...data,
    constraints: data["constraints"].map((placedConstraint: any) => ({
      ...placedConstraint,
      timestamp: placedConstraint["timestamp"].toDate(),
    })),
  };
  return teamData as Team;
};
