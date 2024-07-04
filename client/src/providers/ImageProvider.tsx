import { useState } from "react";
import { createContext } from "react";

interface ContextType {
  imageData: { [key: string]: string };
  setImageData: (value: { [key: string]: string }) => void;
}

export const ImageContext = createContext<ContextType>({
  imageData: {},
  setImageData: () => {},
});

interface PropType {
  children: React.ReactNode;
}

export default function ImageProvider({ children }: PropType) {
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});

  return (
    <ImageContext.Provider value={{ imageData, setImageData }}>
      {children}
    </ImageContext.Provider>
  );
}
