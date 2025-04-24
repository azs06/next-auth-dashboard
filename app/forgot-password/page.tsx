import ForgotPasswordForm from "@/components/forgot-password"

export default function PasswordResetPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Forgot Password</h1>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}