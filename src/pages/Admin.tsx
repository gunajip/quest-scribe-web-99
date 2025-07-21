import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Upload, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  UserPlus,
  Ban,
  Eye,
  FileText
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data
const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Active Sessions",
    value: "89",
    change: "+5%",
    trend: "up", 
    icon: Activity,
    color: "text-success"
  },
  {
    title: "Messages Today",
    value: "5,678",
    change: "+8%",
    trend: "up",
    icon: MessageSquare,
    color: "text-accent"
  },
  {
    title: "Files Uploaded",
    value: "234",
    change: "-2%",
    trend: "down",
    icon: Upload,
    color: "text-muted-foreground"
  }
];

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active", joinDate: "2024-01-15", sessions: 23 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", joinDate: "2024-01-14", sessions: 45 },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "inactive", joinDate: "2024-01-13", sessions: 12 },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", status: "active", joinDate: "2024-01-12", sessions: 67 },
  { id: 5, name: "Tom Brown", email: "tom@example.com", status: "banned", joinDate: "2024-01-11", sessions: 8 }
];

const recentSessions = [
  { id: 1, user: "John Doe", duration: "23 min", messages: 15, status: "completed", timestamp: "2 hours ago" },
  { id: 2, user: "Jane Smith", duration: "45 min", messages: 32, status: "active", timestamp: "5 minutes ago" },
  { id: 3, user: "Mike Johnson", duration: "12 min", messages: 8, status: "completed", timestamp: "1 hour ago" },
  { id: 4, user: "Sarah Wilson", duration: "67 min", messages: 28, status: "completed", timestamp: "3 hours ago" },
  { id: 5, user: "Tom Brown", duration: "8 min", messages: 3, status: "error", timestamp: "6 hours ago" }
];

const recentFiles = [
  { id: 1, name: "research_paper.pdf", user: "John Doe", size: "2.4 MB", uploadDate: "2024-01-15", status: "processed" },
  { id: 2, name: "data_analysis.xlsx", user: "Jane Smith", size: "1.2 MB", uploadDate: "2024-01-15", status: "processing" },
  { id: 3, name: "meeting_notes.docx", user: "Mike Johnson", size: "856 KB", uploadDate: "2024-01-14", status: "processed" },
  { id: 4, name: "presentation.pptx", user: "Sarah Wilson", size: "5.1 MB", uploadDate: "2024-01-14", status: "failed" },
  { id: 5, name: "budget_report.pdf", user: "Tom Brown", size: "3.2 MB", uploadDate: "2024-01-13", status: "processed" }
];

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary", 
      banned: "destructive",
      completed: "default",
      processing: "secondary",
      failed: "destructive",
      error: "destructive",
      processed: "default"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your RAGBot application and monitor user activity
            </p>
          </div>
          <Button className="bg-gradient-primary">
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">
                        {stat.value}
                      </p>
                      <p className={`text-xs flex items-center mt-1 ${
                        stat.trend === "up" ? "text-success" : "text-destructive"
                      }`}>
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {stat.change} from last month
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                  <CardDescription>Latest user registrations and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        {getStatusBadge(user.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current system performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Server Uptime</span>
                      <span className="text-sm font-medium text-success">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium">142ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database Health</span>
                      <span className="text-sm font-medium text-success">Healthy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Connections</span>
                      <span className="text-sm font-medium">89/200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.sessions}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card border-border">
                              <DropdownMenuItem className="flex items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <UserPlus className="w-4 h-4 mr-2" />
                                Promote to Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center text-destructive">
                                <Ban className="w-4 h-4 mr-2" />
                                Ban User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Chat Sessions</CardTitle>
                <CardDescription>Monitor active and completed chat sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.user}</TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>{session.messages}</TableCell>
                        <TableCell>{getStatusBadge(session.status)}</TableCell>
                        <TableCell>{session.timestamp}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>File Management</CardTitle>
                <CardDescription>Monitor uploaded files and processing status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell className="font-medium flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                          {file.name}
                        </TableCell>
                        <TableCell>{file.user}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.uploadDate}</TableCell>
                        <TableCell>{getStatusBadge(file.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card border-border">
                              <DropdownMenuItem className="flex items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                View File
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center text-destructive">
                                <Ban className="w-4 h-4 mr-2" />
                                Delete File
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;