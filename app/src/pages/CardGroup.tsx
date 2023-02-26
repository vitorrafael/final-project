import React, { useContext, useState } from "react";
import { CardGroupContext } from "../contexts/CardGroupContext";

export interface CardGroup {
  id: number;
  topic: string;
  description: string;
}

export function CardGroup() {
  const { selectedCardGroup } = useContext(CardGroupContext);

  return (
    <div>
      <h2>{selectedCardGroup.topic}</h2>
      <p>{selectedCardGroup.description}</p>
    </div>
  );
}
