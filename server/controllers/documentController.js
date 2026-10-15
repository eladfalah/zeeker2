const Document = require('../models/Document');

exports.getDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const documents = await Document.find({ userId: id });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת מסמכים', error: error.message });
  }
};

exports.uploadDocuments = async (req, res) => {
  try {
    const { userId, fileName, fileUrl, fileType } = req.body;

    const newDocument = new Document({
      userId,
      fileName,
      fileUrl,
      fileType
    });

    await newDocument.save();

    res.status(201).json({ 
      message: 'המסמך הועלה ונשמר בהצלחה', 
      document: newDocument 
    });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשמירת המסמך', error: error.message });
  }
};
