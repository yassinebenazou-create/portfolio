import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Save, BarChart3, Loader2 } from "lucide-react";
import { gooeyToast } from "goey-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const AnalyticsManager = () => {
    const DEFAULT_URL = import.meta.env.VITE_ANALYTICS_EMBED_URL || "";
    const [embedUrl, setEmbedUrl] = useState(DEFAULT_URL);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const docSnap = await getDoc(doc(db, "app_config", "analytics_embed_url"));
                if (docSnap.exists() && docSnap.data().value) {
                    setEmbedUrl(docSnap.data().value);
                } else {
                    const savedUrl = localStorage.getItem("analytics_embed_url");
                    if (savedUrl) setEmbedUrl(savedUrl);
                }
            } catch {
                // silently fail, use defaults
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleSave = async () => {
        if (!embedUrl.trim()) { gooeyToast.error("Please enter a valid URL"); return; }
        setSaving(true);
        try {
            await setDoc(doc(db, "app_config", "analytics_embed_url"), { key: "analytics_embed_url", value: embedUrl, updated_at: new Date().toISOString() });
            localStorage.setItem("analytics_embed_url", embedUrl);
            setIsEditing(false);
            gooeyToast.success("Analytics URL saved!");
        } catch (err: unknown) {
            gooeyToast.error(err instanceof Error ? err.message : "Failed to save configuration");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/50 p-4 rounded-lg border backdrop-blur-sm">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
                    <p className="text-sm text-muted-foreground">Monitor your website traffic and performance</p>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)} disabled={saving}>
                    {isEditing ? "Cancel" : "Configure Report"}
                </Button>
            </div>

            {isEditing && (
                <Card className="animate-in fade-in slide-in-from-top-4">
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>
                            Paste your Google Looker Studio Embed URL here.
                            <a href="https://lookerstudio.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-1 text-primary hover:underline">
                                Open Looker Studio <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="url">Embed URL</Label>
                            <div className="flex gap-2">
                                <Input id="url" placeholder="https://lookerstudio.google.com/embed/reporting/..." value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} disabled={saving} />
                                <Button onClick={handleSave} disabled={saving}>
                                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    {saving ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {embedUrl ? (
                <div className="w-full aspect-[16/9] bg-card rounded-xl border overflow-hidden shadow-sm">
                    <iframe src={embedUrl} className="w-full h-full border-0" allowFullScreen
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-card/50">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No Report Configured</h3>
                    <p className="text-muted-foreground max-w-sm mt-2 mb-6">Connect your Google Analytics data using Looker Studio to see visual insights here.</p>
                    <Button onClick={() => setIsEditing(true)}>Setup Analytics</Button>
                </div>
            )}
        </div>
    );
};

export default AnalyticsManager;
