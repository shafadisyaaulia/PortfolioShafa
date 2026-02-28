import express from 'express';
import multer from 'multer';
import { getDatabase } from './lib/mongodb';
import { uploadImage } from './lib/cloudinary';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET all social impact stories
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const stories = await db
      .collection('socialImpact')
      .find({})
      .sort({ id: 1 })
      .toArray();

    console.log(`📦 Fetched ${stories.length} social impact stories from MongoDB`);
    res.json({ success: true, data: stories });
  } catch (error) {
    console.error('❌ Error fetching social impact:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch social impact' });
  }
});

// POST new social impact story
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const db = await getDatabase();
    const storyData = JSON.parse(req.body.data);

    // Upload images to Cloudinary if provided
    if (req.files && Array.isArray(req.files)) {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadImage(file.buffer, 'portfolio/social-impact'))
      );
      storyData.images = imageUrls;
      storyData.gallery = imageUrls;
    }

    // Add timestamps
    storyData.createdAt = new Date();
    storyData.updatedAt = new Date();

    const result = await db.collection('socialImpact').insertOne(storyData);

    console.log('✅ Social impact story created:', result.insertedId);
    res.json({ success: true, data: { ...storyData, _id: result.insertedId } });
  } catch (error) {
    console.error('❌ Error creating social impact:', error);
    res.status(500).json({ success: false, error: 'Failed to create social impact story' });
  }
});

// PUT update social impact story
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const db = await getDatabase();
    const storyId = req.params.id;
    const storyData = JSON.parse(req.body.data);

    // Upload new images if provided
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadImage(file.buffer, 'portfolio/social-impact'))
      );
      storyData.images = imageUrls;
      storyData.gallery = imageUrls;
    }

    // Update timestamp
    storyData.updatedAt = new Date();

    const result = await db
      .collection('socialImpact')
      .updateOne({ id: storyId }, { $set: storyData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    console.log('✅ Social impact story updated:', storyId);
    res.json({ success: true, data: storyData });
  } catch (error) {
    console.error('❌ Error updating social impact:', error);
    res.status(500).json({ success: false, error: 'Failed to update social impact story' });
  }
});

// DELETE social impact story
router.delete('/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const storyId = req.params.id;

    const result = await db.collection('socialImpact').deleteOne({ id: storyId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    console.log('✅ Social impact story deleted:', storyId);
    res.json({ success: true, message: 'Story deleted' });
  } catch (error) {
    console.error('❌ Error deleting social impact:', error);
    res.status(500).json({ success: false, error: 'Failed to delete social impact story' });
  }
});

export default router;
