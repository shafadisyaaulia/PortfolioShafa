import express from 'express';
import { getDatabase } from './lib/mongodb.js';

const router = express.Router();

// Get settings
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const settings = await db.collection('settings').findOne({ _id: 'site-settings' } as any);
    
    if (!settings) {
      // Return default settings if none exist
      res.json({
        success: true,
        data: {
          profile: {
            name: "Shafa Disya Aulia",
            title: "Full-Stack Developer & Tech Enthusiast",
            bio: "Passionate about leveraging technology to create meaningful impact.",
            email: "shafadisyaaulia@gmail.com",
            phone: "",
            location: "Aceh, Indonesia",
            profileImage: "/images/shafa-portrait.JPG",
            resumeUrl: "",
            social: {
              github: "https://github.com/shafadisyaaulia",
              linkedin: "https://www.linkedin.com/in/shafadisyaaulia",
              twitter: "",
              instagram: "",
              email: "shafadisyaaulia@gmail.com"
            },
            stats: {
              experience: "3+ Years",
              projects: "15+ Projects",
              communities: "5+ Communities"
            }
          }
        }
      });
    } else {
      res.json({ success: true, data: settings });
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Update settings
router.put('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const settingsData = req.body;
    
    const result = await db.collection('settings').updateOne(
      { _id: 'site-settings' } as any,
      { $set: settingsData },
      { upsert: true }
    );
    
    res.json({ 
      success: true, 
      message: 'Settings updated successfully',
      data: settingsData
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
