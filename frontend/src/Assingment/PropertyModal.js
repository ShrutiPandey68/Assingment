import React from 'react';
import { Modal } from 'react-bootstrap'; // Use react-bootstrap for modal functionality
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const PropertyModel = ({ modelPath }) => {
    const gltf = useLoader(GLTFLoader, modelPath);
    return <primitive object={gltf.scene} />;
};

const PropertyModal = ({ show, onHide, property }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {property.name} - Tour
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{property.location}</h4>
                <Canvas style={{ height: '400px' }}>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <PropertyModel modelPath={property.modelPath} />
                    <OrbitControls />
                </Canvas>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    );
};

export default PropertyModal;
