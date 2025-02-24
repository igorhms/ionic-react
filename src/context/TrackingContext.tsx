import { createContext, useContext, useState, ReactNode } from "react";

interface TrackingContextType {
  trackedPatients: number[];
  addToTracking: (id: number) => void;
  removeFromTracking: (id: number) => void;
}

const TrackingContext = createContext<TrackingContextType | undefined>(
  undefined
);

export const TrackingProvider = ({ children }: { children: ReactNode }) => {
  const [trackedPatients, setTrackedPatients] = useState<number[]>([]);

  const addToTracking = (id: number) => {
    setTrackedPatients((prev) => [...prev, id]);
  };

  const removeFromTracking = (id: number) => {
    setTrackedPatients((prev) => prev.filter((patientId) => patientId !== id));
  };

  return (
    <TrackingContext.Provider
      value={{ trackedPatients, addToTracking, removeFromTracking }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context)
    throw new Error("useTracking must be used within a TrackingProvider");

  return context;
};
