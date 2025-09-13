import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, LogIn, User, Lock, UserCheck } from "lucide-react";

interface LoginFormProps {
  onLogin: (role: string, credentials: { email: string; password: string }) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const demoAccounts = [
    { role: "ADMIN", email: "admin@tracktutor.edu", password: "admin123", name: "John Admin" },
    { role: "FACULTY", email: "faculty@tracktutor.edu", password: "faculty123", name: "Dr. Sarah Johnson" },
    { role: "STUDENT", email: "student@tracktutor.edu", password: "student123", name: "Alex Student" },
    { role: "MANAGER", email: "manager@tracktutor.edu", password: "manager123", name: "Mike Manager" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && credentials.email && credentials.password) {
      onLogin(selectedRole, credentials);
    }
  };

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    setSelectedRole(account.role);
    setCredentials({
      email: account.email,
      password: account.password
    });
    onLogin(account.role, {
      email: account.email,
      password: account.password
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
            <span className="text-lg font-bold text-white">TT</span>
          </div>
          <h1 className="text-3xl font-bold">TrackTutor</h1>
          <p className="text-muted-foreground">Faculty Management System</p>
        </div>

        {/* Main Login Form */}
        <Card className="gradient-card border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole} required>
                  <SelectTrigger>
                    <UserCheck className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                    <SelectItem value="FACULTY">Faculty/Employee</SelectItem>
                    <SelectItem value="STUDENT">Student/Viewer</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full gradient-primary">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Demo Accounts</CardTitle>
            <p className="text-sm text-muted-foreground">
              Click any role below to login with demo credentials
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => (
              <div 
                key={account.role}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleDemoLogin(account)}
              >
                <div>
                  <div className="font-medium flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {account.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{account.email}</div>
                </div>
                <Badge variant="outline">{account.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="text-center text-sm text-muted-foreground">
          <p>✓ Role-based access control</p>
          <p>✓ Schedule conflict detection</p>
          <p>✓ Faculty & course management</p>
        </div>
      </div>
    </div>
  );
};