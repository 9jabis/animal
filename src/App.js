import React, { useState } from 'react';
import BasicInfo from './BasicInfo';
import BirthInfo from './BirthInfo';
import OtherInfo from './OtherInfo';
import Complete from './Complete';
import ProgressBar from './ProgressBar';

const App = () => {
  const [step, setStep] = useState('basic');
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    switch (step) {
      case 'basic':
        setStep('birth');
        break;
      case 'birth':
        setStep('other');
        break;
      case 'other':
        setStep('complete');
        break;
      case 'complete':
        setStep('animalList');
        break;
      default:
        break;
    }
  };

  const handlePrev = () => {
    switch (step) {
      case 'birth':
        setStep('basic');
        break;
      case 'other':
        setStep('birth');
        break;
      case 'complete':
        setStep('other');
        break;
      case 'animalList':
        setStep('complete');
        break;
      default:
        break;
    }
  };

  const handleShowAll = () => {
    setStep('animalList');
  };

  return (
    <div>
      <ProgressBar step={step} />
      {step === 'basic' && <BasicInfo onNext={handleNext} />}
      {step === 'birth' && <BirthInfo onPrev={handlePrev} onNext={handleNext} />}
      {step === 'other' && <OtherInfo onPrev={handlePrev} onNext={handleNext} />}
      {step === 'complete' && <Complete formData={formData} onShowAll={handleShowAll} />}
    </div>
  );
};

export default App;