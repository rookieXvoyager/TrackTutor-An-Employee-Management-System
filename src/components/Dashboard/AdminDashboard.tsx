import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  BookOpen,
  Building2,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";

export const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Faculty",
      value: "142",
      change: "+12%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Active Courses",
      value: "48",
      change: "+8%",
      icon: BookOpen,
      trend: "up"
    },
    {
      title: "Scheduled Classes",
      value: "284",
      change: "+15%",
      icon: Calendar,
      trend: "up"
    },
    {
      title: "Available Rooms",
      value: "32",
      change: "0%",
      icon: Building2,
      trend: "neutral"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New faculty member added",
      user: "Dr. Sarah Johnson",
      time: "2 hours ago",
      type: "success"
    },
    {
      id: 2,
      action: "Schedule conflict resolved",
      user: "Room A-101",
      time: "4 hours ago",
      type: "warning"
    },
    {
      id: 3,
      action: "Course curriculum updated",
      user: "Computer Science",
      time: "6 hours ago",
      type: "info"
    }
  ];

  const pendingTasks = [
    { id: 1, task: "Review leave applications", count: 5, priority: "high" },
    { id: 2, task: "Approve schedule changes", count: 8, priority: "medium" },
    { id: 3, task: "Update room assignments", count: 3, priority: "low" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your institution's faculty and schedules
          </p>
        </div>
        <Button className="gradient-primary">
          <Calendar className="mr-2 h-4 w-4" />
          Create Schedule
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="gradient-card border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs flex items-center mt-1 ${
                  stat.trend === 'up' ? 'text-success' : 
                  stat.trend === 'down' ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pending Tasks */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.task}</p>
                  <div className="flex items-center mt-1">
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : 
                               task.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {task.count} items
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success' :
                  activity.type === 'warning' ? 'bg-warning' :
                  'bg-primary'
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-success" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Database Performance</span>
                <span className="text-success">98%</span>
              </div>
              <Progress value={98} className="mt-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Server Uptime</span>
                <span className="text-success">99.9%</span>
              </div>
              <Progress value={99.9} className="mt-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Active Users</span>
                <span className="text-warning">78%</span>
              </div>
              <Progress value={78} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};