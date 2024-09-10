import { useEffect, useState } from "react";

const useClientSide = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  return isClient;
};

export default useClientSide;
