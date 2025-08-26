import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MagicalButton } from "@/components/MagicalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  year: string;
  department: string;
}

export const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationData>({
    name: searchParams.get("name") || "",
    email: "",
    phone: "",
    class: "",
    section: "",
    year: "",
    department: ""
  });

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).every(value => value.trim())) {
      // Store registration data in sessionStorage for now
      sessionStorage.setItem("registrationData", JSON.stringify(formData));
      navigate("/quiz");
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim());

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="card-magical w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-magical font-bold text-primary">
            Registration Scroll
          </h1>
          <p className="text-muted-foreground font-body">
            Please provide your details before the Sorting Hat can evaluate you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-magical">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="font-body"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-magical">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@hogwarts.com"
                className="font-body"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-magical">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Your phone number"
                className="font-body"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class" className="font-magical">Class</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => handleInputChange("class", e.target.value)}
                placeholder="e.g., CSE , Mechanical etc."
                className="font-body"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="section" className="font-magical">Section</Label>
              <Select onValueChange={(value) => handleInputChange("section", value)}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                  <SelectItem value="D">Section D</SelectItem>
                  <SelectItem value="D">Section E</SelectItem>
                  <SelectItem value="D">Section F</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="font-magical">Year</Label>
              <Select onValueChange={(value) => handleInputChange("year", value)}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="department" className="font-magical">Department</Label>
              <Select onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE - Core">CSE - Core</SelectItem>
                  <SelectItem value="CSE - Emerging Tech">CSE - Emerging Tech</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Business Studies">Business Studies</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Law">Law</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <MagicalButton
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Back
            </MagicalButton>
            <MagicalButton
              type="submit"
              magical
              disabled={!isFormValid}
              className="flex-1"
            >
              Proceed to Sorting
            </MagicalButton>
          </div>
        </form>
      </Card>
    </div>
  );
};