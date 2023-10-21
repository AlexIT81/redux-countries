import { useLocation, useParams } from "react-router-dom";


export const NotFound = () => {
  const name = useParams();
  console.log(name)

  const location = useLocation()
  console.log(location)

  return <div>This page doesn't exist </div>;
};
