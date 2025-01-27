import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

type AuthNavigationProps = {
  isAuthenticated: boolean;
};

export const useAuthDataManager = ({  isAuthenticated }: AuthNavigationProps) => {
    const queryClient = useQueryClient(); 

  useEffect(() => {
    if(!isAuthenticated){
        console.log("clearing data");
        queryClient.clear();
    }
  }, [  isAuthenticated]);

};
