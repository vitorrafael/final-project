import React, { useEffect, useState } from "react";

async function fetchCardGroups() {
  const response = await fetch("http://localhost:8000/api/cardGroups");
  return response.json();
}

export interface CardGroup {
  topic: string;
  description: string;
}

export function CardGroups() {
  const [cardGroups, setCardGroups] = useState<CardGroup[]>([]);

  useEffect(() => {
    fetchCardGroups().then((cardGroups) => setCardGroups(cardGroups));
  }, []);

  return (
    <>
      <h2>Card Groups</h2>

      {cardGroups.map(({ topic, description }) => (
        <div>
          <p>{topic}</p>
          <p>{description}</p>
        </div>
      ))}
    </>
  );
}
