import { publicRequest} from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log("res>>..", res)
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log("error", error)
    dispatch(loginFailure());
  }
};
