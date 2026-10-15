const Masseges = require('../models/Masseges');

exports.getMassegesById = async (req, res) => {
  try {
    const { id } = req.params; // ה-id כאן הוא ה-firebaseUID שנשלח בנתיב

    // מחפשים לפי firebaseUID ולא לפי licensePlate
    const maseges = await Masseges.findOne({ firebaseUID: id });

    if (!maseges) {
      // אם אין עדיין מסמך הודעות למשתמש, נחזיר מבנה ריק עם 200 במקום 404
      return res.status(200).json({ firebaseUID: id, userMasseges: [] });
    }

    res.status(200).json(maseges);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת ההודעות של המשתמש', error: error.message });
  }
};

