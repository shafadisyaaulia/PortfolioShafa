import express from 'express';
import multer from 'multer';
import { getDatabase } from './lib/mongodb';
import { uploadImage } from './lib/cloudinary';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET all projects
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const projects = await db
      .collection('projects')
      .find({})
      .sort({ id: 1 })
      .toArray();

    console.log(`📦 Fetched ${projects.length} projects from MongoDB`);
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

// POST new project
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const db = await getDatabase();
    const projectData = JSON.parse(req.body.data);

    // Upload images to Cloudinary if provided
    if (req.files && Array.isArray(req.files)) {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadImage(file.buffer, 'portfolio/projects'))
      );
      projectData.images = imageUrls;
      projectData.gallery = imageUrls;
    }

    // Add timestamps
    projectData.createdAt = new Date();
    projectData.updatedAt = new Date();

    const result = await db.collection('projects').insertOne(projectData);

    console.log('✅ Project created:', result.insertedId);
    res.json({ success: true, data: { ...projectData, _id: result.insertedId } });
  } catch (error) {
    console.error('❌ Error creating project:', error);
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

// PUT update project
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const db = await getDatabase();
    const projectId = parseInt(req.params.id);
    const projectData = JSON.parse(req.body.data);

    // Upload new images if provided
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadImage(file.buffer, 'portfolio/projects'))
      );
      projectData.images = imageUrls;
      projectData.gallery = imageUrls;
    }

    // Update timestamp
    projectData.updatedAt = new Date();

    const result = await db
      .collection('projects')
      .updateOne({ id: projectId }, { $set: projectData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    console.log('✅ Project updated:', projectId);
    res.json({ success: true, data: projectData });
  } catch (error) {
    console.error('❌ Error updating project:', error);
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const projectId = parseInt(req.params.id);

    const result = await db.collection('projects').deleteOne({ id: projectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    console.log('✅ Project deleted:', projectId);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

export default router;
