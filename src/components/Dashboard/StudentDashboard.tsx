import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, User, Search, Filter, BookOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StudentDashboard = () => {
  const todaySchedule = [
    {
      id: 1,
      course: "Advanced Java Programming",
      faculty: "Dr. Sarah Johnson",
      time: "09:00 - 10:30",
      room: "A-101",
      status: "upcoming"
    },
    {
      id: 2,
      course: "Database Management",
      time: "11:00 - 12:30",
      faculty: "Prof. Michael Chen",
      room: "B-203",
      status: "current"
    },
    {
      id: 3,
      course: "Software Engineering",
      time: "14:00 - 15:30",
      faculty: "Dr. Emily Rodriguez",
      room: "A-105",
      status: "upcoming"
    }
  ];

  const facultyDirectory = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      office: "CS-201",
      email: "sarah.johnson@university.edu",
      nextClass: "Tomorrow 9:00 AM"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      department: "Mathematics",
      office: "MATH-101",
      email: "michael.chen@university.edu",
      nextClass: "Today 2:00 PM"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Alex! Check your schedule and faculty information.
          </p>
        </div>
        <Button variant="outline">
          <BookOpen className="mr-2 h-4 w-4" />
          View All Courses
        </Button>
      </div>

      {/* Today's Schedule */}
      <Card className="gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaySchedule.map((class_) => (
            <div key={class_.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex-1">
                <h4 className="font-medium">{class_.course}</h4>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {class_.time}
                  <MapPin className="ml-3 mr-1 h-3 w-3" />
                  {class_.room}
                  <User className="ml-3 mr-1 h-3 w-3" />
                  {class_.faculty}
                </div>
              </div>
              <Badge 
                variant={class_.status === 'current' ? 'default' : 'secondary'}
                className={class_.status === 'current' ? 'animate-pulse bg-success' : ''}
              >
                {class_.status === 'current' ? 'Live Now' : 'Upcoming'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Faculty Directory Search */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Faculty Directory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search faculty..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Dept" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              {facultyDirectory.map((faculty) => (
                <div key={faculty.id} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{faculty.name}</h4>
                      <p className="text-sm text-muted-foreground">{faculty.department}</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {faculty.office}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Schedule
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-accent">
                    Next class: {faculty.nextClass}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg border bg-card">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Classes</div>
              </div>
              <div className="text-center p-3 rounded-lg border bg-card">
                <div className="text-2xl font-bold text-accent">8</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center p-3 rounded-lg border bg-card">
                <div className="text-2xl font-bold text-success">36</div>
                <div className="text-sm text-muted-foreground">Hours</div>
              </div>
              <div className="text-center p-3 rounded-lg border bg-card">
                <div className="text-2xl font-bold text-warning">12</div>
                <div className="text-sm text-muted-foreground">Faculty</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};