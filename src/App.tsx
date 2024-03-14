import { useEffect } from 'react';
import './App.css';
import { BackendCommunicationClient } from './common/backendCommunicationClient';

function App() {
  let backendCommunicationClient = BackendCommunicationClient.getInstance();

  useEffect(() => {
    (async function () {
      let result = await backendCommunicationClient.postText('test text');
      console.log('result', result);
      let testAddResult = await backendCommunicationClient.getText('0Q4KYqugnsUmVMvpV8QS');
      console.log('testAddResult', testAddResult);
    })()
  })
  return (
    <div className="App">
      <header className="App-header">
        Parados App
      </header>
    </div>
  );
}

export default App;
