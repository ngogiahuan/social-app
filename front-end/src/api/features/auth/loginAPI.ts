import { postDataApi } from "../../config";
import { LoginUserStateSlice } from "@/redux/feature/loginUser/loginUserSlice";
import { UserType } from "@/types/userType";
import { toast } from "react-toastify";

interface LoginResponse {
  msg: string;
  isSuccess: boolean;
  data: UserType;
  accesstoken: string;
}

export const login = async (
  userName: string,
  password: string,
  dispatch: any,
  handleIsLoading: (flag: boolean) => void
) => {
  try {
    handleIsLoading(true);
    const res = await postDataApi("/login", "", { userName, password });
    const result = res.data as LoginResponse;
    if (result.isSuccess) {
      dispatch(
        LoginUserStateSlice.actions.login({
          user: result.data,
          token: result.accesstoken,
        })
      );
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
