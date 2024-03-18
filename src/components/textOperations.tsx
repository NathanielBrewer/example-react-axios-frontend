import React, { useState } from 'react';
import '../App.css';
import { toast } from 'react-toastify';
import { BackendCommunicationClient } from '../common/backendCommunicationClient';

function TextOperations() {
  const backendCommunicationClient = BackendCommunicationClient.getInstance();

  const [text, setText] = useState('');
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  async function handleAddText(): Promise<void> {
    try {
      const result = await backendCommunicationClient.postText(text);
      if(result.success) {
        setSubmittedIds([...submittedIds, result.data!.id]);
        setText('');
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  
  async function handleFetchText(id: string): Promise<void> {
    try {
      const result = await backendCommunicationClient.getText(id);
      if(result.success) {
        toast.success(`Text for ID ${id}: ${result.data!.text}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <section className="section">
      <h2>Text operations</h2>
      <p>Instructions:</p>
      <ul>
        <li>Enter text and click <b>Add</b> to add text to the Firestore Database</li>
        <li>Once your text has been added, its ID will be added to the list of available texts</li>
        <li>Click on any ID to retrieve it from the Firestore Database and display its value</li>
      </ul>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleAddText}>Add</button>
      <p>Available text IDs:</p>
      <ul>
        {submittedIds.map((id) => (
          <li key={id}>
            <b>{id}</b> <button onClick={() => handleFetchText(id)}>Get text</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
  
export default TextOperations;