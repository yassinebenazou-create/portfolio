import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, Loader2, Search, X } from "lucide-react";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { gooeyToast } from "goey-toast";
import { useSkills } from "@/hooks/useSkills";

const SkillsManager = () => {
    const { skills, loading, error, refresh } = useSkills();
    const [open, setOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        icon: "",
    });

    const resetForm = () => {
        setFormData({
            name: "",
            icon: "",
        });
        setEditingSkill(null);
    };

    const handleEdit = (skill: any) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            icon: skill.icon || "",
        });
        setOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const skillData = {
                name: formData.name,
                icon: formData.icon || null,
            };

            if (editingSkill) {
                await updateDoc(doc(db, "skills", editingSkill.id), skillData);
                gooeyToast.success("Skill updated successfully!");
            } else {
                await addDoc(collection(db, "skills"), skillData);
                gooeyToast.success("Skill created successfully!");
            }

            setOpen(false);
            resetForm();
            refresh();
        } catch (error: any) {
            gooeyToast.error(error.message || "Failed to save skill");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this skill?")) return;

        try {
            await deleteDoc(doc(db, "skills", id));
            gooeyToast.success("Skill deleted successfully!");
            refresh();
        } catch (error: any) {
            gooeyToast.error(error.message || "Failed to delete skill");
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedSkills.length} skills?`)) return;

        try {
            await Promise.all(selectedSkills.map(id => deleteDoc(doc(db, "skills", id))));
            gooeyToast.success("Skills deleted successfully!");
            setSelectedSkills([]);
            refresh();
        } catch (error: any) {
            gooeyToast.error(error.message || "Failed to delete skills");
        }
    };

    const toggleSelectAll = () => {
        if (selectedSkills.length === filteredSkills.length) {
            setSelectedSkills([]);
        } else {
            setSelectedSkills(filteredSkills.map(s => s.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedSkills.includes(id)) {
            setSelectedSkills(selectedSkills.filter(s => s !== id));
        } else {
            setSelectedSkills([...selectedSkills, id]);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-destructive py-8">
                <p>Failed to load skills</p>
            </div>
        );
    }

    // Filter skills based on search query
    const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/50 p-4 rounded-lg border backdrop-blur-sm">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Manage Skills</h2>
                    <p className="text-sm text-muted-foreground">Add and manage your technical expertise</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                    {selectedSkills.length > 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBulkDelete}
                            className="animate-in fade-in slide-in-from-right-4"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete ({selectedSkills.length})
                        </Button>
                    )}

                    <div className="relative flex-1 sm:flex-initial group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <Input
                            placeholder="Search skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-full sm:w-[250px] bg-background/50 focus:bg-background transition-all"
                        />
                    </div>
                    <Dialog open={open} onOpenChange={(isOpen) => {
                        setOpen(isOpen);
                        if (!isOpen) resetForm();
                    }}>
                        <DialogTrigger asChild>
                            <Button className="shadow-lg hover:shadow-primary/20 transition-all">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Skill
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                                <DialogDescription>
                                    Fill in the skill details below
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Skill Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="React"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon URL</Label>
                                    <Input
                                        id="icon"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Paste the full URL to the skill icon image
                                    </p>
                                    {formData.icon && (
                                        <div className="flex items-center gap-2 p-2 border rounded bg-muted/50">
                                            <img src={formData.icon} alt="Preview" className="w-8 h-8 object-contain" />
                                            <span className="text-sm text-muted-foreground">Icon Preview</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" disabled={submitting} className="flex-1">
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editingSkill ? "Update Skill" : "Create Skill"
                                        )}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {filteredSkills.length > 0 && (
                <div className="flex items-center gap-2 px-1">
                    <Checkbox
                        id="select-all"
                        checked={selectedSkills.length === filteredSkills.length && filteredSkills.length > 0}
                        onCheckedChange={toggleSelectAll}
                    />
                    <Label htmlFor="select-all" className="text-sm text-muted-foreground cursor-pointer">
                        Select All ({filteredSkills.length})
                    </Label>
                </div>
            )}

            {filteredSkills.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredSkills.map((skill: any) => (
                        <div
                            key={skill.id}
                            className={`group relative flex flex-col items-center justify-center p-6 bg-card hover:bg-accent/50 border rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden ${selectedSkills.includes(skill.id) ? 'ring-2 ring-primary bg-accent/50' : ''}`}
                            onClick={() => toggleSelect(skill.id)}
                        >
                            {/* Selection Checkbox */}
                            <div className="absolute top-3 left-3 z-20" onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                    checked={selectedSkills.includes(skill.id)}
                                    onCheckedChange={() => toggleSelect(skill.id)}
                                />
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground shadow-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(skill);
                                    }}
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground shadow-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(skill.id);
                                    }}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>

                            {/* Icon Container */}
                            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center p-3 group-hover:scale-110 group-hover:from-primary/20 transition-all duration-300 ring-1 ring-primary/10 group-hover:ring-primary/30">
                                {skill.icon ? (
                                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-sm" />
                                ) : (
                                    <div className="w-8 h-8 bg-primary/20 rounded-full" />
                                )}
                            </div>

                            {/* Skill Name */}
                            <h3 className="font-semibold text-sm sm:text-base text-center text-foreground/90 group-hover:text-primary transition-colors">
                                {skill.name}
                            </h3>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl bg-card/50">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Search className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No skills found</h3>
                    <p className="text-muted-foreground max-w-sm mt-1">
                        {searchQuery ? `No skills matching "${searchQuery}"` : "Get started by adding your first skill."}
                    </p>
                    {!searchQuery && (
                        <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Skill
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
