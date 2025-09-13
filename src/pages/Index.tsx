import { useState } from "react";
import { ThemeProvider } from "@/hooks/use-theme";
import { Navbar } from "@/components/Layout/Navbar";
import { Sidebar } from "@/components/Layout/Sidebar";
import { AdminDashboard } from "@/components/Dashboard/AdminDashboard";
import { FacultyDashboard } from "@/components/Dashboard/FacultyDashboard";
import { StudentDashboard } from "@/components/Dashboard/StudentDashboard";
import { FacultyManagement } from "@/components/Faculty/FacultyManagement";
import { ScheduleManagement } from "@/components/Schedules/ScheduleManagement";
import { CourseManagement } from "@/components/Courses/CourseManagement";
import { ReportsAndAnalytics } from "@/components/Reports/ReportsAndAnalytics";
import { LoginForm } from "@/components/Auth/LoginForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>("ADMIN");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { toast } = useToast();

  const handleLogin = (role: string, credentials: { email: string; password: string }) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveTab("dashboard");
    toast({
      title: "Login successful",
      description: `Welcome to TrackTutor, ${getUserDisplayName(role)}!`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    setActiveTab("dashboard");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of TrackTutor.",
    });
  };

  const renderDashboard = () => {
    switch (userRole) {
      case "ADMIN": return <AdminDashboard />;
      case "FACULTY": return <FacultyDashboard />;
      case "STUDENT": return <StudentDashboard />;
      case "MANAGER": return <AdminDashboard />; // Manager sees admin-like dashboard
      default: return <AdminDashboard />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "faculty":
        return <FacultyManagement />;
      case "courses":
        return <CourseManagement />;
      case "schedules":
        return <ScheduleManagement />;
      case "reports":
        return <ReportsAndAnalytics />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Feature Coming Soon</h2>
              <p className="text-muted-foreground">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  const getUserDisplayName = (role?: string) => {
    const currentRole = role || userRole;
    switch (currentRole) {
      case "ADMIN": return "John Admin";
      case "FACULTY": return "Dr. Sarah Johnson";
      case "STUDENT": return "Alex Student";
      case "MANAGER": return "Mike Manager";
      default: return "User";
    }
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider defaultTheme="light">
        <LoginForm onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
      <Navbar 
        userRole={userRole}
        userName={getUserDisplayName()}
        onLogout={handleLogout}
      />
      
      <div className="flex">
        <Sidebar 
          userRole={userRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default Index;
