import User from "../../models/user.ts";

type LoginResponse = {
    success: boolean;
    data: {
        user: User,
        token: string
    }
}

export default LoginResponse;