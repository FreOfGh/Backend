import User from "../../models/user.ts";

type RegisterResponse = {
    success: boolean;
    data: {
        user: User,
        token: string
    }
}

export default RegisterResponse;