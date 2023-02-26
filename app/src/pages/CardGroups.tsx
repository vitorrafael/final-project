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

      <ul className="bulletless-list">
        {cardGroups.map(({ topic, description }) => (
          <li>
            <div>
              <h3>{topic}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
