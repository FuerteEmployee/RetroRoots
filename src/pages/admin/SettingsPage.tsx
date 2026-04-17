import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

const SettingsPage = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiRequest("/settings").then(setSettings).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiRequest("/settings", { method: "PUT", body: JSON.stringify(settings) });
      toast({ title: "Saved", description: "Settings updated successfully" });
    } catch (err: any) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold text-card-foreground border-b border-border pb-3">WhatsApp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>WhatsApp Number</Label><Input value={settings.whatsappNumber || ""} onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })} className="mt-1" placeholder="+91XXXXXXXXXX" /></div>
          <div><Label>Pre-filled Message</Label><Input value={settings.whatsappMessage || ""} onChange={e => setSettings({ ...settings, whatsappMessage: e.target.value })} className="mt-1" /></div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="text-lg font-semibold text-card-foreground border-b border-border pb-3">Social Links</h2>
        {["facebook", "instagram", "linkedin", "youtube", "twitter"].map(platform => (
          <div key={platform}>
            <Label className="capitalize">{platform}</Label>
            <Input
              value={settings.socialLinks?.[platform] || ""}
              onChange={e => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, [platform]: e.target.value } })}
              className="mt-1"
              placeholder={`https://${platform}.com/...`}
            />
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="text-lg font-semibold text-card-foreground border-b border-border pb-3">Content</h2>
        <div><Label>Footer Text</Label><Textarea value={settings.footerText || ""} onChange={e => setSettings({ ...settings, footerText: e.target.value })} className="mt-1" rows={2} /></div>
        <div><Label>Privacy Policy</Label><Textarea value={settings.privacyPolicyContent || ""} onChange={e => setSettings({ ...settings, privacyPolicyContent: e.target.value })} className="mt-1" rows={6} /></div>
        <div><Label>Delivery Page Content</Label><Textarea value={settings.deliveryPageContent || ""} onChange={e => setSettings({ ...settings, deliveryPageContent: e.target.value })} className="mt-1" rows={4} /></div>
        <div><Label>Cookie Consent Text</Label><Textarea value={settings.cookieConsentText || ""} onChange={e => setSettings({ ...settings, cookieConsentText: e.target.value })} className="mt-1" rows={2} /></div>
      </div>
    </div>
  );
};

export default SettingsPage;
