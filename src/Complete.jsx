import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Complete = ({ formData }) => {
  const formatBirthDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate;
  };

  const getWarningIcon = (dateString) => {
    const currentDate = getCurrentDate();
    const birthDate = new Date(dateString);
    const diffYears = currentDate.getFullYear() - birthDate.getFullYear();
    if (diffYears >= 10) {
      return '🚨';
    }
    return '';
  };

  let subSpeciesName = '';
  switch (formData.majorCategory) {
    case 'Amphibia':
      switch (formData.subCategory) {
        case 'AM0001':
          subSpeciesName = 'Axolotl';
          break;
        case 'AM0002':
          subSpeciesName = 'Frogs';
          break;
        case 'AM0003':
          subSpeciesName = 'Salamanders';
          break;
        default:
          subSpeciesName = 'Unknown';
          break;
      }
      break;
    case 'Reptilia':
      switch (formData.subCategory) {
        case 'RE0001':
          subSpeciesName = 'Turtles';
          break;
        case 'RE0002':
          subSpeciesName = 'Dinosaur';
          break;
        case 'RE0003':
          subSpeciesName = 'Crocodiles';
          break;
        default:
          subSpeciesName = 'Unknown';
          break;
      }
      break;
    case 'Mammalia':
      switch (formData.subCategory) {
        case 'MA0001':
          subSpeciesName = 'Dog';
          break;
        case 'MA0002':
          subSpeciesName = 'Carnivores';
          break;
        case 'MA0003':
          subSpeciesName = 'Lion';
          break;
        case 'MA0004':
          subSpeciesName = 'Marsupials';
          break;
        default:
          subSpeciesName = 'Unknown';
          break;
      }
      break;
    default:
      subSpeciesName = 'Unknown';
      break;
  };

  const jsonData = {
    imageUrl: formData.imageUrl,
    name: formData.name,
    majorCategory: formData.majorCategory,
    subSpecies: formData.subCategory,
    subSpeciesName: subSpeciesName,
    birthDate: formatBirthDate(formData.birthDate),
    isKoreanBirth: formData.isKoreanBirth,
    birthCountry: formData.birthCountry,
    liveSpace: formData.liveSpace,
    warning: getWarningIcon(formData.birthDate),
    remarks: formData.remarks
  };

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Master Species', field: 'majorCategory' },
    { headerName: 'Sub Species', field: 'subSpeciesName' },
    { headerName: 'Birth Date', field: 'birthDate' },
    { headerName: 'Birth in Korea', field: 'isKoreanBirth' },
    { headerName: 'Birth Country', field: 'birthCountry' },
    { headerName: 'Live Space', field: 'liveSpace' },
    { headerName: 'Warning', field: 'warning', cellRenderer: 'agGroupCellRenderer' },
    { headerName: 'Remarks', field: 'remarks' }
  ];

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const updatedRowData = [...rowData, jsonData];

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(updatedRowData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'animal_info.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Complete</h2>
      <img src={formData.imageUrl} alt="Animal" />
      <p>Name: {formData.name}</p>
      <p>Master Species: {formData.majorCategory}</p>
      <p>Sub Species: {subSpeciesName}</p>
      <p>Birth Date: {formatBirthDate(formData.birthDate)}</p>
      <p>Birth in Korea: {formData.isKoreanBirth ? 'Yes' : 'No'}</p>
      <p>Birth Country: {formData.birthCountry}</p>
      <p>Live Space: {formData.liveSpace}</p>
      <p>Remarks: {formData.remarks}</p>
            <div style={{ marginTop: '10px' }}>
        <button onClick={downloadJson}>SAVE JSON</button>
      </div>

      <br></br>
      <h1>Animal List</h1>
      {/* Ag-Grid */}
      <div className="ag-theme-alpine" style={{ height: '400px', width: '90%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={updatedRowData}
          onGridReady={onGridReady}
          frameworkComponents={{ agGroupCellRenderer: WarningCellRenderer }}
        />
      </div>
    </div>
  );
};

const WarningCellRenderer = (props) => {
  return <span role="img" aria-label="Warning">{props.value}</span>;
};

export default Complete;