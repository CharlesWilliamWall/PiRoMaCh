import type { UserSignIn, User } from "@/interfaces/User";
import axios from "axios";

const BASE_URL = "/api/auth";

export async function signIn(data: UserSignIn): Promise<User | null> {
    const response = await axios.post(BASE_URL, data);
    if (!response.data.error) {
        return response.data;
    } else {
        throw new Error("Client error in signIn() : " + response.data.error);
    }
}

export async function signOut(): Promise<void> {
    await axios.delete(BASE_URL);
}
