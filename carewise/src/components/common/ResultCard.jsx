import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-card">
      <h3>Analysis Results</h3>
      
      <div className="result-section">
        <h4>Possible Condition</h4>
        <p>{result.symptom || 'Unknown condition'}</p>
      </div>

      {result.causes && (
        <div className="result-section">
          <h4>Possible Causes</h4>
          <ul>
            {Array.isArray(result.causes) 
              ? result.causes.map((cause, index) => <li key={index}>{cause}</li>)
              : <li>{result.causes}</li>
            }
          </ul>
        </div>
      )}

      {result.remedies && (
        <div className="result-section">
          <h4>Home Remedies</h4>
          <ul>
            {Array.isArray(result.remedies)
              ? result.remedies.map((remedy, index) => <li key={index}>{remedy}</li>)
              : <li>{result.remedies}</li>
            }
          </ul>
        </div>
      )}

      {result.medicines && (
        <div className="result-section">
          <h4>Suggested Medicines</h4>
          <ul>
            {Array.isArray(result.medicines)
              ? result.medicines.map((medicine, index) => (
                  <li key={index}>
                    {typeof medicine === 'string'
                      ? medicine
                      : `${medicine.name || ''}${medicine.type ? ` (${medicine.type})` : ''}${medicine.dosage ? ` - ${medicine.dosage}` : ''}`}
                  </li>
                ))
              : <li>{result.medicines}</li>
            }
          </ul>
        </div>
      )}

      {result.severity && (
        <div className="result-section">
          <h4>Severity Level</h4>
          <span className={`severity-${result.severity.toLowerCase()}`}>
            {result.severity}
          </span>
        </div>
      )}

      {result.openFdaInfo && (
        <div className="result-section">
          <h4>OpenFDA Medicine Info</h4>
          <ul>
            {result.openFdaInfo.openfda?.brand_name && (
              <li><strong>Brand Name:</strong> {result.openFdaInfo.openfda.brand_name.join(', ')}</li>
            )}
            {result.openFdaInfo.openfda?.generic_name && (
              <li><strong>Generic Name:</strong> {result.openFdaInfo.openfda.generic_name.join(', ')}</li>
            )}
            {result.openFdaInfo.purpose && (
              <li><strong>Purpose:</strong> {Array.isArray(result.openFdaInfo.purpose) ? result.openFdaInfo.purpose.join(' ') : result.openFdaInfo.purpose}</li>
            )}
            {result.openFdaInfo.warnings && (
              <li><strong>Warnings:</strong> {Array.isArray(result.openFdaInfo.warnings) ? result.openFdaInfo.warnings.join(' ') : result.openFdaInfo.warnings}</li>
            )}
          </ul>
        </div>
      )}

      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.</p>
      </div>
    </div>
  );
};

export default ResultCard;
