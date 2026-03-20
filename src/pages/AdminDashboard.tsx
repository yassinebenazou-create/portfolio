import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, FolderKanban, Code, Settings, BarChart3, User, LayoutDashboard } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { gooeyToast } from "goey-toast";
import ProjectsManager from "@/components/admin/ProjectsManager";
import SkillsManager from "@/components/admin/SkillsManager";
import AnalyticsManager from "@/components/admin/AnalyticsManager";
import ProfileManager from "@/components/admin/ProfileManager";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";
import { SettingsDialog } from "@/components/SettingsDialog";

import { User as FirebaseUser } from "firebase/auth";

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { projects } = useProjects();
    const { skills } = useSkills();
    const activeTab = searchParams.get('tab') || 'dashboard';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) { navigate("/razer"); return; }
            const allowedEmails = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map((e: string) => e.trim()).filter(Boolean);
            if (firebaseUser.email && !allowedEmails.includes(firebaseUser.email)) {
                signOut(auth);
                gooeyToast.error("Unauthorized access.");
                navigate("/razer");
                return;
            }
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try { await signOut(auth); gooeyToast.success("Logged out successfully"); navigate("/razer"); }
        catch { gooeyToast.error("Logout failed"); }
    };

    const handleTabChange = (value: string) => setSearchParams({ tab: value });

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

    const featuredProjectsCount = projects.filter((p) => p.featured).length;

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Manage your portfolio content and settings</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
                        {user && (
                            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
                                <img 
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=random&size=64`} 
                                    alt="Profile" 
                                    className="w-8 h-8 rounded-full ring-2 ring-primary/20 object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=random&size=64`;
                                    }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{user.displayName || user.email}</span>
                                    {user.displayName && <span className="text-xs text-muted-foreground">{user.email}</span>}
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <SettingsDialog><Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button></SettingsDialog>
                            <Button variant="outline" onClick={handleLogout} className="hidden sm:flex"><LogOut className="w-4 h-4 mr-2" />Logout</Button>
                            <Button variant="outline" size="icon" onClick={handleLogout} className="sm:hidden"><LogOut className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
                    <TabsList className="bg-card/50 backdrop-blur-sm p-1 gap-1 flex-wrap h-auto min-h-11">
                        <TabsTrigger value="dashboard" className="gap-2 flex-1 sm:flex-none"><LayoutDashboard className="w-4 h-4" />Overview</TabsTrigger>
                        <TabsTrigger value="profile" className="gap-2 flex-1 sm:flex-none"><User className="w-4 h-4" />Profile</TabsTrigger>
                        <TabsTrigger value="projects" className="gap-2 flex-1 sm:flex-none"><FolderKanban className="w-4 h-4" />Projects</TabsTrigger>
                        <TabsTrigger value="skills" className="gap-2 flex-1 sm:flex-none"><Code className="w-4 h-4" />Skills</TabsTrigger>
                        <TabsTrigger value="analytics" className="gap-2 flex-1 sm:flex-none"><BarChart3 className="w-4 h-4" />Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="space-y-4 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <Card className="hover:shadow-md transition-shadow cursor-default group">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                                    <FolderKanban className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardHeader>
                                <CardContent><div className="text-2xl font-bold">{projects.length}</div><p className="text-xs text-muted-foreground">Active portfolio pieces</p></CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow cursor-default group">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
                                    <Code className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardHeader>
                                <CardContent><div className="text-2xl font-bold">{skills.length}</div><p className="text-xs text-muted-foreground">Technical proficiencies</p></CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow cursor-default group">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Featured Projects</CardTitle>
                                    <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardHeader>
                                <CardContent><div className="text-2xl font-bold">{featuredProjectsCount}</div><p className="text-xs text-muted-foreground">Highlighted entries</p></CardContent>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Recent Activities</CardTitle><CardDescription>System events and updates</CardDescription></CardHeader>
                                <CardContent><div className="text-sm text-muted-foreground text-center py-10 italic">No recent activity to show.</div></CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Quick Start</CardTitle><CardDescription>Shortcut to frequent tasks</CardDescription></CardHeader>
                                <CardContent className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => handleTabChange('projects')}><Plus className="w-5 h-5" /><span>Add Project</span></Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-4 animate-in fade-in duration-500"><ProfileManager /></TabsContent>
                    <TabsContent value="projects" className="space-y-4 animate-in fade-in duration-500"><ProjectsManager /></TabsContent>
                    <TabsContent value="skills" className="space-y-4 animate-in fade-in duration-500"><SkillsManager /></TabsContent>
                    <TabsContent value="analytics" className="space-y-4 animate-in fade-in duration-500"><AnalyticsManager /></TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;
