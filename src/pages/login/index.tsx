import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { loginApi } from "@/services/auth"
import useUser from "@/store/useUser"
import { loginSchema, type LoginFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useShallow } from "zustand/react/shallow"

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useUser(useShallow((s) => {
    return {
      setToken: s.setToken,
      setUser: s.setUser,
    }
  }))
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "vedant-admin",
      password: "vedant123",
    },
  })
  const onSubmit = async (data: LoginFormSchema) => {
    try {
      const response = await loginApi(data)
      if (response.status === 'success') {
        setToken(response.data.token)
        setUser(response.data.user)
        navigate('/task/create')
      }
    } catch (error) {
      const errorResponse = error.response?.data;
      if (errorResponse.status === 'error') {
        toast.add({ title: "Error", description: errorResponse.message })
      } else {
        toast.add({ title: 'Error', description: 'Something went wrong' })
      }
    }
  }
  return (
    <section className="w-full r bg-[#f5f9ff]">
      <div className="grid min-h-screen grid-cols-1 rounded-lg md:grid-cols-2">
        <div className="hidden items-center justify-center rounded-l-lg bg-[#f5f9ff] p-8 md:flex">
          <img
            src="/login-left-image.svg"
            alt="Login side illustration"
            className="w-full max-w-md"
          />
        </div>

        <div className="flex items-center justify-center p-4">
          <div className="border flex items-center justify-center p-6 w-full h-full sm:p-10 bg-white rounded-lg">
            <div className="w-[80%] ">
              <img src="/preproute-logo.svg" alt="PrepRoute logo" className="h-8 w-auto" />

              <h1 className="mt-6 text-[1.75rem] leading-none font-medium text-[#111827]">Login</h1>
              <p className="mt-3 text-[0.813rem] text-[#6b7280]">
                Use your company provided Login credentials
              </p>

              <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Controller
                    name="userId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-medium text-[#374151]" htmlFor="userId">
                          Bug Title
                        </FieldLabel>
                        <Input
                          {...field}
                          id="userId"
                          type="text"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter User ID"
                          autoComplete="off"
                          className="h-11 rounded-md border-[#d1d5db] px-3 text-sm shadow-none focus-visible:ring-2"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-medium text-[#374151]" htmlFor="password">
                          Password
                        </FieldLabel>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Password"
                          autoComplete="off"
                          className="h-11 rounded-md border-[#d1d5db] px-3 text-sm shadow-none focus-visible:ring-2"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <button type="button" className="text-sm font-medium text-[#3b82f6] hover:underline">
                  Forgot password?
                </button>
                <Button type="submit" className="h-[48px] w-full rounded-md text-sm font-medium" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader size={20} />} Login
                </Button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage