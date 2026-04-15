import { useState } from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Clock,
  Target,
  Flame,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

type Purchase = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "gasto" | "economia";
};

const CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Vestuário",
  "Outros",
];

const MOCK_PURCHASES: Purchase[] = [
  { id: 1, description: "Supermercado", amount: 320, category: "Alimentação", date: "2026-04-12", type: "gasto" },
  { id: 2, description: "Uber", amount: 45, category: "Transporte", date: "2026-04-11", type: "gasto" },
  { id: 3, description: "Salário poupança", amount: 800, category: "Outros", date: "2026-04-05", type: "economia" },
  { id: 4, description: "Curso online", amount: 150, category: "Educação", date: "2026-04-08", type: "gasto" },
  { id: 5, description: "Freelance", amount: 500, category: "Outros", date: "2026-04-10", type: "economia" },
];

const Dashboard = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(MOCK_PURCHASES);
  const [showForm, setShowForm] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    description: "",
    amount: "",
    category: CATEGORIES[0],
    type: "gasto" as "gasto" | "economia",
  });

  const totalGastos = purchases.filter((p) => p.type === "gasto").reduce((sum, p) => sum + p.amount, 0);
  const totalEconomia = purchases.filter((p) => p.type === "economia").reduce((sum, p) => sum + p.amount, 0);
  const saldo = totalEconomia - totalGastos;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPurchase.description || !newPurchase.amount) return;
    const entry: Purchase = {
      id: Date.now(),
      description: newPurchase.description,
      amount: parseFloat(newPurchase.amount),
      category: newPurchase.category,
      date: new Date().toISOString().slice(0, 10),
      type: newPurchase.type,
    };
    setPurchases([entry, ...purchases]);
    setNewPurchase({ description: "", amount: "", category: CATEGORIES[0], type: "gasto" });
    setShowForm(false);
  };

  const meta = 2000;
  const progressPct = Math.min((totalEconomia / meta) * 100, 100);

  // Category breakdown
  const categoryTotals = CATEGORIES.map((cat) => ({
    name: cat,
    total: purchases.filter((p) => p.type === "gasto" && p.category === cat).reduce((s, p) => s + p.amount, 0),
  })).filter((c) => c.total > 0).sort((a, b) => b.total - a.total);

  return (
    <div className="flex min-h-screen" style={{ background: "#F5F0E4" }}>
      <DashboardSidebar />

      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#F5F0E4]/80 backdrop-blur-md border-b border-[#D9D0BE] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#1a1a1a]">Bom dia, Usuária ✨</h1>
            <p className="text-sm text-[#8B2246] font-medium">Abril 2026 • Acompanhe seu progresso financeiro</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#E8BE45]/15 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-[#E8BE45]" />
              <span className="text-xs font-bold text-[#C89B30]">7 dias seguidos</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C89B30] to-[#E8BE45] flex items-center justify-center text-[#1a1a1a] font-bold text-sm">
              U
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1200px]">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SummaryCard
              icon={<ShoppingBag className="w-5 h-5" />}
              label="Total Gastos"
              value={`R$ ${totalGastos.toLocaleString("pt-BR")}`}
              trend="-12% vs mês passado"
              color="#c0392b"
              arrow={<ArrowDownRight className="w-4 h-4 text-[#c0392b]" />}
            />
            <SummaryCard
              icon={<PiggyBank className="w-5 h-5" />}
              label="Total Economizado"
              value={`R$ ${totalEconomia.toLocaleString("pt-BR")}`}
              trend="+8% vs mês passado"
              color="#27ae60"
              arrow={<ArrowUpRight className="w-4 h-4 text-[#27ae60]" />}
            />
            <SummaryCard
              icon={<DollarSign className="w-5 h-5" />}
              label="Saldo do Mês"
              value={`R$ ${saldo.toLocaleString("pt-BR")}`}
              trend={saldo >= 0 ? "Positivo!" : "Negativo"}
              color={saldo >= 0 ? "#27ae60" : "#c0392b"}
              arrow={
                saldo >= 0
                  ? <TrendingUp className="w-4 h-4 text-[#27ae60]" />
                  : <TrendingDown className="w-4 h-4 text-[#c0392b]" />
              }
            />
            <SummaryCard
              icon={<Target className="w-5 h-5" />}
              label="Meta Mensal"
              value={`${progressPct.toFixed(0)}%`}
              trend={`R$ ${totalEconomia.toLocaleString("pt-BR")} / R$ ${meta.toLocaleString("pt-BR")}`}
              color="#C89B30"
              arrow={<ArrowUpRight className="w-4 h-4 text-[#C89B30]" />}
            />
          </div>

          {/* Middle row: Progress + Last Course + Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Progress bar */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-base font-semibold text-[#1a1a1a]">Meta de Economia</h3>
                <Calendar className="w-4 h-4 text-[#C89B30]" />
              </div>
              <div className="w-full h-3 bg-[#ece5d5] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #C89B30, #E8BE45)",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#8B7355]">
                <span>R$ {totalEconomia.toLocaleString("pt-BR")}</span>
                <span>R$ {meta.toLocaleString("pt-BR")}</span>
              </div>
              <p className="text-xs text-[#8B2246] mt-3 font-medium">
                {progressPct >= 100
                  ? "🎉 Parabéns! Meta atingida!"
                  : `Faltam R$ ${(meta - totalEconomia).toLocaleString("pt-BR")} para sua meta`}
              </p>
            </div>

            {/* Last Course */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-base font-semibold text-[#1a1a1a]">Último Curso Assistido</h3>
                <BookOpen className="w-4 h-4 text-[#8B2246]" />
              </div>
              <div className="bg-[#F5F0E4] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#1a1a1a] mb-1">Finanças para Mulheres</p>
                <p className="text-xs text-[#8B7355] mb-3">Módulo 3: Investimentos Básicos</p>
                <div className="w-full h-2 bg-[#D9D0BE] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "65%",
                      background: "linear-gradient(90deg, #8B2246, #c44569)",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#8B7355]">65% concluído</span>
                  <div className="flex items-center gap-1 text-[10px] text-[#8B7355]">
                    <Clock className="w-3 h-3" />
                    <span>2h restantes</span>
                  </div>
                </div>
              </div>
              <button className="mt-3 w-full text-xs font-semibold text-[#8B2246] hover:text-[#c44569] transition-colors text-center">
                Continuar assistindo →
              </button>
            </div>

            {/* Categories breakdown */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-base font-semibold text-[#1a1a1a] mb-3">Gastos por Categoria</h3>
              <div className="flex flex-col gap-2.5">
                {categoryTotals.length === 0 && (
                  <p className="text-xs text-[#8B7355]">Nenhum gasto registrado</p>
                )}
                {categoryTotals.slice(0, 4).map((cat) => (
                  <div key={cat.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#1a1a1a] font-medium">{cat.name}</span>
                      <span className="text-[#8B7355]">R$ {cat.total.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="w-full h-2 bg-[#ece5d5] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min((cat.total / totalGastos) * 100, 100)}%`,
                          background: "linear-gradient(90deg, #C89B30, #E8BE45)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-[#1a1a1a]">Movimentações</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-[#1a1a1a] cursor-pointer"
              style={{ background: "linear-gradient(135deg, #C89B30, #E8BE45)" }}
            >
              <Plus className="w-4 h-4" /> Nova Entrada
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <form
              onSubmit={handleAdd}
              className="bg-white rounded-2xl p-5 mb-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <input
                placeholder="Descrição"
                value={newPurchase.description}
                onChange={(e) => setNewPurchase({ ...newPurchase, description: e.target.value })}
                required
                className="w-full h-10 px-3.5 border-[1.5px] border-[#D9D0BE] rounded-lg bg-[#FDFAF5] text-sm text-[#1a1a1a] outline-none"
              />
              <input
                placeholder="Valor (R$)"
                type="number"
                step="0.01"
                min="0"
                value={newPurchase.amount}
                onChange={(e) => setNewPurchase({ ...newPurchase, amount: e.target.value })}
                required
                className="w-full h-10 px-3.5 border-[1.5px] border-[#D9D0BE] rounded-lg bg-[#FDFAF5] text-sm text-[#1a1a1a] outline-none"
              />
              <select
                value={newPurchase.category}
                onChange={(e) => setNewPurchase({ ...newPurchase, category: e.target.value })}
                className="w-full h-10 px-3.5 border-[1.5px] border-[#D9D0BE] rounded-lg bg-[#FDFAF5] text-sm text-[#1a1a1a] outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={newPurchase.type}
                onChange={(e) => setNewPurchase({ ...newPurchase, type: e.target.value as "gasto" | "economia" })}
                className="w-full h-10 px-3.5 border-[1.5px] border-[#D9D0BE] rounded-lg bg-[#FDFAF5] text-sm text-[#1a1a1a] outline-none"
              >
                <option value="gasto">Gasto</option>
                <option value="economia">Economia</option>
              </select>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded-full border-[1.5px] border-[#D9D0BE] bg-transparent text-sm font-semibold text-[#6b6253] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full border-none text-sm font-bold text-[#1a1a1a] cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #C89B30, #E8BE45)" }}
                >
                  Salvar
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1a1a1a] text-[#E8BE45]">
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wide">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wide">Descrição</th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wide">Categoria</th>
                  <th className="px-4 py-3 text-right text-xs font-bold tracking-wide">Valor</th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wide">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-b border-[#ece5d5] hover:bg-[#FDFAF5] transition-colors">
                    <td className="px-4 py-3 text-[#1a1a1a]">{new Date(p.date).toLocaleDateString("pt-BR")}</td>
                    <td className="px-4 py-3 text-[#1a1a1a] font-medium">{p.description}</td>
                    <td className="px-4 py-3 text-[#8B7355]">{p.category}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${p.type === "gasto" ? "text-[#c0392b]" : "text-[#27ae60]"}`}>
                      {p.type === "gasto" ? "- " : "+ "}R$ {p.amount.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          p.type === "gasto"
                            ? "bg-[#fdecea] text-[#c0392b]"
                            : "bg-[#e8f5e9] text-[#27ae60]"
                        }`}
                      >
                        {p.type === "gasto" ? "Gasto" : "Economia"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Summary Card */
const SummaryCard = ({
  icon,
  label,
  value,
  trend,
  color,
  arrow,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  color: string;
  arrow: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-xl bg-[#F5F0E4] flex items-center justify-center text-[#C89B30]">
        {icon}
      </div>
      {arrow}
    </div>
    <span className="text-xs text-[#8B7355] font-medium">{label}</span>
    <span className="text-xl font-bold" style={{ color }}>{value}</span>
    <span className="text-[10px] text-[#8B7355]">{trend}</span>
  </div>
);

export default Dashboard;
