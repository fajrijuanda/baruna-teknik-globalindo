"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createAdmin, updateAdmin } from "@/lib/actions/users";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().optional(),
    role: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    onSuccess?: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, onSuccess }) => {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            password: "",
            role: initialData?.role || "admin",
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            if (!initialData && !values.password) {
                form.setError("password", { message: "Password is required for new users" });
                return;
            }

            // If updating and password is empty, it won't be updated (logic in action)

            let result;
            if (initialData) {
                result = await updateAdmin(initialData.id, values as any);
            } else {
                // We know password is present thanks to check above
                result = await createAdmin(values as any);
            }

            if (result.success) {
                toast.success(initialData ? "User updated" : "User created");
                router.refresh();
                if (onSuccess) onSuccess();
            } else {
                toast.error(result.error);
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={form.formState.isSubmitting} placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={form.formState.isSubmitting} placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password {initialData && "(Leave blank to keep current)"}</FormLabel>
                            <FormControl>
                                <Input disabled={form.formState.isSubmitting} type="password" placeholder={initialData ? "******" : "Required"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select disabled={form.formState.isSubmitting} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="superadmin">Superadmin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end pt-4">
                    <Button disabled={form.formState.isSubmitting} type="submit">
                        {initialData ? "Save Changes" : "Create User"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
