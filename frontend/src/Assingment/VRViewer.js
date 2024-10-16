
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import 'aframe'; // Import A-Frame
import './ARVRComponent.css';
import React, { useEffect } from 'react';
const Model = ({ url }) => {
    const gltf = useLoader(GLTFLoader, url); // Load the GLB model
    return <primitive object={gltf.scene} />;
};

const VRViewer = () => {
      useEffect(() => {
        // This effect runs when the component mounts
        const board1Model = document.querySelector('#board1-model');
        const board2Model = document.querySelector('#board2-model');
        const board1Radio = document.querySelector('#board1');
        const board2Radio = document.querySelector('#board2');
    
        board1Radio.addEventListener('change', () => {
          if (board1Radio.checked) {
            board1Model.style.visibility = 'visible';
            board2Model.style.visibility = 'hidden';
          }
        });
    
        board2Radio.addEventListener('change', () => {
          if (board2Radio.checked) {
            board1Model.style.visibility = 'hidden';
            board2Model.style.visibility = 'visible';
          }
        });
    
        // Set initial visibility
        board1Model.style.visibility = 'visible';
        board2Model.style.visibility = 'hidden';
      }, []);
    
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '50px' }}>
            <i style={{ fontSize: '12px' }}>Change Objects</i>
            <input type="radio" name="board" value="board1" id="board1" defaultChecked />
            <label htmlFor="board1">
              <img
                src="https://cdn.glitch.global/6a75afee-2d7e-4c33-8239-4b115a7b34ff/switchboard2.png?v=1680773610294"
                alt="Board 1"
                width="40"
                height="25"
              />
            </label>
            <input type="radio" name="board" value="board2" id="board2" />
            <label htmlFor="board2">
              <img
                src="https://cdn.glitch.global/6a75afee-2d7e-4c33-8239-4b115a7b34ff/creamboard.png?v=1680777346635"
                alt="Board 2"
                width="50"
                height="25"
              />
            </label>
          </div>
    
          <div id="board-container" style={{ marginTop: '50px' }}>
            <model-viewer
              id="board1-model"
              src="https://cdn.glitch.global/58c61000-2600-4c03-bea3-e35a9d41bfaf/untitled.glb?v=1680512709085"
              alt="A 3D model of a switch board"
              shadow-intensity="1"
              camera-controls
              ar
              style={{ width: '600px', height: '400px' }} // Optional styling
            />
            <model-viewer
              id="board2-model"
              src="https://cdn.glitch.global/58c61000-2600-4c03-bea3-e35a9d41bfaf/sandy.glb?v=1680518190173"
              alt="A 3D model of a switch board"
              shadow-intensity="1"
              camera-controls
              ar
              style={{ width: '600px', height: '400px' }} // Optional styling
            />
          </div>
    
          <a-scene embedded arjs="debugUIEnabled: false;">
            <a-marker preset="custom" type="pattern" url="marker.png">
              {/* You can add 3D models or entities here */}
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
        </div>
      );
  
    
};

export default VRViewer;
