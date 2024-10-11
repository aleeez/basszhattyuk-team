import React from "react";
import { useHelloWorld } from "../hooks/useHello"; // Adjust the path as needed

const HelloWorld: React.FC = () => {
  const { data, isLoading } = useHelloWorld();

  if (isLoading) return <div>Loading...</div>;
  
  return <div> 
        <p>
            {data}
        </p>
     
    </div>;
};

export default HelloWorld;
