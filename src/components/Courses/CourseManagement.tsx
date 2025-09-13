import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Trash2, BookOpen, Users, Clock } from "lucide-react";

interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  duration: string;
  faculty: string;
  enrolled: number;
  capacity: number;
  status: "active" | "inactive" | "full";
  semester: string;
}

export const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const courseData: Course[] = [
    {
      id: "1",
      name: "Advanced Java Programming",
      code: "CS-401",
      department: "Computer Science",
      credits: 4,
      duration: "90 mins",
      faculty: "Dr. Sarah Johnson",
      enrolled: 45,
      capacity: 50,
      status: "active",
      semester: "Fall 2024"
    },
    {
      id: "2",
      name: "Database Management Systems",
      code: "CS-301",
      department: "Computer Science",
      credits: 3,
      duration: "90 mins",
      faculty: "Prof. Michael Chen",
      enrolled: 38,
      capacity: 40,
      status: "active",
      semester: "Fall 2024"
    },
    {
      id: "3",
      name: "Software Engineering",
      code: "CS-302",
      department: "Computer Science",
      credits: 3,
      duration: "90 mins",
      faculty: "Dr. Emily Rodriguez",
      enrolled: 42,
      capacity: 45,
      status: "active",
      semester: "Fall 2024"
    },
    {
      id: "4",
      name: "Machine Learning",
      code: "CS-501",
      department: "Computer Science",
      credits: 4,
      duration: "120 mins",
      faculty: "Prof. David Wilson",
      enrolled: 35,
      capacity: 35,
      status: "full",
      semester: "Fall 2024"
    },
    {
      id: "5",
      name: "Linear Algebra",
      code: "MATH-201",
      department: "Mathematics",
      credits: 3,
      duration: "75 mins",
      faculty: "Dr. James Smith",
      enrolled: 28,
      capacity: 40,
      status: "active",
      semester: "Fall 2024"
    }
  ];

  const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"];

  const filteredCourses = courseData.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success";
      case "full": return "bg-warning";
      case "inactive": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getEnrollmentStatus = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 100) return { status: "Full", color: "text-warning" };
    if (percentage >= 80) return { status: "Almost Full", color: "text-warning" };
    if (percentage >= 50) return { status: "Good", color: "text-success" };
    return { status: "Low Enrollment", color: "text-muted-foreground" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">
            Manage courses, enrollments, and academic programs
          </p>
        </div>
        <Button className="gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+3 new this semester</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">94% active rate</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,256</div>
            <p className="text-xs text-muted-foreground">Students enrolled</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Utilization rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="gradient-card border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card className="gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle>Course Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => {
                const enrollmentStatus = getEnrollmentStatus(course.enrolled, course.capacity);
                
                return (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <BookOpen className="mr-1 h-3 w-3" />
                          {course.code}
                          <Clock className="ml-2 mr-1 h-3 w-3" />
                          {course.duration}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        {course.faculty}
                      </div>
                    </TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.credits} credits</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {course.enrolled}/{course.capacity}
                          </span>
                          <span className={`text-xs ${enrollmentStatus.color}`}>
                            {enrollmentStatus.status}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};