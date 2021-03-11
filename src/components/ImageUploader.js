import { React, useRef } from 'react';

import { saveImage } from '../services/ImagesService';

const ImageUploader = () => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

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
          console.log(img);
        } catch (err) {
          console.log(err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div onClick={() => imageUploader.current.click()}>
        <img ref={uploadedImage} />
      </div>
      <input
        ref={imageUploader}
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUploader;