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
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validation/thread";


export default function PostThread(userId: string) {
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
        thread: '',
        accountId: userId
        
    },
  });

  return (<>
  </>)
}