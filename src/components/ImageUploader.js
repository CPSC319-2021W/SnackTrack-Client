import { React, useRef } from 'react';

import AppButton from '../components/AppButton';
import Jimp from 'jimp/es';
import { setSnackImageUploadData } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/ImageUploader.module.css';
import { useDispatch } from 'react-redux';

const ImageUploader = () => {
  const dispatch = useDispatch();
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const setImageUploadData = (imageUploadData) => {
    dispatch(setSnackImageUploadData(imageUploadData));
  };

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = async () => {
        try {
          Jimp.read(reader.result)
            .then(async (image) => {
              const img = await image
                .cover(250, 250)
                .quality(100)
                .getBase64Async(Jimp.MIME_PNG);

              setImageUploadData(img);
              current.src = img;
              return;
            })
            .catch((err) => {
              console.error(err);
            });
        } catch (err) {
          console.log(err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      {uploadedImage ? (
        <div
          className={styles.imageUploadGreyBox}
          onClick={() => imageUploader.current.click()}
        >
          <img ref={uploadedImage} className={styles.imageUploadBox} />
        </div>
      ) : (
        <div
          className={styles.imageUploadBox}
          onClick={() => imageUploader.current.click()}
        />
      )}
      <input
        ref={imageUploader}
        className={styles.hidden}
        id='imageUpload'
        type='file'
        accept='image/*;'
        capture='camera'
        onChange={handleImageUpload}
      />
      <div className={styles.buttonContainer}>
        <AppButton secondary onClick={() => imageUploader.current.click()}>
          Upload Photo
        </AppButton>
      </div>
    </div>
  );
};

export default ImageUploader;
