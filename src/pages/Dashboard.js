import React from 'react';
import { saveImage } from '../services/ImagesService';
import styles from '../styles/Page.module.css';

const Dashboard = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = async (e) => {
        try {
          current.src = e.target.result;
          const img = await saveImage(reader.result);
          console.log(img.url);
        } catch (err) {
          console.log(err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.base}>
      <h4>Dashboard</h4>
      <div>
        <input
          ref={imageUploader}
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
        />
        <div onClick={() => imageUploader.current.click()}>
          <img ref={uploadedImage} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
