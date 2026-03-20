import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Copy, MapPin, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { gooeyToast } from "goey-toast";
import { useProfile } from "@/hooks/useProfile";
import { DEFAULT_PROFILE } from "@/lib/config";

const Contact = () => {
  const { profile } = useProfile();
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  const email = profile?.email || DEFAULT_PROFILE.email;
  const github = profile?.github || DEFAULT_PROFILE.github;
  const linkedin = profile?.linkedin || DEFAULT_PROFILE.linkedin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      gooeyToast.error("Please enter a valid email address.");
      return;
    }
    if (form.current) {
      setSending(true);
      import("@emailjs/browser").then(({ default: emailjs }) => {
        emailjs
          .sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current!,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          )
          .then(
            () => {
              gooeyToast.success("Message sent! I'll get back to you soon.");
              setFormData({ name: "", email: "", message: "" });
            },
            () => {
              gooeyToast.error("Failed to send message. Please try again later.");
            }
          )
          .finally(() => setSending(false));
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      gooeyToast.success("Email copied to clipboard!");
    } catch {
      gooeyToast.error("Failed to copy email.");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-transparent"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center Welcome-text">
          Get In Touch
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <div
          className={`grid ${import.meta.env.VITE_EMAIL_FORM === 'true' ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 md:gap-12 justify-items-center md:justify-items-stretch max-w-full md:max-w-none`}
        >
          {import.meta.env.VITE_EMAIL_FORM === 'true' && (
            <div className="glass-card rounded-2xl p-6 md:p-8 w-full max-w-lg md:max-w-none">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="user_name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="user_email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-background/50 resize-none"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={sending}>
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : "Send Message"}
                </Button>
              </form>
            </div>
          )}

          {/* Contact Info */}
          <div
            className={
              import.meta.env.VITE_EMAIL_FORM === 'true'
                ? 'space-y-6 md:space-y-8 w-full max-w-lg md:max-w-none'
                : 'col-span-2 grid md:grid-cols-2 gap-8'
            }
          >
            {/* Connect With Me */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="truncate">{email}</span>
                  </a>
                  <Copy className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary flex-shrink-0" onClick={handleCopy} />
                </div>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="truncate">{github.replace("https://", "")}</span>
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="truncate">{linkedin.replace("https://", "").replace("www.", "")}</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>Ernakulam, India</span>
                </div>
              </div>
            </div>

            {/* Let's Build Something */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Let's Build Something</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always excited to work on innovative projects and collaborate with creative teams.
                Whether you need a full-stack application, consulting, or just want to discuss ideas,
                don't hesitate to reach out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
