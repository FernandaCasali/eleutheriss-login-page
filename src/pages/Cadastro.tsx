import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import laurelWreath from "@/assets/laurel-wreath.png";
import logoIcon from "@/assets/logo-icon.png";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1a1a1a]">
      {/* Laurel wreath background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={laurelWreath}
          alt=""
          width={1024}
          height={1024}
          className="w-[600px] h-[600px] object-contain opacity-40"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-card rounded-2xl shadow-2xl p-8 sm:p-10">
        <div className="space-y-1 mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Criar nova conta
          </h1>
          <p className="text-primary text-sm">
            Por favor, insira seus dados.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Nome completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-12 rounded-xl border-border bg-background"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 rounded-xl border-border bg-background"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 rounded-xl border-border bg-background"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
              Confirmar senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 h-12 rounded-xl border-border bg-background"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 rounded border-border accent-primary" required />
            <span className="text-muted-foreground">
              Concordo com os{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">Termos de Uso</a>
              {" "}e{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">Política de Privacidade</a>
            </span>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full h-12 text-base rounded-full">
            Criar Conta
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-foreground font-bold hover:text-primary transition-colors">
            Entrar
          </Link>
        </p>

        {/* Logo icon at bottom */}
        <div className="flex justify-center mt-6">
          <img src={logoIcon} alt="Eleutheriss" width={48} height={48} className="w-12 h-12 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
