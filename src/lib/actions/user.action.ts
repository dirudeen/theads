"use server";

import { revalidatePath } from "next/cache";
import { User, UserType } from "../models/user.model";
import { connectToDB } from "../mongoose";

interface updateUserProps {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  bio,
  userId,
  image,
  username,
  name,
  path
}: updateUserProps): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if(path === "/profile/edit"){
    revalidatePath(path)
  }
  } catch (error) {
    throw new Error(`Failed to create/update user: ${error}`)
  }

}

export async function fetchUser(userId: string){
    connectToDB()

    try {
       return await User
        .findOne({id: userId}) as UserType
        // .populate({
        //     path: "communities"
        // })
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error}`)
    }
}