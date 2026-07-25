import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const LoginPage = () => {
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

              <form className="mt-8 space-y-5">
                <div className="space-y-2">
                  <div>
                    <label htmlFor="userId" className="text-sm font-medium text-[#374151]">
                      User ID
                    </label>
                  </div>
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Enter User ID"
                    className="h-11 rounded-md border-[#d1d5db] px-3 text-sm shadow-none focus-visible:ring-2"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-[#374151]">
                      Password
                    </label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    className="h-11 rounded-md border-[#d1d5db] px-3 text-sm shadow-none focus-visible:ring-2"
                  />
                </div>

                <button type="button" className="text-sm font-medium text-[#3b82f6] hover:underline">
                  Forgot password?
                </button>

                <Button type="submit" className="h-[48px] w-full rounded-md text-sm font-medium">
                  Login
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