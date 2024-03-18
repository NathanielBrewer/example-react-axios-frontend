import './App.css';
import FileUploadForm from './components/fileOperations';
import TextOperations from './components/textOperations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App App-header">
      <p className="text-warning">
        <b>Only texts and images added/uploaded in this session are availble to you</b>
      </p>
      <TextOperations />
      <FileUploadForm />
      <ToastContainer />
    </div>
  );
}

export default App;
