import React, { useState, useEffect } from 'react';
import speciesData from './species.json';

const BasicInfo = ({ onNext }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [majorCategory, setMajorCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [imageUrlError, setImageUrlError] = useState('');
  const [nameError, setNameError] = useState('');
  const [majorCategoryError, setMajorCategoryError] = useState('');
  const [subCategoryError, setSubCategoryError] = useState('');

  useEffect(() => {
    const selectedCategory = speciesData[majorCategory];
    setSubCategoryOptions(selectedCategory ? Object.entries(selectedCategory) : []);
  }, [majorCategory]);

  const handleNext = () => {
    if (!imageUrl.trim()) {
      setImageUrlError('Image URL is required.');
      return;
    } else {
      setImageUrlError('');
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!name.trim()) {
      setNameError('Name is required.');
      return;
    } else if (!nameRegex.test(name.trim())) {
      setNameError('Name should contain only English letters.');
      return;
    } else {
      setNameError('');
    }

    if (!majorCategory) {
      setMajorCategoryError('Major Category is required.');
      return;
    } else {
      setMajorCategoryError('');
    }

    if (!subCategory) {
      setSubCategoryError('Sub Category is required.');
      return;
    } else {
      setSubCategoryError('');
    }

    onNext({ imageUrl, name, majorCategory, subCategory });
  };

  return (
    <div>
      <h2>Basic Info</h2>
      <div>
        <label htmlFor="imageUrl">Image URL: </label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        {imageUrlError && <span style={{ color: 'red' }}>{imageUrlError}</span>}
      </div>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
      </div>
      <div>
        <label htmlFor="majorCategory">Major Category: </label>
        <select id="majorCategory" value={majorCategory} onChange={(e) => setMajorCategory(e.target.value)}>
          <option value="">Select</option>
          {Object.keys(speciesData).map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        {majorCategoryError && <span style={{ color: 'red' }}>{majorCategoryError}</span>}
      </div>
      <div>
        <label htmlFor="subCategory">Sub Category: </label>
        <select id="subCategory" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select</option>
          {subCategoryOptions.map(([name, code], index) => (
            <option key={index} value={code}>{name}</option>
          ))}
        </select>
        {subCategoryError && <span style={{ color: 'red' }}>{subCategoryError}</span>}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default BasicInfo;