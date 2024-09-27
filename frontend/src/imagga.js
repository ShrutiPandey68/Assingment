import React, { useState } from 'react';
import axios from 'axios';
import './ImageAnalyzer.css'; // Import the CSS file

const ImaggaImageAnalyzer = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [resultimageFile, setResultimageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/analyze-image', { imageUrl });
      setResult(response.data.message.content);
    } catch (err) {
      setError('Error analyzing image. Please try again.');
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

    reader.onloadend = () => {
      setImageFile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setResultimageFile(null); // Clear previous results
    setError(''); // Clear previous errors
  
    const formData = new FormData();
    formData.append('file', imageFile); // Append the file to form data
  
    try {
      const response = await axios.post('http://localhost:4000/api/analyze-image-base64', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      setResultimageFile(response.data.message.content); // Set the result from the API
    } catch (err) {
      setError('Error analyzing image. Please try again.'); // Handle error
      console.error(err); // Log error for debugging
    }
  };

  return (
    <div className="analyzer-container">
      <h1 className="analyzer-title">Image Analyzer</h1>

      <form className="analyzer-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="analyzer-input"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit" className="analyzer-button">Analyze Image URL</button>
      </form>

      <form className="analyzer-form" onSubmit={handleSubmit2}>
        <input
          type="file"
          className="analyzer-input"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit" className="analyzer-button">Analyze Image File</button>
      </form>

      {result && (
        <div className="analyzer-result">
          <h2>Analysis Result for URL:</h2>
          <pre>{result}</pre>
        </div>
      )}

      {resultimageFile && (
        <div className="analyzer-result">
          <h2>Analysis Result for File:</h2>
          <pre>{resultimageFile}</pre>
        </div>
      )}

      {error && <div className="analyzer-error">{error}</div>}
    </div>
  );
};

export default ImaggaImageAnalyzer;
