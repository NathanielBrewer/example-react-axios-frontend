import React, { useState, useRef } from 'react';
import '../App.css';
import { BackendCommunicationClient } from '../common/backendCommunicationClient';
import { toast } from 'react-toastify';

function FileUploadForm() {
  const backendCommunicationClient = BackendCommunicationClient.getInstance();

  const [file, setFile] = useState(null);
  const [uploadedFilenames, setUploadedFilenames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: any): void {
    setFile(event.target.files[0]);
  };

  async function handleSubmit(): Promise<void> {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await backendCommunicationClient.uploadFile(formData);
      if(result.success) {
        setUploadedFilenames(prevFilenames => [...prevFilenames, result.data!.filename]);
        toast.success(result.message);
        if(fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  async function handleDownloadFile(filename: string): Promise<void> {
    try {
      const result = await backendCommunicationClient.downloadFile(filename);
      if(result.success) {
        const fileURL = window.URL.createObjectURL(result.data!.blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileURL);
        toast.success(`Successfully downloaded ${filename}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <section className="section">
      <h2>Image file operations</h2>
      <p>Instructions:</p>
      <ul>
        <li>Use the <b>Choose File</b> button to open the File Picker and select a JPG or PNG file to upload to Firebase Storage</li>
        <li>Once the file has been uploaded, its unique filename and a <b>Download image file</b> button will be added to the list of available image files</li>
        <li>Clicking a <b>Download image file</b> button will download the file from Firebase storage and save it on your machine</li>
      </ul>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} ref={fileInputRef} />
        <button type="submit">Upload image file</button>
      </form>
      <p>Available files:</p>
      <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {uploadedFilenames.map((filename) => (
          <li key={filename}>
            <b>{filename}</b> <button onClick={() => handleDownloadFile(filename)}>Download file</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FileUploadForm;
