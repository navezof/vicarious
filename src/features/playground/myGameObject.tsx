import { useState } from "react";

type MyGameObjectProps = {
  newId: number;
};

export const MyGameObject = ({ newId }: MyGameObjectProps) => {
  const [id] = useState<number>(newId);

  return <div>{id}</div>;
};
