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
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";

interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: "active" | "inactive";
  joiningDate: string;
  coursesCount: number;
}

export const FacultyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data
  const facultyData: Faculty[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      phone: "+1 234-567-8901",
      department: "Computer Science",
      designation: "Professor",
      status: "active",
      joiningDate: "2019-08-15",
      coursesCount: 3
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      phone: "+1 234-567-8902",
      department: "Mathematics",
      designation: "Associate Professor",
      status: "active",
      joiningDate: "2020-01-10",
      coursesCount: 2
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@university.edu",
      phone: "+1 234-567-8903",
      department: "Computer Science",
      designation: "Assistant Professor",
      status: "active",
      joiningDate: "2021-09-01",
      coursesCount: 4
    },
    {
      id: "4",
      name: "Prof. David Wilson",
      email: "david.wilson@university.edu",
      phone: "+1 234-567-8904",
      department: "Physics",
      designation: "Professor",
      status: "inactive",
      joiningDate: "2018-03-20",
      coursesCount: 1
    }
  ];

  const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"];

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || faculty.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || faculty.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Faculty Management</h1>
          <p className="text-muted-foreground">
            Manage faculty members, their profiles, and assignments
          </p>
        </div>
        <Button className="gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Faculty
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+5 new this month</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">138</div>
            <p className="text-xs text-muted-foreground">97% active rate</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across university</p>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5y</div>
            <p className="text-xs text-muted-foreground">Teaching experience</p>
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
                  placeholder="Search faculty by name or email..."
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
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Table */}
      <Card className="gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{faculty.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Joined {new Date(faculty.joiningDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3" />
                        {faculty.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-3 w-3" />
                        {faculty.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {faculty.department}
                    </div>
                  </TableCell>
                  <TableCell>{faculty.designation}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{faculty.coursesCount} courses</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={faculty.status === "active" ? "default" : "secondary"}
                      className={faculty.status === "active" ? "bg-success" : ""}
                    >
                      {faculty.status}
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};