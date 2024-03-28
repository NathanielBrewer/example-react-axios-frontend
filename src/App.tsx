import './App.css';
import FileOperations from './components/fileOperations';
import TextOperations from './components/textOperations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  console.log(process.env);
  return (
    <div className="App App-header">
      <p className="text-warning usage-note">
        <b>Only texts and images added/uploaded in this session are available to you</b>
      </p>
      <TextOperations />
      <FileOperations />
      <ToastContainer />
    </div>
  );
}

export default App;
