/*
import React from 'react';

export const FilesList = ({ head_data, files = [], canAdd=false, userid }) => {
  return (
    <div className="d-flex flex-column vw-100 position-relative start-50 translate-middle-x">
      <div className="bg-secondary d-flex justify-content-between align-items-center p-2">
        <button 
          type="button"
          className={`btn bg-warning rounded-circle text-white p-0 d-inline-flex align-items-center justify-content-center flex-shrink-0 border-0 lh-1 fs-5 my-auto ${canAdd ? '' : 'invisible'}`}
          aria-label="הוסף"
          disabled={!canAdd} 
onClick={()=>{

}}
        >
          <span className="px-2 py-1">+</span>
        </button>

        <div className="text-white text-end">
          <div className="d-flex align-items-center justify-content-end gap-1">
            <small className="fs-xs">סה&quot;כ {files.length} מסמכים</small>
            <span>|</span>
            <span className="fw-bold">{head_data?.title || 'gukcghkckghkghjc'}</span>
          </div>

          <small className="fs-xs">{head_data?.text || 'gukcghkckghkghjc'}</small>
        </div>
      </div>

      <div className="list-group d-flex flex-column">
        {files.map((file, i) => (
          <div 
            key={file.userId || i}
            className='d-flex flex-row-reverse justify-content-between list-group-item border border-secondary text-end bg-transparent align-items-center'
          >     
            <div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <div className="text-white text-end">
                  <div className="d-flex align-items-center justify-content-end gap-1">
                    <small className="fs-xs">{file.fileName||'gjgjjjjg'}</small>
                  </div>

                  <small className="fs-xs">MB נפח {file.fileSize|| 0} , {file.createdAt || 'xxxxx'}-עודכן ב </small>
                </div>

                <img className="m-3 ml-0" src={"../../public/assets/icons/file.png"} alt="file icon" /> 
              </div>
            </div>

            <img className="btn" src='../../public/assets/icons/MenuOpen.png' alt="menu icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesList;
*/
import React, { useRef } from 'react';
import axios from 'axios';
import { storage, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const FilesList = ({ head_data, files = [], canAdd = false, uid, onUploadSuccess }) => {
  const fileInputRef = useRef(null);

  const handlePlusClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const currentUser = auth.currentUser;
    if (!file || !currentUser) return;

    const reader = new FileReader();
    
    reader.onload = async () => {
      try {
        const storagePath = `users/${currentUser.uid}/documents_${Date.now()}_${file.name}`;
        const storageRef = ref(storage, storagePath);
        
        const snapshot = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);
        const token = await currentUser.getIdToken();

await axios.post('/api/documents', {
    userId: currentUser.uid,
    fileName: file.name,
    fileUrl: fileUrl,
    fileType: file.type || 'unknown',
    fileSize: file.size
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } catch (error) {
        console.error('שגיאה בשמירת המסמך:', error);
      } finally {
        e.target.value = null;
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="d-flex flex-column vw-100 position-relative start-50 translate-middle-x">
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />

      <div className="bg-secondary d-flex justify-content-between align-items-center p-2">
        <button 
          type="button"
          className={`btn bg-warning rounded-circle text-white p-0 d-inline-flex align-items-center justify-content-center flex-shrink-0 border-0 lh-1 fs-5 my-auto ${canAdd ? '' : 'invisible'}`}
          aria-label="הוסף"
          disabled={!canAdd} 
          onClick={handlePlusClick}
        >
          <span className="px-2 py-1">+</span>
        </button>

        <div className="text-white text-end">
          <div className="d-flex align-items-center justify-content-end gap-1">
            <small className="fs-xs">סה&quot;כ {files.length} מסמכים</small>
            <span>|</span>
            <span className="fw-bold">{head_data?.title || 'gukcghkckghkghjc'}</span>
          </div>

          <small className="fs-xs">{head_data?.text || 'gukcghkckghkghjc'}</small>
        </div>
      </div>

      <div className="list-group d-flex flex-column">
        {files.map((file, i) => (
          <div 
            key={ i}
            className='d-flex flex-row-reverse justify-content-between list-group-item border border-secondary text-end bg-transparent align-items-center'
          >   
            <div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <div className="text-white text-end">
                  <div className="d-flex align-items-center justify-content-end gap-1">
                    <small className="fs-xs">{file.fileName || 'gjgjjjjg'}</small>
                  </div>
<small className="fs-xs">
   נפח MB {((file.fileSize || 0) / 1024).toFixed(2)} , עודכן ב-{file.createdAt ? new Date(file.createdAt).toLocaleDateString('he-IL') : 'xxxxx'} 
</small>
</div>

                <img className="m-3 ml-0" src={"../../public/assets/icons/file.png"} alt="file icon" /> 
              </div>
            </div>

            <img className="btn" src='../../public/assets/icons/MenuOpen.png' alt="menu icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesList;
