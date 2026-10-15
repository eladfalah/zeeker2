const { getAuth } = require('firebase-admin/auth');
const { getStorage } = require('firebase-admin/storage');
const User = require('../models/User');
const Message = require('../models/Masseges');
const Document = require('../models/Document');

const register = async (req, res) => {
  try {
    const { phone, email, fullName, displayName } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: 'מספר טלפון חסר' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'משתמש עם מספר טלפון זה כבר קיים' });
    }

    const firebaseUser = await getAuth().createUser({
      phoneNumber: phone.startsWith('+') ? phone : `+972${phone.replace(/^0/, '')}`,
      displayName: displayName || fullName || ''
    });

    let fileUrl = '';
    if (req.file) {
      const bucket = getStorage().bucket();
      const fileName = `users/${firebaseUser.uid}/license_${Date.now()}_${req.file.originalname}`;
      const fileUpload = bucket.file(fileName);

      await fileUpload.save(req.file.buffer, {
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      // קבלת כתובת ציבורית קבועה לקובץ ב-Storage
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-01-2500'
      });
      fileUrl = url;
    }

    const user = new User({
      firebaseuid: firebaseUser.uid,
      fullName: fullName || displayName || 'משתמש חדש',
      email: email,
      phone: phone
    });    
    await user.save();

    // יצירת מסמך
    if (req.file) {
      await Document.create({
        userId: user.firebaseuid,
        fileName: req.file.originalname,
        fileUrl: fileUrl,
fileSize: req.file.size,
        fileType: req.file.mimetype
      });
    }

    await Message.create({
      firebaseUID: firebaseUser.uid,
      userMasseges: []
    });

    const firebaseToken = await getAuth().createCustomToken(firebaseUser.uid, {
      phone: user.phone,
    });

    return res.status(201).json({
      token: firebaseToken,
      user,
      fileUrl
    });

  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'שגיאת שרת בתהליך ההרשמה', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'מספר טלפון חסר' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    if (user.firebaseuid) {
      await Message.findOneAndUpdate(
        { firebaseUID: user.firebaseuid },
        { $setOnInsert: { firebaseUID: user.firebaseuid, userMasseges: [] } },
        { upsert: true }
      );
    }

    const tokenSubject = user.firebaseuid || user._id.toString();
      
    const firebaseToken = await getAuth().createCustomToken(tokenSubject, {
      phone: user.phone,
    });

    return res.status(200).json({
      token: firebaseToken,
      user
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'שגיאת שרת בתהליך ההתחברות', error: error.message });
  }
};

module.exports = {
  register,
  login
};
