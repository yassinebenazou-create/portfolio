import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, User, Github, Linkedin, Twitter, Instagram, Mail, FileText } from "lucide-react";
import { gooeyToast } from "goey-toast";
import { useProfile, Profile } from "@/hooks/useProfile";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ProfileManager = () => {
    const { profile: initialProfile, loading: initialLoading } = useProfile();
    const [profile, setProfile] = useState<Partial<Profile>>({});
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (initialProfile) { setProfile(initialProfile); setLoading(false); }
        else if (!initialLoading) { setLoading(false); }
    }, [initialProfile, initialLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { id, ...profileData } = profile as any;
            await setDoc(doc(db, "profile", "main"), { ...profileData, updated_at: serverTimestamp() }, { merge: true });
            gooeyToast.success("Profile updated successfully!");
        } catch (error: any) {
            gooeyToast.error(error.message || "Failed to update profile");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" />Personal Information</CardTitle>
                        <CardDescription>Your public profile details shown across the site</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input id="full_name" value={profile.full_name || ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Your Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Professional Role</Label>
                                <Input id="role" value={profile.role || ""} onChange={(e) => setProfile({ ...profile, role: e.target.value })} placeholder="Full-Stack Developer" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio / About Me</Label>
                            <Textarea id="bio" value={profile.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Tell the world about yourself..." required rows={4} className="resize-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="avatar_url">Avatar URL</Label>
                                <Input id="avatar_url" type="url" value={profile.avatar_url || ""} onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resume_url">Resume / CV URL</Label>
                                <div className="flex gap-2">
                                    <Input id="resume_url" type="url" value={profile.resume_url || ""} onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })} placeholder="https://..." />
                                    <Button type="button" variant="outline" size="icon" asChild>
                                        <a href={profile.resume_url} target="_blank" rel="noopener noreferrer"><FileText className="w-4 h-4" /></a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" />Contact & Socials</CardTitle>
                        <CardDescription>Where people can find you online</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</Label>
                            <Input id="email" type="email" value={profile.email || ""} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="name@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="github" className="flex items-center gap-2"><Github className="w-3.5 h-3.5" /> GitHub</Label>
                            <Input id="github" type="url" value={profile.github || ""} onChange={(e) => setProfile({ ...profile, github: e.target.value })} placeholder="https://github.com/..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin" className="flex items-center gap-2"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</Label>
                            <Input id="linkedin" type="url" value={profile.linkedin || ""} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter" className="flex items-center gap-2"><Twitter className="w-3.5 h-3.5" /> Twitter / X</Label>
                            <Input id="twitter" type="url" value={profile.twitter || ""} onChange={(e) => setProfile({ ...profile, twitter: e.target.value })} placeholder="https://x.com/..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instagram" className="flex items-center gap-2"><Instagram className="w-3.5 h-3.5" /> Instagram</Label>
                            <Input id="instagram" type="url" value={profile.instagram || ""} onChange={(e) => setProfile({ ...profile, instagram: e.target.value })} placeholder="https://instagram.com/..." />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-end gap-3">
                <Button type="submit" disabled={submitting} size="lg" className="min-w-[150px]">
                    {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Updating...</> : <><Save className="w-4 h-4 mr-2" />Save Profile</>}
                </Button>
            </div>
        </form>
    );
};

export default ProfileManager;
