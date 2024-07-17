// import axios from 'axios';
// import { postFileId, postFilelist } from "../../api"
// import { getConfigImg} from '@/app/(tabs)/(master)/main';
//
// interface UploadFileResponse {
//   body: string;
//   url: string;
// }

// interface UploadFileParams {
//   file: File;
//   setUploadResponse?: (response: UploadFileResponse) => void;
// }
//
// interface UploadFilesParams {
//   files: FileList;
//   setUploadResponse?: (response: string) => void;
// }

// export const uploadFile = async ({ file, setUploadResponse }: UploadFileParams) => {
//   const formData = new FormData();
//   formData.append('file', file);
//
//   try {
//     const config = await getConfigImg();
//     const response = await axios.post(postFileId, formData, config ? config : {});
//
//     if (setUploadResponse) {
//       setUploadResponse(response.data);
//     }
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     // Handle the error appropriately
//   }
// };
//
// export const uploadFiles = async ({ files, setUploadResponse }: UploadFilesParams) => {
//   const formData = new FormData();
//
//   // Append each file to FormData
//   Array.from(files).forEach(file => {
//     formData.append('files', file);
//   });
//
//   try {
//     const config = await getConfigImg();
//     const response = await axios.post(postFilelist, formData, config ? config : {});
//
//     if (setUploadResponse) {
//       setUploadResponse(response.data.message || 'Files uploaded successfully');
//     }
//   } catch (error) {
//     if (setUploadResponse) {
//       setUploadResponse('Error uploading files');
//     }
//     // Handle the error appropriately
//   }
// };