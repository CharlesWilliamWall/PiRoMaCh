import type { UserForm, User } from "@/interfaces/User";
import axios from "axios";

const BASE_URL = "/api/users";

export async function createUser(partialUser: UserForm): Promise<User | null> {
    const response = await axios.post(BASE_URL, partialUser);
    if (!response.data.error) {
        return response.data;
    } else {
        throw new Error("Client error in createUser() : " + response.data.error);
    }
}

export async function fetchCurrentUser(): Promise<User | null> {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
}
