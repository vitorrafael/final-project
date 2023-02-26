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

  function onCardGroupPressed(cardGroupId: number) {
    console.log("Card Group selected", cardGroupId);
  }

  return (
    <>
      <h2 className="text-xl text-black text-left p-6">Card Groups</h2>

      <ul className="bulletless-list">
        {cardGroups.map(({ id, topic, description }) => (
          <li
            key={id}
            className="p-6 max-w-autox mx-auto bg-white rounded-xl shadow-lg flex-col items-start hover:bg-gray-100 hover:cursor-pointer"
          >
            <div>
              <h3 className="text-left font-medium text-black">{topic}</h3>
              <p className="text-left text-slate-500">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
