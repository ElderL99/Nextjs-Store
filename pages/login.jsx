import clsx from "clsx";import { useForm } from "react-hook-form";
import { Login } from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

export default function LoginPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function onSubmit(data) {
      try {
        setIsSubmitting(true);
        const token = await Login(data.username, data.password);

        if (token) {
          localStorage.setItem("token", token);
          router.push("/");
          setIsSubmitting(false);
          return;
        }

        setError("root", { type: "manual", message: "Invalid username or password" });
        setIsSubmitting(false);
      } catch (error) {
        console.error("Login error:", error);
        toast.error("dates invalid")
        setError("root", { type: "manual", message: "An unexpected error occurred" });
        setIsSubmitting(false);
      }
    }

    return (
      <main className="p-4 flex flex-col gap-10">
        <h1 className="text-2xl w-full font-bold text-center">Login</h1>
        <section className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-white/10 p-4 rounded-md flex flex-col gap-4 max-w-md w-full"
          >
            <div className="flex flex-col w-full gap-1">
              <input
                type="text"
                className={clsx(
                  "bg-gray-300 border border-white/10 p-2 rounded-md",
                  { "bg-red-500/10 border-red-500": errors.username }
                )}
                placeholder="username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                })}
              />
              {errors.username && (
                <span className="text-xs text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full gap-1">
              <input
                type="password"
                className={clsx(
                  "bg-gray-300 border-white/10 p-2 rounded-md",
                  { "bg-red-500/10 border-red-500": errors.password }
                )}
                placeholder="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-white text-black font-bold p-2 rounded-md disabled:bg-neutral-600 disabled:cursor-progress"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>

            {errors.root?.message && (
              <span className="text-sm text-red-500 w-full text-center uppercase">
                {errors.root.message}
              </span>
            )}
          </form>
        </section>
      </main>
    );
}
