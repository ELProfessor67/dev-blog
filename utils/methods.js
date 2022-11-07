import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const passwordMatch = async (password, DBpassword) => {
    return await compare(password, DBpassword);
}

export const jwtToken = async (id) => {
    return await sign({_id: id},process.env.JWT_SECRET,{
        expiresIn: Number(process.env.TOKEN_EXPIRE) * 24 * 60 * 60 * 1000,
    });
}