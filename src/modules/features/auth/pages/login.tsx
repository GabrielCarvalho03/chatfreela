import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/lib/utils";
import { LoginForm, loginSchema } from "../hooks/use-auth/LoginSchema";
import { RegisterForm, registerSchema } from "../hooks/use-auth/RegisterSchema";
import { useAuth } from "../hooks/use-auth/use-auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, handleRegister } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const countries = [
    { code: "+55", flag: "🇧🇷", name: "Brasil" },
    { code: "+1", flag: "🇺🇸", name: "EUA" },
    { code: "+44", flag: "🇬🇧", name: "Reino Unido" },
    { code: "+33", flag: "🇫🇷", name: "França" },
    { code: "+49", flag: "🇩🇪", name: "Alemanha" },
    { code: "+34", flag: "🇪🇸", name: "Espanha" },
  ];

  // Hook form para login
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Hook form para registro
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      countryCode: "+55",
      acceptTerms: false,
    },
  });

  // Reset forms when switching tabs
  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    loginForm.reset();
    registerForm.reset();
  };

  const watchedCountryCode = registerForm.watch("countryCode");

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gray-50">
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "login" ? "Bem-vindo de volta" : "Criar conta"}
              </h1>
              <p className="text-gray-600 mt-2">
                {activeTab === "login"
                  ? "Entre na sua conta para continuar"
                  : "Preencha os dados para criar sua conta"}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => handleTabChange("login")}
                className={cn(
                  "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all",
                  activeTab === "login"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                Entrar
              </button>
              <button
                onClick={() => handleTabChange("register")}
                className={cn(
                  "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all",
                  activeTab === "register"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                Cadastrar
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="px-8 pb-8">
            {activeTab === "login" ? (
              /* Login Form */
              <form
                onSubmit={loginForm.handleSubmit((data) =>
                  handleLogin(data, navigate),
                )}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className={cn(
                      "w-full h-10 placeholder:text-gray-500 border-gray-300",
                      loginForm.formState.errors.email && "border-red-500",
                    )}
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className={cn(
                      "w-full h-10 placeholder:text-gray-500 border-gray-300",
                      loginForm.formState.errors.password && "border-red-500",
                    )}
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      {...loginForm.register("rememberMe")}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Lembrar de mim
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Esqueci a senha
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={loginForm.formState.isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
                >
                  {loginForm.formState.isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            ) : (
              /* Register Form */
              <form
                onSubmit={registerForm.handleSubmit((data) =>
                  handleRegister(data, navigate),
                )}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    className={cn(
                      "w-full h-10 placeholder:text-gray-500 border-gray-300",
                      registerForm.formState.errors.fullName &&
                        "border-red-500",
                    )}
                    {...registerForm.register("fullName")}
                  />
                  {registerForm.formState.errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {registerForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className={cn(
                      "w-full h-10 placeholder:text-gray-500 border-gray-300",
                      registerForm.formState.errors.email && "border-red-500",
                    )}
                    {...registerForm.register("email")}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Senha
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "w-full h-10 placeholder:text-gray-500 border-gray-300",
                        registerForm.formState.errors.password &&
                          "border-red-500",
                      )}
                      {...registerForm.register("password")}
                    />
                    {registerForm.formState.errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {registerForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar senha
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "w-full h-10 placeholder:text-gray-500 border-gray-300",
                        registerForm.formState.errors.confirmPassword &&
                          "border-red-500",
                      )}
                      {...registerForm.register("confirmPassword")}
                    />
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {registerForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <div className="flex gap-3">
                    {/* Country Selector */}
                    <div className="relative">
                      <select
                        value={watchedCountryCode}
                        {...registerForm.register("countryCode")}
                        className="pl-3 pr-8 border border-input rounded-lg bg-white text-sm focus:border-ring focus:ring-3 focus:ring-ring/50 outline-none h-10 placeholder:text-gray-500 border-gray-300"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className={cn(
                        "flex-1 h-10 placeholder:text-gray-500 border-gray-300",
                        registerForm.formState.errors.phone && "border-red-500",
                      )}
                      {...registerForm.register("phone")}
                    />
                  </div>
                  {registerForm.formState.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {registerForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className={cn(
                      "h-4 w-4 text-blue-600 border-gray-300 rounded mt-0.5",
                      registerForm.formState.errors.acceptTerms &&
                        "border-red-500",
                    )}
                    {...registerForm.register("acceptTerms")}
                  />
                  <div className="ml-2">
                    <span className="text-sm text-gray-600">
                      Aceito os{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        termos de uso
                      </button>{" "}
                      e
                      <button
                        type="button"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        política de privacidade
                      </button>
                    </span>
                    {registerForm.formState.errors.acceptTerms && (
                      <p className="text-red-500 text-xs mt-1">
                        {registerForm.formState.errors.acceptTerms.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={registerForm.formState.isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
                >
                  {registerForm.formState.isSubmitting
                    ? "Criando conta..."
                    : "Criar conta"}
                </Button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  ou continue com
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="w-full">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center p-3 w-full h-10"
              >
                <div className="flex gap-2 justify-center items-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Entrar com o Google</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {activeTab === "login"
              ? "Não tem uma conta? "
              : "Já tem uma conta? "}
            <button
              onClick={() =>
                handleTabChange(activeTab === "login" ? "register" : "login")
              }
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {activeTab === "login" ? "Cadastre-se grátis" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
