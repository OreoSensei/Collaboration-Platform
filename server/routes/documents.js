import express from 'express';
import auth from '../middleware/auth.js';
import Document from '../models/Document.js';

const router = express.Router();

// @route       GET api/documents
// @desc        Get all documents for the user
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const documents = await Document.find({
            $or: [{ owner: req.user.id }, { collaborators: req.user.id }],
        }).sort({ lastEdited: -1 });

        res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/documents/:id
// @desc        Get document by ID
// @access      Private
router.get('/:id', auth, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if(!document) {
            return res.status(404).json({ msg: 'Document not found' });
        }

        //Check if user has access
        if(
            document.owner.toString() !== req.user.id &&
            !document.collaborators.includes(req.user.id)
        ) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        res.json(document);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Document not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route       POST api/documents
// @desc        Create a new document
// @access      Private
router.post('/', auth, async (req, res) => {
    try {
        const newDocument = new Document({
            title: req.body.title || 'Untitled Document',
            owner: req.user.id,
        });

        const document = await newDocument.save();

        res.json(document);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/documents/:id
// @desc        Update document content
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const {content, title} = req.body;

    try {
        let document = await Document.findById(req.params.id);

        if(!document) {
            return res.status(404).json({ msg: 'Document not found' });
        }

        //Check if user has access
        if (
            document.owner.toString() !== req.user.id &&
            !document.collaborators.includes(req.user.id)
        ) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        document.content = content !== undefined ? content : document.content;
        document.title = title !== undefined ? title : document.title;
        document.lastEdited = Date.now();

        await document.save();

        res.json(document);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/documents/:id
// @desc        Delete a document
// @access      Private
router.delete('/:id', auth, async(req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if(!document) {
            return res.status(404).json({ msg: 'Document not found' });
        }

        //Only the owner can delete the document
        if (document.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        await document.remove();

        res.json({ msg: 'Document Removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;