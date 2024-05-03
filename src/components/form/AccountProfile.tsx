"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validation/user";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user.image || "",
      username: user.username || "",
      name: user.name || "",
      bio: user.bio || "",
    },
  });

  const imageHandler = (e: ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    e.preventDefault();

    const reader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files))
      
      if (!file.type.includes("image")) return 

      reader.onload = async (e) => {
        const imageURL = e.target?.result?.toString() || ""
        onChange(imageURL)
      }
      reader.readAsDataURL(file)
    }
  };

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo
    const hasImageChanged = isBase64Image(blob)

    if (hasImageChanged) {
      // upload image to uploadthing
      const imageResponse = await startUpload(files)
        console.log(imageResponse)
    }

    try {
      await updateUser({
        userId: user.id,
        username: values.username,
        name: values.name,
        bio: values.bio,
        image: values.profile_photo,
        path: pathname
      })


      if(pathname === "\profile\edit"){
        router.back()
      } else {
        router.push("/")
      }
    } catch (error) {
      // Todo add appropriate error handling
      console.log(error)
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  className="account-form_image-input"
                  onChange={(e) => imageHandler(e, field.onChange)}
                  accept="image/*"
                  placeholder="Add profile photo"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                type="text"
                className="account-form_input no-focus"
                {...field} />
              </FormControl>
            </FormItem>
          )}
        />
     <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                type="text"
                className="account-form_input no-focus"
                {...field} />
              </FormControl>
            </FormItem>
          )}
        />
 <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
               Bio 
              </FormLabel>
              <FormControl>
                <Textarea
                rows={10}
                className="account-form_input no-focus"
                {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">{btnTitle}</Button>
      </form>
    </Form>
  );
}
