import { React, useRef } from 'react';

import Jimp from 'jimp/es';
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
      reader.onload = async () => {
        try {
          Jimp.read(reader.result)
            .then(async (image) => {
              const img = await image
                .cover(250, 250)
                .quality(100)
                .getBase64Async(Jimp.MIME_PNG);

              current.src = img;
              await saveImage(img);
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
    <div>
      <div onClick={() => imageUploader.current.click()}>
        <img ref={uploadedImage} />
      </div>
      <input
        ref={imageUploader}
        id='imageUpload'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUploader;
