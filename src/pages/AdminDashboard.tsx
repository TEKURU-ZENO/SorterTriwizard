import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MagicalButton } from "@/components/MagicalButton";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LogOut, Users, Download, Settings } from "lucide-react";
import gryffindorCrest from "@/assets/gryffindor-crest.png";
import slytherinCrest from "@/assets/slytherin-crest.png";
import ravenclawCrest from "@/assets/ravenclaw-crest.png";
import hufflepuffCrest from "@/assets/hufflepuff-crest.png";
import jwt_decode from "jwt-decode";

interface HouseStats {
  name: string;
  crest: string;
  count: number;
  percentage: number;
  gradient: string;
}
function getCrest(house: string) {
  switch (house) {
    case "Gryffindor":
      return gryffindorCrest;
    case "Slytherin":
      return slytherinCrest;
    case "Ravenclaw":
      return ravenclawCrest;
    case "Hufflepuff":
      return hufflepuffCrest;
    default:
      return "";
  }
}
function getGradient(house: string) {
  switch (house) {
    case "Gryffindor":
      return "bg-gradient-to-r from-red-500 to-yellow-500";
    case "Slytherin":
      return "bg-gradient-to-r from-green-500 to-teal-500";
    case "Ravenclaw":
      return "bg-gradient-to-r from-blue-500 to-indigo-500";
    case "Hufflepuff":
      return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    default:
      return "";
  }
}

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(participants);
  const [maxCapacity, setMaxCapacity] = useState(25);

useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    try {
      const decoded: { exp: number; role: string } = jwtDecode(token);

      // Token expired
      if (decoded.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin-login");
      }

      // Optional: enforce role
      if (decoded.role !== "admin") {
        sessionStorage.removeItem("adminToken");
        navigate("/admin-login");
      }
    } catch (err) {
      console.error("Invalid token", err);
      sessionStorage.removeItem("adminToken");
      navigate("/admin-login");
    }
  }, [navigate]);

useEffect(() => {
  fetch("/api/participants")
    .then((res) => res.json())
    .then((data) => setParticipants(data));
}, []);
  const houseStats = useMemo(() => {
  const totals: Record<string, number> = {
    Gryffindor: 0,
    Slytherin: 0,
    Ravenclaw: 0,
    Hufflepuff: 0,
  };

  participants.forEach((p: any) => {
    if (totals[p.house] !== undefined) totals[p.house]++;
  });

  const total = participants.length || 1;
  return Object.entries(totals).map(([house, count]) => ({
    name: house,
    count,
    percentage: Math.round((count / total) * 100),
    crest: getCrest(house),
    gradient: getGradient(house),
  }));
}, [participants]);



  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Email", "House", "Department"],
      ...participants.map(p => [p.name, p.email, p.house, p.department])
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hogwarts-sorting-results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalParticipants = houseStats.reduce((sum, house) => sum + house.count, 0);

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-magical font-bold text-primary">
            🏰 Sorting Analytics Portal
          </h1>
          <p className="text-muted-foreground font-body">
            Live tracking of house assignments and participant data
          </p>
        </div>
        <div className="flex gap-3">
          <MagicalButton
            onClick={exportToCSV}
            className="font-magical"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </MagicalButton>
          <MagicalButton
            onClick={handleLogout}
            variant="outline"
            className="font-magical"
            size="lg"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </MagicalButton>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-magical text-center space-y-2">
          <Users className="mx-auto h-8 w-8 text-primary" />
          <h3 className="text-2xl font-magical font-bold text-foreground">
            {totalParticipants}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Total Sorted
          </p>
        </Card>
        
        <Card className="card-magical text-center space-y-2">
          <Settings className="mx-auto h-8 w-8 text-primary" />
          <h3 className="text-2xl font-magical font-bold text-foreground">
            {maxCapacity}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Max per House
          </p>
        </Card>

        <Card className="card-magical text-center space-y-2">
          <div className="text-2xl">🏆</div>
          <h3 className="text-2xl font-magical font-bold text-foreground">
            {houseStats.sort((a, b) => b.count - a.count)[0]?.name}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Leading House
          </p>
        </Card>

        <Card className="card-magical text-center space-y-2">
          <div className="text-2xl">⚖️</div>
          <h3 className="text-2xl font-magical font-bold text-foreground">
            {Math.round((Math.min(...houseStats.map(h => h.count)) / Math.max(...houseStats.map(h => h.count))) * 100)}%
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Balance Score
          </p>
        </Card>
      </div>

      {/* House Statistics */}
      <Card className="card-magical space-y-6">
        <h2 className="text-2xl font-magical font-bold text-foreground">
          House Distribution
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {houseStats.map((house) => (
            <div key={house.name} className="space-y-4">
              <div className="text-center space-y-3">
                <img 
                  src={house.crest} 
                  alt={`${house.name} Crest`}
                  className="w-16 h-16 mx-auto"
                />
                <h3 className="text-xl font-magical font-semibold text-foreground">
                  {house.name}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Members</span>
                  <span className="text-foreground font-semibold">
                    {house.count}/{maxCapacity}
                  </span>
                </div>
                
                <Progress 
                  value={(house.count / maxCapacity) * 100}
                  className="h-3"
                />
                
                <div className="text-center">
                  <span className="text-lg font-magical font-bold text-foreground">
                    {house.percentage}%
                  </span>
                  <span className="text-sm text-muted-foreground font-body ml-1">
                    of total
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Participants */}
      <Card className="card-magical space-y-6">
        <h2 className="text-2xl font-magical font-bold text-foreground">
          Recent Sortings
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-magical text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-magical text-foreground">Email</th>
                <th className="text-left py-3 px-4 font-magical text-foreground">House</th>
                <th className="text-left py-3 px-4 font-magical text-foreground">Department</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className="border-b border-border/30 hover:bg-muted/50">
                  <td className="py-3 px-4 font-body text-foreground">
                    {participant.name}
                  </td>
                  <td className="py-3 px-4 font-body text-muted-foreground">
                    {participant.email}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-magical font-semibold ${
                      participant.house === "Gryffindor" ? "text-red-500" :
                      participant.house === "Slytherin" ? "text-green-500" :
                      participant.house === "Ravenclaw" ? "text-blue-500" :
                      "text-yellow-500"
                    }`}>
                      {participant.house}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-body text-muted-foreground">
                    {participant.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};