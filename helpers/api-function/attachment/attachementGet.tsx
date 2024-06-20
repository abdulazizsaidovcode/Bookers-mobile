import axios from 'axios';
import { postFileId, postFilelist } from "../../api"
import {config} from "../../token"

interface UploadFileResponse {
  body: string;
  url: string;
}

interface UploadFileParams {
  file: File;
  setUploadResponse?: (response: UploadFileResponse) => void;
}

interface UploadFilesParams {
  files: FileList;
  setUploadResponse?: (response: string) => void;
}
// file ketadi

export const uploadFile = async ({ file, setUploadResponse }: UploadFileParams) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(postFileId, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers, // Assuming config contains the token and any other headers
      },
    });

    if (setUploadResponse) {
      setUploadResponse(response.data);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle the error appropriately
  }
};

// file list ketadi

export const uploadFiles = async ({ files, setUploadResponse }: UploadFilesParams) => {
  const formData = new FormData();

  // Fayllarni FormData ga qo'shish
  Array.from(files).forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post(postFilelist, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers, // Assuming config contains the token and any other headers
      },
    });

    if (setUploadResponse) {
      setUploadResponse(response.data.message || 'Files uploaded successfully');
    }
  } catch (error) {
    console.error('Error uploading files:', error);
    if (setUploadResponse) {
      setUploadResponse('Error uploading files');
    }
    // Handle the error appropriately
  }
};
