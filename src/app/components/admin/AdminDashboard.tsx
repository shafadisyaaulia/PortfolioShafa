import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';
import projectsDataImport from '@/data/projects.json';
import socialImpactDataImport from '@/data/social-impact.json';
import settingsDataImport from '@/data/settings.json';
import { projectsApi, socialImpactApi, settingsApi } from '@/lib/api';

// Admin Dashboard untuk manage Projects, Social Impact & Settings
export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'projects' | 'social-impact' | 'settings'>('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [socialImpact, setSocialImpact] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load data from MongoDB API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load from MongoDB API
      const [projectsResponse, impactResponse, settingsResponse] = await Promise.all([
        projectsApi.getAll(),
        socialImpactApi.getAll(),
        settingsApi.get()
      ]);
      
      if (projectsResponse.success && projectsResponse.data) {
        setProjects(projectsResponse.data);
        console.log('📦 Loaded projects from MongoDB:', projectsResponse.data);
      } else {
        // Fallback to localStorage
        const storedProjects = localStorage.getItem('portfolio_projects');
        if (storedProjects) {
          setProjects(JSON.parse(storedProjects));
        } else {
          setProjects(projectsDataImport.projects || []);
        }
      }
      
      if (impactResponse.success && impactResponse.data) {
        setSocialImpact(impactResponse.data);
        console.log('📦 Loaded social impact from MongoDB:', impactResponse.data);
      } else {
        // Fallback to localStorage
        const storedImpact = localStorage.getItem('portfolio_social_impact');
        if (storedImpact) {
          setSocialImpact(JSON.parse(storedImpact));
        } else {
          setSocialImpact(socialImpactDataImport.stories || []);
        }
      }
      
      if (settingsResponse.success && settingsResponse.data) {
        setSettings(settingsResponse.data);
        console.log('📦 Loaded settings from MongoDB:', settingsResponse.data);
      } else {
        // Fallback to localStorage or defaults
        const storedSettings = localStorage.getItem('portfolio_settings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        } else {
          setSettings(settingsDataImport);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to localStorage
      try {
        const storedProjects = localStorage.getItem('portfolio_projects');
        const storedImpact = localStorage.getItem('portfolio_social_impact');
        const storedSettings = localStorage.getItem('portfolio_settings');
        if (storedProjects) setProjects(JSON.parse(storedProjects));
        if (storedImpact) setSocialImpact(JSON.parse(storedImpact));
        if (storedSettings) setSettings(JSON.parse(storedSettings));
        else setSettings(settingsDataImport);
      } catch (e) {
        console.error('Fallback error:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    // In production, this would call an API endpoint
    // For now, we'll use localStorage and generate download
    const dataToSave = activeTab === 'projects' 
      ? { projects } 
      : { stories: socialImpact };
    
    const dataStr = JSON.stringify(dataToSave, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeTab === 'projects' ? 'projects.json' : 'social-impact.json';
    link.click();
    
    toast.success('Data exported successfully!', {
      description: 'Download the JSON file and replace it in src/data/'
    });
  };

  const handleAdd = () => {
    console.log('🔵 Add button clicked! Tab:', activeTab);
    const newItem = activeTab === 'projects' ? {
      id: Date.now(),
      num: `0${projects.length + 1}`,
      name: '',
      tagline: '',
      desc: '',
      fullDesc: '',
      images: [],
      gallery: [],
      tags: [],
      accent: '#00CFFD',
      glow: 'rgba(0,207,253,0.25)',
      status: '',
      metric: '',
      features: [],
      techStack: [],
      github: '',
      demo: ''
    } : {
      id: `story-${Date.now()}`,
      num: `0${socialImpact.length + 1}`,
      tag: '',
      icon: 'Heart',
      title: '',
      headline: '',
      desc: '',
      fullDesc: '',
      stats: [],
      highlights: [],
      images: [],
      gallery: [],
      achievements: [],
      impact: [],
      accent: '#00CFFD',
      glow: 'rgba(0,207,253,0.3)',
      gradient: 'linear-gradient(135deg, #00CFFD 0%, #0891B2 100%)'
    };

    console.log('🔵 New item created:', newItem);
    setEditingItem(newItem);
    setIsEditing(true);
    console.log('🔵 Modal should open now!');
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsEditing(true);
  };

  const handleDelete = async (id: any) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setSaving(true);
      
      if (activeTab === 'projects') {
        const response = await projectsApi.delete(id);
        
        if (response.success) {
          // Reload data from MongoDB to get fresh state
          await loadData();
          window.dispatchEvent(new CustomEvent('portfolioProjectsUpdated'));
          console.log('✅ Project deleted from MongoDB!');
          toast.success('Project deleted successfully!', {
            description: 'The project has been removed from your portfolio'
          });
        } else {
          // Fallback to localStorage only
          const updatedProjects = projects.filter(p => p.id !== id);
          setProjects(updatedProjects);
          localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
          window.dispatchEvent(new CustomEvent('portfolioProjectsUpdated'));
          console.log('⚠️ Deleted from localStorage only (API unavailable)');
        }
      } else {
        const response = await socialImpactApi.delete(id);
        
        if (response.success) {
          // Reload data from MongoDB to get fresh state
          await loadData();
          window.dispatchEvent(new CustomEvent('portfolioSocialImpactUpdated'));
          console.log('✅ Social Impact deleted from MongoDB!');
          toast.success('Story deleted successfully!', {
            description: 'The social impact story has been removed'
          });
        } else {
          // Fallback to localStorage only
          const updatedImpact = socialImpact.filter(s => s.id !== id);
          setSocialImpact(updatedImpact);
          localStorage.setItem('portfolio_social_impact', JSON.stringify(updatedImpact));
          window.dispatchEvent(new CustomEvent('portfolioSocialImpactUpdated'));
          console.log('⚠️ Deleted from localStorage only (API unavailable)');
        }
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete item', {
        description: 'Check console for details'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (uploadedFiles?: File[]) => {
    try {
      setSaving(true);
      
      // Clean data: remove empty strings from arrays
      const cleanedItem = {
        ...editingItem,
        tags: editingItem.tags?.filter((t: string) => t && t.trim()) || [],
        features: editingItem.features?.filter((f: string) => f && f.trim()) || [],
        highlights: editingItem.highlights?.filter((h: string) => h && h.trim()) || [],
        achievements: editingItem.achievements?.filter((a: string) => a && a.trim()) || [],
      };
      
      if (activeTab === 'projects') {
        const existing = projects.find(p => p.id === cleanedItem.id);
        let response;
        
        if (existing) {
          // Update existing project
          response = await projectsApi.update(cleanedItem.id, cleanedItem, uploadedFiles);
        } else {
          // Create new project
          response = await projectsApi.create(cleanedItem, uploadedFiles);
        }
        
        if (response.success) {
          // Reload data from API
          await loadData();
          console.log('✅ Project saved to MongoDB!');
          toast.success('Project saved successfully!', {
            description: 'Your project has been saved to the database'
          });
        } else {
          // Fallback to localStorage
          let updatedProjects;
          if (existing) {
            updatedProjects = projects.map(p => p.id === cleanedItem.id ? cleanedItem : p);
          } else {
            updatedProjects = [...projects, cleanedItem];
          }
          setProjects(updatedProjects);
          localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
          window.dispatchEvent(new CustomEvent('portfolioProjectsUpdated'));
          console.log('⚠️ Saved to localStorage only (API unavailable)');
          toast.warning('Saved locally only', {
            description: 'API server may be offline. Changes are in localStorage.'
          });
        }
      } else {
        const existing = socialImpact.find(s => s.id === cleanedItem.id);
        let response;
        
        if (existing) {
          // Update existing story
          response = await socialImpactApi.update(cleanedItem.id, cleanedItem, uploadedFiles);
        } else {
          // Create new story
          response = await socialImpactApi.create(cleanedItem, uploadedFiles);
        }
        
        if (response.success) {
          // Reload data from API
          await loadData();
          console.log('✅ Social Impact saved to MongoDB!');
          toast.success('Social Impact saved successfully!', {
            description: 'Your story has been saved to the database'
          });
        } else {
          // Fallback to localStorage
          let updatedImpact;
          if (existing) {
            updatedImpact = socialImpact.map(s => s.id === cleanedItem.id ? cleanedItem : s);
          } else {
            updatedImpact = [...socialImpact, cleanedItem];
          }
          setSocialImpact(updatedImpact);
          localStorage.setItem('portfolio_social_impact', JSON.stringify(updatedImpact));
          window.dispatchEvent(new CustomEvent('portfolioSocialImpactUpdated'));
          console.log('⚠️ Saved to localStorage only (API unavailable)');
          toast.warning('Saved locally only', {
            description: 'API server may be offline. Changes are in localStorage.'
          });
        }
      }
      
      setIsEditing(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save item', {
        description: 'Check console for details'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060614',
      color: 'white',
      padding: '20px',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '36px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ⚡ Admin Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={saveData}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00CFFD 0%, #0891B2 100%)',
              border: 'none',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Save size={16} /> Save Changes
          </button>
          <button
            onClick={onLogout}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '30px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'projects' ? 'rgba(168,85,247,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'projects' ? '2px solid #A855F7' : '2px solid transparent',
              color: activeTab === 'projects' ? '#A855F7' : 'rgba(255,255,255,0.5)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            💻 Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('social-impact')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'social-impact' ? 'rgba(236,72,153,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'social-impact' ? '2px solid #EC4899' : '2px solid transparent',
              color: activeTab === 'social-impact' ? '#EC4899' : 'rgba(255,255,255,0.5)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            ❤️ Social Impact ({socialImpact.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'settings' ? 'rgba(0,207,253,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'settings' ? '2px solid #00CFFD' : '2px solid transparent',
              color: activeTab === 'settings' ? '#00CFFD' : 'rgba(255,255,255,0.5)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            ⚙️ Profile Settings
          </button>
        </div>

        {/* Add Button (tidak untuk Settings) */}
        {activeTab !== 'settings' && (
          <button
            onClick={handleAdd}
            disabled={saving || loading}
            style={{
              marginBottom: '20px',
              padding: '12px 24px',
              borderRadius: '10px',
              background: (saving || loading) ? 'rgba(0,207,253,0.3)' : 'linear-gradient(135deg, #00CFFD 0%, #0891B2 100%)',
              border: 'none',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
              cursor: (saving || loading) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: (saving || loading) ? 0.5 : 1,
            }}
          >
            {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Plus size={16} />}
            Add New {activeTab === 'projects' ? 'Project' : 'Story'}
          </button>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ margin: 0 }}>Loading from MongoDB...</p>
          </div>
        ) : activeTab === 'settings' ? (
          // Settings Form (langsung tanpa list, karena hanya 1 settings object)
          <SettingsForm 
            settings={settings} 
            onSave={async (updatedSettings: any) => {
              try {
                setSaving(true);
                const response = await settingsApi.update(updatedSettings);
                
                if (response.success) {
                  setSettings(updatedSettings);
                  localStorage.setItem('portfolio_settings', JSON.stringify(updatedSettings));
                  window.dispatchEvent(new CustomEvent('portfolioSettingsUpdated'));
                  console.log('✅ Settings saved to MongoDB!');
                  toast.success('Settings saved successfully!', {
                    description: 'Your profile settings have been updated'
                  });
                } else {
                  // Fallback to localStorage
                  setSettings(updatedSettings);
                  localStorage.setItem('portfolio_settings', JSON.stringify(updatedSettings));
                  window.dispatchEvent(new CustomEvent('portfolioSettingsUpdated'));
                  console.log('⚠️ Saved to localStorage only (API unavailable)');
                  toast.warning('Saved locally only', {
                    description: 'API server may be offline. Changes are in localStorage.'
                  });
                }
              } catch (error) {
                console.error('Error saving settings:', error);
                toast.error('Failed to save settings', {
                  description: 'Check console for details'
                });
              } finally {
                setSaving(false);
              }
            }}
            saving={saving}
          />
        ) : (activeTab === 'projects' ? projects : socialImpact).length === 0 ? (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
          }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
            }}>
              No {activeTab === 'projects' ? 'projects' : 'stories'} yet. Click "Add New" to create one!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {(activeTab === 'projects' ? projects : socialImpact).map((item) => (
            <div
              key={item.id}
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '20px',
                  fontWeight: '700',
                  color: item.accent,
                  marginBottom: '4px',
                }}>
                  {item.name || item.title}
                </h3>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                }}>
                  {item.tagline || item.headline}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0,207,253,0.15)',
                    border: '1px solid rgba(0,207,253,0.3)',
                    color: '#00CFFD',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'rgba(236,72,153,0.15)',
                    border: '1px solid rgba(236,72,153,0.3)',
                    color: '#EC4899',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Edit Modal */}
        {isEditing && editingItem && (
          <EditModal
            item={editingItem}
            type={activeTab}
            onSave={handleSave}
            onCancel={() => { setIsEditing(false); setEditingItem(null); }}
            onChange={setEditingItem}
          />
        )}
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          richColors
          expand={false}
          duration={3000}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        />
      </div>
    </div>
  );
}

// Settings Form Component
function SettingsForm({ settings, onSave, saving }: any) {
  const [formData, setFormData] = useState(settings || {});

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData((prev: any) => {
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!formData || !formData.profile) {
    return <div style={{ padding: '20px', color: 'rgba(255,255,255,0.5)' }}>Loading settings...</div>;
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '900px',
    }}>
      <div style={{ display: 'grid', gap: '24px' }}>
        {/* Profile Section */}
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '20px',
            fontWeight: '700',
            color: '#00CFFD',
            marginBottom: '16px',
          }}>
            👤 Profile Information
          </h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.profile.name || ''}
                onChange={(e) => handleChange('profile.name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Title / Role
              </label>
              <input
                type="text"
                value={formData.profile.title || ''}
                onChange={(e) => handleChange('profile.title', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Bio / Description
              </label>
              <textarea
                value={formData.profile.bio || ''}
                onChange={(e) => handleChange('profile.bio', e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.profile.email || ''}
                  onChange={(e) => handleChange('profile.email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.profile.phone || ''}
                  onChange={(e) => handleChange('profile.phone', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Location
              </label>
              <input
                type="text"
                value={formData.profile.location || ''}
                onChange={(e) => handleChange('profile.location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Resume URL
              </label>
              <input
                type="text"
                value={formData.profile.resumeUrl || ''}
                onChange={(e) => handleChange('profile.resumeUrl', e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '20px',
            fontWeight: '700',
            color: '#A855F7',
            marginBottom: '16px',
          }}>
            🔗 Social Links
          </h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                GitHub URL
              </label>
              <input
                type="text"
                value={formData.profile.social?.github || ''}
                onChange={(e) => handleChange('profile.social.github', e.target.value)}
                placeholder="https://github.com/username"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                LinkedIn URL
              </label>
              <input
                type="text"
                value={formData.profile.social?.linkedin || ''}
                onChange={(e) => handleChange('profile.social.linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  Twitter URL (optional)
                </label>
                <input
                  type="text"
                  value={formData.profile.social?.twitter || ''}
                  onChange={(e) => handleChange('profile.social.twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  Instagram URL (optional)
                </label>
                <input
                  type="text"
                  value={formData.profile.social?.instagram || ''}
                  onChange={(e) => handleChange('profile.social.instagram', e.target.value)}
                  placeholder="https://instagram.com/username"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '20px',
            fontWeight: '700',
            color: '#EC4899',
            marginBottom: '16px',
          }}>
            📊 Profile Stats
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Experience
              </label>
              <input
                type="text"
                value={formData.profile.stats?.experience || ''}
                onChange={(e) => handleChange('profile.stats.experience', e.target.value)}
                placeholder="3+ Years"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Projects
              </label>
              <input
                type="text"
                value={formData.profile.stats?.projects || ''}
                onChange={(e) => handleChange('profile.stats.projects', e.target.value)}
                placeholder="15+ Projects"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Communities
              </label>
              <input
                type="text"
                value={formData.profile.stats?.communities || ''}
                onChange={(e) => handleChange('profile.stats.communities', e.target.value)}
                placeholder="5+ Communities"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '12px 32px',
              borderRadius: '10px',
              background: saving ? 'rgba(0,207,253,0.3)' : 'linear-gradient(135deg, #00CFFD 0%, #0891B2 100%)',
              border: 'none',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: saving ? 0.5 : 1,
            }}
          >
            {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Edit Modal Component
function EditModal({ item, type, onSave, onCancel, onChange }: any) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  
  const handleImageUpload = async (field: 'images' | 'gallery', files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setUploadedFiles(prev => [...prev, ...fileArray]);
    
    // Show preview with local URLs
    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    
    onChange({
      ...item,
      [field]: [...(item[field] || []), ...previewUrls]
    });
    
    console.log(`📸 ${fileArray.length} files ready for upload to Cloudinary`);
  };
  
  const handleSaveWithUpload = () => {
    onSave(uploadedFiles);
  };

  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(10px)',
       zIndex: 9999,
        overflow: 'auto',
        padding: '40px 20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#07071A',
          borderRadius: '20px',
          border: '1px solid rgba(168,85,247,0.3)',
          padding: '40px',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '28px',
            fontWeight: '800',
            color: 'white',
            margin: 0,
          }}>
            {(item.name || item.title) ? 'Edit' : 'Add'} {type === 'projects' ? 'Project' : 'Story'}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
          {/* Basic Fields */}
          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px',
            }}>
              {type === 'projects' ? 'Project Name' : 'Story Title'}
            </label>
            <input
              type="text"
              value={item.name || item.title || ''}
              onChange={(e) => onChange({
                ...item,
                [type === 'projects' ? 'name' : 'title']: e.target.value
              })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px',
            }}>
              {type === 'projects' ? 'Tagline' : 'Headline'}
            </label>
            <input
              type="text"
              value={item.tagline || item.headline || ''}
              onChange={(e) => onChange({
                ...item,
                [type === 'projects' ? 'tagline' : 'headline']: e.target.value
              })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
              }}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px',
            }}>
              📸 Card Images (3 for carousel)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload('images', e.target.files)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
              }}
            />
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {item.images?.map((img: string, idx: number) => (
                <div key={idx} style={{
                  padding: '4px 8px',
                  background: 'rgba(0,207,253,0.1)',
                  border: '1px solid rgba(0,207,253,0.3)',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#00CFFD',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {idx + 1}. {img.split('/').pop()}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px',
            }}>
              🖼️ Gallery Images (5 for modal)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload('gallery', e.target.files)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
              }}
            />
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {item.gallery?.map((img: string, idx: number) => (
                <div key={idx} style={{
                  padding: '4px 8px',
                  background: 'rgba(168,85,247,0.1)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#A855F7',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {idx + 1}. {img.split('/').pop()}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px',
            }}>
              Short Description
            </label>
            <textarea
              value={item.desc || ''}
              onChange={(e) => onChange({ ...item, desc: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                resize: 'vertical',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px',
            }}>
              Full Description (for modal)
            </label>
            <textarea
              value={item.fullDesc || ''}
              onChange={(e) => onChange({ ...item, fullDesc: e.target.value })}
              rows={5}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Color Picker */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Accent Color
              </label>
              <input
                type="color"
                value={item.accent || '#00CFFD'}
                onChange={(e) => onChange({ ...item, accent: e.target.value })}
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}>
                Status Badge
              </label>
              <input
                type="text"
                value={item.status || item.tag || ''}
                onChange={(e) => onChange({
                  ...item,
                  [type === 'projects' ? 'status' : 'tag']: e.target.value
                })}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          {/* Project Links (only for projects) */}
          {type === 'projects' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  🔗 Demo URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://your-project.com"
                  value={item.demo || ''}
                  onChange={(e) => onChange({
                    ...item,
                    demo: e.target.value
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  💻 GitHub URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={item.github || ''}
                  onChange={(e) => onChange({
                    ...item,
                    github: e.target.value
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          )}

          {/* Social Impact Fields (only for social-impact) */}
          {type === 'social-impact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              {/* Icon Selector */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  🎨 Icon (Wifi, Heart, Users, Globe)
                </label>
                <select
                  value={item.icon || 'Heart'}
                  onChange={(e) => onChange({ ...item, icon: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                  }}
                >
                  <option value="Heart">Heart ❤️</option>
                  <option value="Wifi">Wifi 📶</option>
                  <option value="Users">Users 👥</option>
                  <option value="Globe">Globe 🌍</option>
                </select>
              </div>

              {/* Program Statistics */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  📊 Program Statistics (Format: value|label, contoh: 200+|Residents, 5|Villages)
                </label>
                <textarea
                  placeholder="200+|Residents&#10;5|Villages&#10;3mo|Duration"
                  value={item.stats?.map((s: any) => `${s.val}|${s.label}`).join('\n') || ''}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter(l => l.trim());
                    const stats = lines.map(line => {
                      const [val, label] = line.split('|').map(s => s.trim());
                      return { val: val || '', label: label || '' };
                    });
                    onChange({ ...item, stats });
                  }}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  ✨ Key Highlights (satu per baris)
                </label>
                <textarea
                  placeholder="Basic computing & smartphone usage&#10;Digital entrepreneurship workshops&#10;Online health resource access"
                  value={item.highlights?.join('\n') || ''}
                  onChange={(e) => {
                    const highlights = e.target.value.split('\n').filter(h => h.trim());
                    onChange({ ...item, highlights });
                  }}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Achievements */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  🏆 Achievements (satu per baris)
                </label>
                <textarea
                  placeholder="200+ residents trained in digital literacy&#10;5 villages connected to digital resources&#10;Ongoing community tech support established"
                  value={item.achievements?.join('\n') || ''}
                  onChange={(e) => {
                    const achievements = e.target.value.split('\n').filter(a => a.trim());
                    onChange({ ...item, achievements });
                  }}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Impact Metrics */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '8px',
                }}>
                  📈 Impact Metrics (Format: label|value, contoh: Training Sessions|40+)
                </label>
                <textarea
                  placeholder="Training Sessions|40+&#10;Success Rate|85%&#10;Follow-up Support|Ongoing"
                  value={item.impact?.map((m: any) => `${m.label}|${m.value}`).join('\n') || ''}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter(l => l.trim());
                    const impact = lines.map(line => {
                      const [label, value] = line.split('|').map(s => s.trim());
                      return { label: label || '', value: value || '' };
                    });
                    onChange({ ...item, impact });
                  }}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveWithUpload}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
              border: 'none',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Save size={16} /> Save {type === 'projects' ? 'Project' : 'Story'}
            {uploadedFiles.length > 0 && (
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '11px',
              }}>
                {uploadedFiles.length} images
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
