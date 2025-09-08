import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  HardDrive,
  Download,
  Trash2,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react";
import { useState } from "react";

export function Settings() {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    documentExpiry: true,
    securityAlerts: true,
    storageWarnings: false,
    systemMaintenance: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    documentSharing: false,
    analyticsOptIn: true,
    dataCollection: false
  });

  const [theme, setTheme] = useState('system');

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and system settings
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Email Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your documents and account
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailUpdates}
                    onCheckedChange={(value) => handleNotificationChange('emailUpdates', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Document Expiry Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your documents are about to expire
                    </p>
                  </div>
                  <Switch
                    checked={notifications.documentExpiry}
                    onCheckedChange={(value) => handleNotificationChange('documentExpiry', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Important security notifications and login alerts
                    </p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(value) => handleNotificationChange('securityAlerts', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Storage Warnings</p>
                    <p className="text-sm text-muted-foreground">
                      Alerts when you're running low on storage space
                    </p>
                  </div>
                  <Switch
                    checked={notifications.storageWarnings}
                    onCheckedChange={(value) => handleNotificationChange('storageWarnings', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">System Maintenance</p>
                    <p className="text-sm text-muted-foreground">
                      Notifications about scheduled maintenance and updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.systemMaintenance}
                    onCheckedChange={(value) => handleNotificationChange('systemMaintenance', value)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Email Frequency</h4>
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <input type="radio" name="frequency" value="immediate" defaultChecked />
                    <span>Immediate</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <input type="radio" name="frequency" value="daily" />
                    <span>Daily Digest</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <input type="radio" name="frequency" value="weekly" />
                    <span>Weekly Summary</span>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your profile information
                    </p>
                  </div>
                  <Badge variant="outline">Private</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Document Sharing</p>
                    <p className="text-sm text-muted-foreground">
                      Allow sharing documents with other users
                    </p>
                  </div>
                  <Switch
                    checked={privacy.documentSharing}
                    onCheckedChange={(value) => handlePrivacyChange('documentSharing', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Analytics Participation</p>
                    <p className="text-sm text-muted-foreground">
                      Help improve the service with anonymous usage data
                    </p>
                  </div>
                  <Switch
                    checked={privacy.analyticsOptIn}
                    onCheckedChange={(value) => handlePrivacyChange('analyticsOptIn', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-muted-foreground">
                      Allow collection of additional data for personalization
                    </p>
                  </div>
                  <Switch
                    checked={privacy.dataCollection}
                    onCheckedChange={(value) => handlePrivacyChange('dataCollection', value)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Data Management</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                Storage Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Storage Overview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Storage Usage</h4>
                  <Badge variant="secondary">1.2 GB / 2 GB</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all" 
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Documents</p>
                    <p className="font-medium">945 MB</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Images</p>
                    <p className="font-medium">255 MB</p>
                  </div>
                </div>
              </div>

              {/* Storage Options */}
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium">Storage Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Free Plan</p>
                      <p className="text-sm text-muted-foreground">2 GB storage</p>
                    </div>
                    <Badge variant="secondary">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Student Pro</p>
                      <p className="text-sm text-muted-foreground">10 GB storage</p>
                    </div>
                    <Button size="sm">Upgrade</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Premium</p>
                      <p className="text-sm text-muted-foreground">50 GB storage</p>
                    </div>
                    <Button size="sm">Upgrade</Button>
                  </div>
                </div>
              </div>

              {/* Cleanup Options */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Cleanup</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Trash (15 files)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Archive Old Documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Appearance & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div className="space-y-4">
                <h4 className="font-medium">Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={theme === 'light' ? 'secondary' : 'outline'}
                    className="h-20 flex-col gap-2"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="w-5 h-5" />
                    <span>Light</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'secondary' : 'outline'}
                    className="h-20 flex-col gap-2"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="w-5 h-5" />
                    <span>Dark</span>
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'secondary' : 'outline'}
                    className="h-20 flex-col gap-2"
                    onClick={() => setTheme('system')}
                  >
                    <Monitor className="w-5 h-5" />
                    <span>System</span>
                  </Button>
                </div>
              </div>

              {/* Language & Region */}
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium">Language & Region</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">English (US)</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">UTC-5 (Eastern Time)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Options */}
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium">Display Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-muted-foreground">
                        Show more items in lists and grids
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High Contrast</p>
                      <p className="text-sm text-muted-foreground">
                        Increase contrast for better accessibility
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reduced Motion</p>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations and transitions
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Changes */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Changes are saved automatically
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}