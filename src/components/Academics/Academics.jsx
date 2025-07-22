import React, { useState } from 'react';
import AcademisHeaders from './AcademisHeaders';
import AcademicsTable from './AcademicsTable';
import GlobalEmptyPage from '../common/GlobalEmptyPage';

const initialClasses = [
  { id: 1, name: 'Class 1', version: 'English Medium', sections: ['A', 'B'] },
  { id: 2, name: 'Class 2', version: '', sections: [] },
];


const Academics = () => {
     const [classList, setClassList] = useState(initialClasses);

  const handleAddClass = () => {
    // Open modal logic here
    console.log('Add Class Modal');
  };

  const handleEdit = (row) => {
    // Open modal with row data
    console.log('Edit', row);
  };

  const handleDelete = (id) => {
    setClassList((prev) => prev.filter((cls) => cls.id !== id));
  };
    return (
        <div style={{width:'100%', height:'100%', backgroundColor:'#ffffff', borderRadius:'6px', padding:'20px'}}>
            <AcademisHeaders onAddClick={handleAddClass}/>
            {
                classList.length > 0 ? (
                <AcademicsTable data={classList} onEdit={handleEdit} onDelete={handleDelete}/>
                ) : (
                <GlobalEmptyPage message="No classes found" showAddButton={true}/>
            )}
        </div>
    );
};

export default Academics;