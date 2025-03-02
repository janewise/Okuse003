import React, { useEffect, useState } from "react";
import { LoadingScreen } from "../Loading_screen/loadingscreen";

export function CoinPusher(){
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a minimum loading time of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }


    return(
        <>
        This is Coin Pusher
        </>
    )
}