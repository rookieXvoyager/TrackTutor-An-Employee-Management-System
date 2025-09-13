import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Users,
  BookOpen,
  Building2,
  BarChart3,
  Settings,
  ChevronLeft,
  Home,
  UserCheck,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  userRole: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, roles: ["ADMIN", "FACULTY", "STUDENT", "MANAGER"] },
  { id: "faculty", label: "Faculty", icon: Users, roles: ["ADMIN", "MANAGER"] },
  { id: "courses", label: "Courses", icon: BookOpen, roles: ["ADMIN", "FACULTY"] },
  { id: "rooms", label: "Rooms", icon: Building2, roles: ["ADMIN"] },
  { id: "schedules", label: "Schedules", icon: Calendar, badge: "New", roles: ["ADMIN", "FACULTY", "STUDENT"] },
  { id: "attendance", label: "Attendance", icon: UserCheck, roles: ["ADMIN", "FACULTY", "MANAGER"] },
  { id: "timetable", label: "My Timetable", icon: Clock, roles: ["FACULTY"] },
  { id: "reports", label: "Reports", icon: BarChart3, roles: ["ADMIN", "MANAGER"] },
  { id: "profile", label: "Profile", icon: FileText, roles: ["ADMIN", "FACULTY", "STUDENT", "MANAGER"] },
  { id: "settings", label: "Settings", icon: Settings, roles: ["ADMIN"] },
];

export const Sidebar = ({ userRole, activeTab, onTabChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className={cn(
      "sticky top-16 h-[calc(100vh-4rem)] bg-sidebar border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                    collapsed && "px-2"
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className={cn(
            "text-xs text-sidebar-foreground/60",
            collapsed && "text-center"
          )}>
            {collapsed ? "TT" : "TrackTutor v1.0"}
          </div>
        </div>
      </div>
    </aside>
  );
};