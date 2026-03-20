import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { gooeyToast } from "goey-toast";
import { SettingsDialog } from "@/components/SettingsDialog";

const AdminLogin = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const allowedEmails = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map((e: string) => e.trim()).filter(Boolean);
            if (user.email && !allowedEmails.includes(user.email)) {
                await auth.signOut();
                gooeyToast.error("Unauthorized access. Your email is not whitelisted.");
                return;
            }
            navigate("/razer/dashboard");
        } catch (error: any) {
            if (error.code !== "auth/popup-closed-by-user") {
                gooeyToast.error(error.message || "Google login failed");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <div className="absolute bottom-6 left-6 z-10">
                <Link to="/">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 border-primary/20 shadow-lg hover:shadow-primary/20 hover:scale-105">
                        <Home className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
            <div className="absolute bottom-6 right-6 z-10">
                <SettingsDialog variant="icon" />
            </div>
            <Card className="w-full max-w-md bg-card/30 backdrop-blur-xl border-primary/20 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Admin Access
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/80 font-medium mt-2">
                        Sign in with your Google account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                    <Button variant="outline" type="button" className="w-full h-12 bg-background/50 border-primary/20 hover:bg-background/80 transition-all duration-300 text-base font-medium" onClick={handleGoogleLogin}>
                        <svg className="mr-3 h-5 w-5" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Sign in with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
