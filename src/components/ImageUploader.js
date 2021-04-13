import { React, useRef, useState } from 'react';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import Jimp from 'jimp/es';
import imagePlaceholder from '../assets/placeholders/image.png';
import { setSnackImageUploadData } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/ImageUploader.module.css';

const ImageUploader = (props) => {
  const { src } = props;
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const { snackImageUploadData } = useSelector((state) => state.snacksReducer);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const openToastNotification = () => dispatch(setToastNotificationOpen(true));

  const setErrorMessage = () => dispatch(setApiResponse('INCORRECT_FILE_TYPE'));

  const setImageUploadData = (imageUploadData) => {
    dispatch(setSnackImageUploadData(imageUploadData));
  };

  const handleImageUpload = async (e) => {
    setIsUploading(true);
    try {
      const [file] = e.target.files;
      if (file) {
        if (file.type.substring(0, 6) !== 'image/' || file.type === 'image/webp') {
          setErrorMessage();
          setIsUploading(false);
          openToastNotification();
          return;
        }
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = async () => {
          Jimp.read(reader.result).then(async (image) => {
            const img = await image
              .cover(250, 250)
              .quality(100)
              .getBase64Async(Jimp.MIME_PNG);

            setImageUploadData(img);
            current.src = img;
          });
        };
        reader.readAsDataURL(file);
      } else {
        setIsUploading(false);
      }
    } catch (err) {
      setErrorMessage();
      openToastNotification();
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.imageUploadGreyBox}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          src={src ? src : imagePlaceholder}
          className={styles.imageUploadBox}
        />
      </div>
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
        <AppButton
          secondary
          loading={isUploading}
          onClick={() => imageUploader.current.click()}
        >
          {snackImageUploadData || src ? 'Change Photo' : 'Upload Photo'}
        </AppButton>
      </div>
    </div>
  );
};

export default ImageUploader;
