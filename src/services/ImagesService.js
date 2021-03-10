import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://api.imgbb.com/1',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

const saveImage = async (imageDataUrl) => {
  let formData = new FormData();
  const blob = await (await fetch(imageDataUrl)).blob();
  formData.append('image', blob);
  formData.append('key', process.env.REACT_APP_IMGBB_API_KEY);
  const { data } = await httpClient.post('/upload', formData);
  return data.data;
};

export { saveImage };
