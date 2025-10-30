import React from 'react';
import GlobalEmptyPage from '../common/GlobalEmptyPage';
import ExamHeader from './ExamHeader';
import ExamList from './ExamList';


const Exams = () => {
    return (
         <div style={{width:'100%', height:'100%', backgroundColor:'#ffffff', borderRadius:'6px', padding:'20px', display:'flex', flexDirection:'column', gap:'32px'}}>
            <ExamHeader/>
            <ExamList/>
            {/* { (Array.isArray(rows) && rows.length > 0 ) ? (
                <TeachersTable rows={rows} />
                ) : (
                <GlobalEmptyPage message="No teacher found" showAddButton={true}/>
            )} */}
        </div>
    );
};

export default Exams;