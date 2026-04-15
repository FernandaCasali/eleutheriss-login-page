import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  ShoppingBag,
  LogOut,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import logoIcon from "@/assets/$.png";

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

  // Monthly progress bar
  const meta = 2000;
  const progressPct = Math.min((totalEconomia / meta) * 100, 100);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E4", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2a2520 100%)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logoIcon} alt="Eleutheriss" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#E8BE45",
            }}
          >
            Eleutheriss
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "#d4c9b0" }}>Olá, Usuária ✨</span>
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#E8BE45",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            <LogOut style={{ width: 14, height: 14 }} /> Sair
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px" }}>
        {/* Greeting */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#1a1a1a",
            margin: 0,
            marginBottom: 4,
          }}
        >
          Seu Painel Financeiro
        </h1>
        <p style={{ fontSize: 14, color: "#8B2246", fontWeight: 500, margin: 0, marginBottom: 24 }}>
          Acompanhe seus gastos, economias e conquistas do mês 💪
        </p>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <SummaryCard
            icon={<ShoppingBag style={{ width: 20, height: 20 }} />}
            label="Total Gastos"
            value={`R$ ${totalGastos.toLocaleString("pt-BR")}`}
            color="#c0392b"
            arrow={<ArrowDownRight style={{ width: 14, height: 14, color: "#c0392b" }} />}
          />
          <SummaryCard
            icon={<PiggyBank style={{ width: 20, height: 20 }} />}
            label="Total Economizado"
            value={`R$ ${totalEconomia.toLocaleString("pt-BR")}`}
            color="#27ae60"
            arrow={<ArrowUpRight style={{ width: 14, height: 14, color: "#27ae60" }} />}
          />
          <SummaryCard
            icon={<DollarSign style={{ width: 20, height: 20 }} />}
            label="Saldo do Mês"
            value={`R$ ${saldo.toLocaleString("pt-BR")}`}
            color={saldo >= 0 ? "#27ae60" : "#c0392b"}
            arrow={
              saldo >= 0 ? (
                <TrendingUp style={{ width: 14, height: 14, color: "#27ae60" }} />
              ) : (
                <TrendingDown style={{ width: 14, height: 14, color: "#c0392b" }} />
              )
            }
          />
        </div>

        {/* Progress */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 28,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, margin: 0, color: "#1a1a1a" }}>
                Meta de Economia do Mês
              </h3>
              <p style={{ fontSize: 12, color: "#8B2246", margin: 0 }}>
                {progressPct.toFixed(0)}% da meta de R$ {meta.toLocaleString("pt-BR")}
              </p>
            </div>
            <Calendar style={{ width: 18, height: 18, color: "#C89B30" }} />
          </div>
          <div
            style={{
              width: "100%",
              height: 14,
              background: "#ece5d5",
              borderRadius: 100,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPct}%`,
                height: "100%",
                background: "linear-gradient(90deg, #C89B30, #E8BE45)",
                borderRadius: 100,
                transition: "width 0.6s ease",
              }}
            />
          </div>
        </div>

        {/* Add new + table */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
              color: "#1a1a1a",
            }}
          >
            Movimentações
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "linear-gradient(135deg, #C89B30, #E8BE45)",
              border: "none",
              borderRadius: 100,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 700,
              color: "#1a1a1a",
              cursor: "pointer",
            }}
          >
            <Plus style={{ width: 15, height: 15 }} /> Nova Entrada
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleAdd}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "20px 24px",
              marginBottom: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <input
              placeholder="Descrição"
              value={newPurchase.description}
              onChange={(e) => setNewPurchase({ ...newPurchase, description: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              placeholder="Valor (R$)"
              type="number"
              step="0.01"
              min="0"
              value={newPurchase.amount}
              onChange={(e) => setNewPurchase({ ...newPurchase, amount: e.target.value })}
              required
              style={inputStyle}
            />
            <select
              value={newPurchase.category}
              onChange={(e) => setNewPurchase({ ...newPurchase, category: e.target.value })}
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={newPurchase.type}
              onChange={(e) => setNewPurchase({ ...newPurchase, type: e.target.value as "gasto" | "economia" })}
              style={inputStyle}
            >
              <option value="gasto">Gasto</option>
              <option value="economia">Economia</option>
            </select>
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  border: "1.5px solid #D9D0BE",
                  background: "transparent",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#6b6253",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  border: "none",
                  background: "linear-gradient(135deg, #C89B30, #E8BE45)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1a1a1a",
                  cursor: "pointer",
                }}
              >
                Salvar
              </button>
            </div>
          </form>
        )}

        {/* Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1a1a1a", color: "#E8BE45" }}>
                <th style={thStyle}>Data</th>
                <th style={thStyle}>Descrição</th>
                <th style={thStyle}>Categoria</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Valor</th>
                <th style={thStyle}>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #ece5d5" }}>
                  <td style={tdStyle}>{new Date(p.date).toLocaleDateString("pt-BR")}</td>
                  <td style={tdStyle}>{p.description}</td>
                  <td style={tdStyle}>{p.category}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontWeight: 600, color: p.type === "gasto" ? "#c0392b" : "#27ae60" }}>
                    {p.type === "gasto" ? "- " : "+ "}R$ {p.amount.toLocaleString("pt-BR")}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 600,
                        background: p.type === "gasto" ? "#fdecea" : "#e8f5e9",
                        color: p.type === "gasto" ? "#c0392b" : "#27ae60",
                      }}
                    >
                      {p.type === "gasto" ? "Gasto" : "Economia"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

/* Small components */
const SummaryCard = ({
  icon,
  label,
  value,
  color,
  arrow,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  arrow: React.ReactNode;
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: "18px 20px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5F0E4", display: "flex", alignItems: "center", justifyContent: "center", color: "#C89B30" }}>
        {icon}
      </div>
      {arrow}
    </div>
    <span style={{ fontSize: 12, color: "#8B7355", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'Inter', sans-serif" }}>{value}</span>
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 42,
  padding: "0 14px",
  border: "1.5px solid #D9D0BE",
  borderRadius: 10,
  background: "#FDFAF5",
  fontSize: 13,
  color: "#1a1a1a",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const thStyle: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.03em",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  color: "#1a1a1a",
};

export default Dashboard;
