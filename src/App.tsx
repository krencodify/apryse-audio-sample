import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';
import {initializeAudioViewer} from "@pdftron/webviewer-audio";

const App = () => {
  const viewer = useRef(null);

  const [_instance, setInstance ] = React.useState(null);

  useEffect(() => {
    WebViewer.Iframe(
      {
        path: '/lib/webviewer',
      },
      viewer.current,
    ).then(async (instance) => {
        setInstance(instance);
        const audioViewerInstance = await initializeAudioViewer(instance, {
            license: '',
            showMobileStyling:false
        });

        audioViewerInstance.loadAudio('https://pdftron.s3.amazonaws.com/downloads/pl/video/audio.mp3');

    });
  }, []);


  return (
    <div className="App">
      <div className="webviewer" ref={viewer}></div>
        <button
            style={{
                position: 'absolute',
                top: '200px',
                left:'50%'
            }}
            value='Set audio comment tool' onClick={()=>{
            _instance.UI.setToolMode('AudioCommentTool')
        }}>Set audio comment tool</button>
    </div>
  );
};

export default App;
