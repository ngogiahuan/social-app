import { postDataApi } from "@/api/config";
import { UserType } from "@/types/userType";
import { toast } from "react-toastify";

type RegisterParams = {
  userName: string;
  fullName: string;
  gender: string;
  email: string;
  password: string;
};

interface RegisterResponse {
  msg: string;
  isSuccess: boolean;
  data: UserType;
  accesstoken: string;
}

export const register = async (
  { userName, fullName, gender, email, password }: RegisterParams,
  handleIsLoading: (flag: boolean) => void
) => {
  try {
    handleIsLoading(true);
    const res = await postDataApi("/register", "", {
      userName,
      fullName,
      gender,
      email,
      password,
    });
    const result = res.data as RegisterResponse;
    if (result.isSuccess) {
      handleIsLoading(false);
      toast.success(result.msg);
    } else {
      handleIsLoading(false);
      toast.error(result.msg);
    }
  } catch (error) {
    handleIsLoading(false);
    console.log("Error: ", error);
  }
};
