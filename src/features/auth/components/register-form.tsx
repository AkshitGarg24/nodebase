"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { error } from "console";

const registerSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password and Confirm Password don't match",
        path: ["confirmPassword"]
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (value: RegisterFormValues) => {
        await authClient.signUp.email(
            {
                name: value.email,
                email: value.email,
                password: value.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    router.push("/");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            }
        )
    };

    const isPending = form.formState.isSubmitting;
    console.log(form)

    return (
        <div className="flex flex-col gap-6 w-2/5 min-w-80">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Get Started
                    </CardTitle>
                    <CardDescription>
                        Create your account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" disabled={isPending} className="w-full" type="button"><Image alt="GitHub" src="/logos/github.svg" width={20} height={20} />Continue with GitHub</Button>
                                    <Button variant="outline" disabled={isPending} className="w-full" type="button"><Image alt="Google" src="/logos/google.svg" width={20} height={20} />Continue with Google</Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="abc@example.com" disabled={isPending} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="***********" disabled={isPending} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="***********" disabled={isPending} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit" className="w-full" disabled={isPending}>Sign Up</Button>
                                    <div className="text-center text-sm">Already have an account?{" "}<Link className="underline underline-offset-4 decoration-2" href="/login">Login</Link></div>
                                </div>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );


}