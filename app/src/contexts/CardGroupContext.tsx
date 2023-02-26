import { createContext, PropsWithChildren, useState } from "react";

interface SelectedCardGroupContext {
    selectedCardGroup: any;
    setSelectedCardGroup: (args: any) => void;
}

export const CardGroupContext = createContext({} as SelectedCardGroupContext);

export function CardGroupContextProvider({ children }: PropsWithChildren) {
  const [selectedCardGroup, setSelectedCardGroup] = useState(null);

  return (
    <CardGroupContext.Provider
      value={{ selectedCardGroup, setSelectedCardGroup }}
    >
      {children}
    </CardGroupContext.Provider>
  );
}
