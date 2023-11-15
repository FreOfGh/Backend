import User from "../../models/user.ts";

type GetUserResponse = {
    success: boolean,
    data: User
}

export default GetUserResponse;