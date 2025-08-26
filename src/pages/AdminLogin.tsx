import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagicalButton } from "@/components/MagicalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password. Access denied.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      // Store JWT securely (session only)
      sessionStorage.setItem("adminToken", data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="card-magical w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-magical font-bold text-primary">
            🧙‍♂️ Admin Portal
          </h1>
          <p className="text-muted-foreground font-body">
            Enter the master password to access the sorting analytics
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="font-magical">
              Master Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                className="font-body pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="text-destructive text-sm font-body">{error}</p>
            )}
          </div>

          <div className="flex gap-4">
            <MagicalButton
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Back to Sorting
            </MagicalButton>
            <MagicalButton
              type="submit"
              magical
              disabled={!password.trim() || loading}
              className="flex-1"
            >
              {loading ? "Verifying..." : "Access Portal"}
            </MagicalButton>
          </div>
        </form>
      </Card>
    </div>
  );
};
