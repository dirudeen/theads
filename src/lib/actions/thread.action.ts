"use server"
import { revalidatePath } from "next/cache";
import { Thread, ThreadType } from "../models/thread.model";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  author,
  communityId,
  path,
  text,
}: Params) {
    
    try {
    connectToDB();
    
    const createdThread = await Thread.create({
      author,
      communityId: null,
      text,
    }) as ThreadType;

    // push the new thread to the user
    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createdThread._id,
      },
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to create thread ${error} `)
  }
}
