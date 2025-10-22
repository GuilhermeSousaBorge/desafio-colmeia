"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, register } = useUserStore();
  const router = useRouter();

  const handleCreateUser = <K extends keyof User>(label: K, value: User[K]) => {
    if (
      (typeof value === "string" && value.trim() === "") ||
      value === null ||
      value === undefined
    ) {
      toast.error(`Preencha o campo ${label}`);
      return;
    }

    setNewUser((prev) => ({ ...prev, [label]: value }));
  };

  const handleLogin = async () => {
    const isLoginSuccess = await login(email, password);
    if (isLoginSuccess) {
      router.push("/catalogo");
    }
    toast.error("Email ou senha incorreto");
  };

  const handleSubmit = () => {
    // valida tudo antes de mandar
    const isEmptyField = Object.entries(newUser).find(
      ([, value]) =>
        (typeof value === "string" && value.trim() === "") ||
        value === null ||
        value === undefined
    );

    if (isEmptyField) {
      toast.error(`Preencha todos os campos!`);
      return;
    }

    register(newUser);
    toast.success("Usuário cadastrado com sucesso!");
    router.push("/catalogo");
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-linear-to-br from-slate-100 to-slate-300">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-slate-200 p-1 rounded-lg">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 rounded-md py-2 transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 rounded-md py-2 transition-all"
            >
              Cadastrar
            </TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login" className="animate-fadeIn">
            <Card className="shadow-lg border border-slate-200">
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-semibold">
                  Bem-vindo 👋
                </CardTitle>
                <CardDescription>
                  Entre com sua conta para continuar
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Digite seu email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    placeholder="Digite sua senha"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={() => handleLogin()}
                >
                  Entrar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Cadastro */}
          <TabsContent value="register" className="animate-fadeIn">
            <Card className="shadow-lg border border-slate-200">
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-semibold">
                  Crie sua conta 🚀
                </CardTitle>
                <CardDescription>Leva menos de um minuto</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    onChange={(e) =>
                      handleCreateUser("name", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="email@exemplo.com"
                    type="email"
                    onChange={(e) =>
                      handleCreateUser("email", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Crie uma senha"
                    onChange={(e) =>
                      handleCreateUser(
                        "password",
                        e.target.value as User["password"]
                      )
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    onChange={(e) =>
                      handleCreateUser("phone", e.target.value as User["phone"])
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    placeholder="Rua, número, bairro..."
                    onChange={(e) =>
                      handleCreateUser(
                        "address",
                        e.target.value as User["address"]
                      )
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={handleSubmit}
                >
                  Cadastrar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
