import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, BookOpen, Users, MapPin, Bell } from "lucide-react";

export const FacultyDashboard = () => {
  const todayClasses = [
    {
      id: 1,
      course: "Advanced Java Programming",
      time: "09:00 - 10:30",
      room: "A-101",
      students: 45,
      status: "upcoming"
    },
    {
      id: 2,
      course: "Database Management",
      time: "11:00 - 12:30",
      room: "B-203",
      students: 38,
      status: "current"
    },
    {
      id: 3,
      course: "Software Engineering",
      time: "14:00 - 15:30",
      room: "A-105",
      students: 42,
      status: "upcoming"
    }
  ];

  const weeklyStats = [
    { label: "Classes This Week", value: "12", icon: Calendar },
    { label: "Total Students", value: "156", icon: Users },
    { label: "Active Courses", value: "4", icon: BookOpen },
    { label: "Hours Scheduled", value: "18", icon: Clock }
  ];

  const notifications = [
    {
      id: 1,
      message: "Room change for Database Management class",
      time: "30 minutes ago",
      type: "warning"
    },
    {
      id: 2,
      message: "New student enrolled in Advanced Java",
      time: "2 hours ago",
      type: "info"
    },
    {
      id: 3,
      message: "Assignment submission deadline tomorrow",
      time: "4 hours ago",
      type: "reminder"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Johnson! Here's your schedule for today.
          </p>
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          View Full Schedule
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {weeklyStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="gradient-card border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Classes */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((class_) => (
              <div key={class_.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex-1">
                  <h4 className="font-medium">{class_.course}</h4>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {class_.time}
                    <MapPin className="ml-3 mr-1 h-3 w-3" />
                    {class_.room}
                    <Users className="ml-3 mr-1 h-3 w-3" />
                    {class_.students} students
                  </div>
                </div>
                <Badge 
                  variant={class_.status === 'current' ? 'default' : 'secondary'}
                  className={class_.status === 'current' ? 'animate-pulse' : ''}
                >
                  {class_.status === 'current' ? 'Live' : 'Upcoming'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-warning" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  notification.type === 'warning' ? 'bg-warning' :
                  notification.type === 'info' ? 'bg-primary' :
                  'bg-accent'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Update Course Material
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Request Schedule Change
            </Button>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              View Student List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};