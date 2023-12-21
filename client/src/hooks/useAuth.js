import { useSelector } from "react-redux";

const useAuth = () => {
  const userDetails = useSelector((state) => state.account);
  if (userDetails.error == "user not found") {
    return false;
  }
  return true;
};

export default useAuth;
