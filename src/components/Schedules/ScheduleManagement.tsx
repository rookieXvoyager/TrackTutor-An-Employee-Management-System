import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, AlertTriangle, Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Schedule {
  id: string;
  course: string;
  faculty: string;
  room: string;
  time: string;
  day: string;
  duration: string;
  students: number;
  status: "confirmed" | "conflict" | "pending";
  conflictReason?: string;
}

export const ScheduleManagement = () => {
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedWeek, setSelectedWeek] = useState("current");

  const scheduleData: Schedule[] = [
    {
      id: "1",
      course: "Advanced Java Programming",
      faculty: "Dr. Sarah Johnson",
      room: "A-101",
      time: "09:00",
      day: "monday",
      duration: "90 mins",
      students: 45,
      status: "confirmed"
    },
    {
      id: "2",
      course: "Database Management",
      faculty: "Prof. Michael Chen",
      room: "B-203",
      time: "11:00",
      day: "monday",
      duration: "90 mins",
      students: 38,
      status: "conflict",
      conflictReason: "Room double-booked"
    },
    {
      id: "3",
      course: "Software Engineering",
      faculty: "Dr. Emily Rodriguez",
      room: "A-105",
      time: "14:00",
      day: "monday",
      duration: "90 mins",
      students: 42,
      status: "confirmed"
    },
    {
      id: "4",
      course: "Machine Learning",
      faculty: "Prof. David Wilson",
      room: "C-301",
      time: "16:00",
      day: "monday",
      duration: "120 mins",
      students: 35,
      status: "pending"
    }
  ];

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const timeSlots = ["09:00", "11:00", "14:00", "16:00", "18:00"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success";
      case "conflict": return "bg-destructive";
      case "pending": return "bg-warning";
      default: return "bg-muted";
    }
  };

  const conflictCount = scheduleData.filter(s => s.status === "conflict").length;
  const pendingCount = scheduleData.filter(s => s.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Schedule Management</h1>
          <p className="text-muted-foreground">
            Create and manage class schedules with conflict detection
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule
          </Button>
        </div>
      </div>

      {/* Alert Banner for Conflicts */}
      {conflictCount > 0 && (
        <Card className="border-destructive bg-destructive-light">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-3" />
              <div>
                <p className="font-medium text-destructive">
                  {conflictCount} schedule conflict{conflictCount > 1 ? 's' : ''} detected
                </p>
                <p className="text-sm text-destructive/80">
                  Please resolve conflicts to ensure smooth operations
                </p>
              </div>
              <Button variant="destructive" size="sm" className="ml-auto">
                Resolve Conflicts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">284</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">256</div>
            <p className="text-xs text-muted-foreground">90% confirmed</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conflicts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{conflictCount}</div>
            <p className="text-xs text-muted-foreground">Need resolution</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="gradient-card border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Week:</span>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="next">Next</SelectItem>
                  <SelectItem value="previous">Previous</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Day:</span>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {days.map(day => (
                    <SelectItem key={day} value={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card className="gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {timeSlots.map((timeSlot) => {
              const scheduleItem = scheduleData.find(
                s => s.time === timeSlot && s.day === selectedDay
              );

              return (
                <div key={timeSlot} className="flex items-center border rounded-lg p-4">
                  <div className="w-20 text-sm font-mono text-muted-foreground">
                    {timeSlot}
                  </div>
                  
                  {scheduleItem ? (
                    <div className="flex-1 ml-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{scheduleItem.course}</h4>
                            <Badge 
                              className={getStatusColor(scheduleItem.status)}
                            >
                              {scheduleItem.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center mt-2 text-sm text-muted-foreground space-x-4">
                            <div className="flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {scheduleItem.faculty}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              {scheduleItem.room}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {scheduleItem.duration}
                            </div>
                            <div>
                              {scheduleItem.students} students
                            </div>
                          </div>
                          
                          {scheduleItem.conflictReason && (
                            <div className="mt-2 text-sm text-destructive flex items-center">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              {scheduleItem.conflictReason}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          {scheduleItem.status === "conflict" && (
                            <Button variant="destructive" size="sm">
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 ml-4">
                      <div className="text-muted-foreground text-sm">
                        No class scheduled
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        <Plus className="mr-2 h-3 w-3" />
                        Add Class
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};