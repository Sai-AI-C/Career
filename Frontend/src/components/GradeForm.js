import React, { useState, useEffect } from 'react';

const GradeForm = ({ branch, currentYear, yearMap, syllabusMap, onSubmit }) => {
  const [grades, setGrades] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const semestersToLoad = yearMap[currentYear] || [];
    let allSubjects = [];

    semestersToLoad.forEach(sem => {
      if (syllabusMap[branch] && syllabusMap[branch][sem]) {
        allSubjects = [...allSubjects, ...syllabusMap[branch][sem]];
      }
    });
    setSubjects(allSubjects);

    const initialGrades = {};
    allSubjects.forEach(sub => {
      initialGrades[sub] = "";
    });
    setGrades(initialGrades);
  }, [branch, currentYear, yearMap, syllabusMap]);

  const handleChange = (subject, value) => {
    setGrades(prev => ({ ...prev, [subject]: value }));
  };

  const handleQuickFill = (value) => {
    const updated = {};
    subjects.forEach(sub => {
      updated[sub] = value;
    });
    setGrades(updated);
  };

  const unselectedCount = subjects.filter(sub => !grades[sub]).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#4facfe', letterSpacing: '1px' }}>TRANSCRIPT ENTRY</h3>
        <span style={{
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '4px 10px',
          borderRadius: '12px',
          background: unselectedCount > 0 ? 'rgba(255, 77, 77, 0.2)' : 'rgba(0, 255, 136, 0.2)',
          color: unselectedCount > 0 ? '#ff4d4d' : '#00ff88',
          border: `1px solid ${unselectedCount > 0 ? '#ff4d4d' : '#00ff88'}`
        }}>
          {unselectedCount > 0 ? `${unselectedCount} Pending` : 'All Set ✓'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', color: '#888', alignSelf: 'center' }}>Quick Actions:</span>
        <button
          type="button"
          onClick={() => handleQuickFill("10")}
          style={{ padding: '6px 12px', background: 'rgba(0, 255, 136, 0.15)', color: '#00ff88', border: '1px solid #00ff88', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          All O (10)
        </button>
        <button
          type="button"
          onClick={() => handleQuickFill("9")}
          style={{ padding: '6px 12px', background: 'rgba(79, 172, 254, 0.15)', color: '#4facfe', border: '1px solid #4facfe', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          All A+ (9)
        </button>
        <button
          type="button"
          onClick={() => handleQuickFill("")}
          style={{ padding: '6px 12px', background: 'rgba(255, 77, 77, 0.15)', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Clear All
        </button>
      </div>

      <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '10px' }}>
        {subjects.map((sub, i) => {
          const isSelected = Boolean(grades[sub]);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                background: '#0a0a0c',
                padding: '12px 16px',
                marginBottom: '8px',
                borderRadius: '8px',
                borderLeft: isSelected ? '4px solid #00ff88' : '4px solid #ff4d4d',
                transition: 'border 0.2s ease-in-out'
              }}
            >
              <span style={{ fontSize: '13px', maxWidth: '68%', color: isSelected ? '#fff' : '#ccc' }}>
                {sub}
              </span>
              <select
                value={grades[sub] || ""}
                onChange={(e) => handleChange(sub, e.target.value)}
                style={{
                  background: '#050505',
                  color: isSelected ? '#00ff88' : '#ff4d4d',
                  border: `1px solid ${isSelected ? '#00ff88' : '#ff4d4d'}`,
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                <option value="">Grade</option>
                <option value="10">O (10)</option>
                <option value="9">A+ (9)</option>
                <option value="8">A (8)</option>
                <option value="7">B+ (7)</option>
                <option value="6">B (6)</option>
                <option value="5">C (5)</option>
                <option value="4">P (4)</option>
                <option value="0">F (0)</option>
              </select>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onSubmit(grades)}
        style={{
          width: '100%',
          padding: '18px',
          background: '#00ff88',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '900',
          marginTop: '20px',
          cursor: 'pointer',
          letterSpacing: '1px',
          boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)'
        }}
      >
        GENERATE ROADMAP →
      </button>
    </div>
  );
};

export default GradeForm;
