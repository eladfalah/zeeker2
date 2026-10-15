/*
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

import { auth } from '../firebase';
import { FilesList } from './FilesList';
import { Orange_button } from './Orange_button';

export const Upload_documents_page = () => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState(null); // תיקון שגיאת הכתיב

  // מעקב אחרי מצב האותנטיקציה
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // טעינת מסמכים רק כשהמשתמש קיים ויש לו UID
  useEffect(() => {
    if (!user) return; // הגנה מפני קריסה כשהמשתמש עדיין null

    console.log(user.displayName);

    const fetchDocuments = async () => {
      try {
        // ב-Firebase Auth משתמשים ב-.uid ולא ב-.firebaseuid
const response = await axios.get(`/api/documents/${user.uid}`);
        setDocuments(response.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };

    fetchDocuments();
  }, [user]); // תלוי בשינוי של אובייקט ה-user כולו

  return (
    <>      
      <div className='container d-flex flex-column'>
        <div className='container d-flex flex-row header row-3'>
          <div className='container'>
            <img src='../../public/assets/icons/Icons.png' alt='icon' />
          </div>
          <div className='container text-white'>
            <h2>ZEEKER X</h2>
          </div>
        </div>

        <div className='container d-flex flex-column row-6'>
{    
 documents&&(
<>
          <FilesList canAdd={true} head_data={{ title: "המסמכים שלי", text: "אפשר להעלות עד 10 מסמכים" }} files={documents} />
          <FilesList head_data={{ title: "המסמכים שהועלו בידי זיקר", text: "לא ניתן למחוק" }} files={[]} />
          <FilesList head_data={{ title: "המסמכים שלי", text: "אפשר להעלות עד 10 מסמכים" }} files={[]} />
</>
)
}       
      </div>

        <div className='container d-flex flex-column row-3 mt-5'>
          <Orange_button text={'הקפיצו אותי למסך האשי'} />
        </div>
      </div>
    </>
  );
};

export default Upload_documents_page;
*/
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

import { auth } from '../firebase';
import { FilesList } from './FilesList';
import { Orange_button } from './Orange_button';

export const Upload_documents_page = () => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchDocuments = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const response = await axios.get(`/api/documents/${user.uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(response.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  return (
    <>      
      <div className='container d-flex flex-column'>
        <div className='container d-flex flex-row header row-3'>
          <div className='container'>
            <img src='../../public/assets/icons/Icons.png' alt='icon' />
          </div>
          <div className='container text-white'>
            <h2>ZEEKER X</h2>
          </div>
        </div>

        <div className='container d-flex flex-column row-6'>
          {documents && (
            <>
              <FilesList 
                canAdd={true} 
                head_data={{ title: "המסמכים שלי", text: "אפשר להעלות עד 10 מסמכים" }} 
                files={documents} 
                onUploadSuccess={fetchDocuments}
              />
              <FilesList files={[]} />
              <FilesList files={[]} />
            </>
          )}
        </div>

        <div className='container d-flex flex-column row-3 mt-5'>
          <Orange_button text={'הקפיצו אותי למסך האשראי'} />
        </div>
      </div>
    </>
  );
};

export default Upload_documents_page;
