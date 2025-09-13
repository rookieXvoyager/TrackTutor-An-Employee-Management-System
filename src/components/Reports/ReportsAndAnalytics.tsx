import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp,
  FileText,
  PieChart as PieChartIcon 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ReportsAndAnalytics = () => {
  const departmentData = [
    { name: 'Computer Science', faculty: 28, courses: 15, students: 450 },
    { name: 'Mathematics', faculty: 18, courses: 12, students: 280 },
    { name: 'Physics', faculty: 15, courses: 10, students: 220 },
    { name: 'Chemistry', faculty: 12, courses: 8, students: 180 },
    { name: 'Biology', faculty: 10, courses: 6, students: 150 }
  ];

  const attendanceData = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 89 },
    { month: 'Mar', attendance: 95 },
    { month: 'Apr', attendance: 88 },
    { month: 'May', attendance: 94 },
    { month: 'Jun', attendance: 91 }
  ];

  const workloadData = [
    { name: 'Low Load', value: 25, color: '#10B981' },
    { name: 'Optimal', value: 45, color: '#3B82F6' },
    { name: 'High Load', value: 25, color: '#F59E0B' },
    { name: 'Overload', value: 5, color: '#EF4444' }
  ];

  const topMetrics = [
    { label: "Average Attendance", value: "91.5%", trend: "+2.1%", color: "text-success" },
    { label: "Faculty Utilization", value: "87.3%", trend: "+5.2%", color: "text-success" },
    { label: "Course Completion", value: "94.8%", trend: "-1.3%", color: "text-warning" },
    { label: "Student Satisfaction", value: "4.2/5", trend: "+0.3", color: "text-success" }
  ];

  const recentReports = [
    { id: 1, name: "Monthly Attendance Report", date: "Dec 1, 2024", status: "completed", type: "attendance" },
    { id: 2, name: "Faculty Workload Analysis", date: "Nov 28, 2024", status: "completed", type: "workload" },
    { id: 3, name: "Department Performance", date: "Nov 25, 2024", status: "processing", type: "performance" },
    { id: 4, name: "Course Enrollment Summary", date: "Nov 22, 2024", status: "completed", type: "enrollment" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into faculty performance and institutional metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-32">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-primary">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {topMetrics.map((metric, index) => (
          <Card key={index} className="gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs flex items-center mt-1 ${metric.color}`}>
                <TrendingUp className="mr-1 h-3 w-3" />
                {metric.trend} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Performance */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="faculty" fill="hsl(var(--primary))" name="Faculty" />
                <Bar dataKey="courses" fill="hsl(var(--accent))" name="Courses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Faculty Workload Distribution */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5 text-accent" />
              Faculty Workload Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={workloadData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workloadData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {workloadData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-success" />
              Attendance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{report.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={report.status === 'completed' ? 'default' : 'secondary'}
                    className={report.status === 'completed' ? 'bg-success' : 'bg-warning'}
                  >
                    {report.status}
                  </Badge>
                  {report.status === 'completed' && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <Card className="gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <h4 className="font-medium">{dept.name}</h4>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {dept.faculty} faculty
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="mr-1 h-3 w-3" />
                      {dept.courses} courses
                    </div>
                    <div>
                      {dept.students} students
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {Math.round((dept.students / dept.courses))} avg/course
                  </div>
                  <div className="w-24 mt-2">
                    <Progress value={(dept.students / 500) * 100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};