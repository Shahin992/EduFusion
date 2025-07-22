import React from 'react';
import GlobalEmptyPage from '../common/GlobalEmptyPage';
import TeachersHeader from './TeachersHeaders';
import TeachersTable from './TeachersTable';

const rows = [
  {
    id: 1,
    name: 'Arif Hossain',
    number: '01711000001',
    email: 'arif.hossain@example.com',
    fatherName: 'Mokbul Hossain',
    fatherNumber: '01710000001',
    motherName: 'Rokeya Begum',
    motherNumber: '01710000001',
    instituteName: 'Dhaka College',
    address: 'Dhanmondi, Dhaka',
    class: 1,
    group: '',
    monthlyFees: '3000',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    number: '01711000002',
    email: 'nusrat.jahan@example.com',
    fatherName: 'Jamal Uddin',
    fatherNumber: '01710000002',
    motherName: 'Nasima Akter',
    motherNumber: '01710000002',
    instituteName: 'Eden Mohila College',
    address: 'Azimpur, Dhaka',
    class: 2,
    group: '',
    monthlyFees: '3000',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Rahim Uddin',
    number: '01711000003',
    email: 'rahim.uddin@example.com',
    fatherName: 'Karim Uddin',
    fatherNumber: '01710000003',
    motherName: 'Shahana Khatun',
    motherNumber: '01710000003',
    instituteName: 'Notre Dame College',
    address: 'Motijheel, Dhaka',
    class: 3,
    group: '',
    monthlyFees: '3000',
    status: 'InActive',
  },
  {
    id: 4,
    name: 'Sumaiya Akter',
    number: '01711000004',
    email: 'sumaiya.akter@example.com',
    fatherName: 'Rafiqul Islam',
    fatherNumber: '01710000004',
    motherName: 'Salma Khatun',
    motherNumber: '01710000004',
    instituteName: 'Holy Cross College',
    address: 'Tejgaon, Dhaka',
    class: 4,
    group: '',
    monthlyFees: '3000',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Hasan Mahmud',
    number: '01711000005',
    email: 'hasan.mahmud@example.com',
    fatherName: 'Nazrul Islam',
    fatherNumber: '01710000005',
    motherName: 'Jahanara Begum',
    motherNumber: '01710000005',
    instituteName: 'Ideal College',
    address: 'Motijheel, Dhaka',
    class: 5,
    group: '',
    monthlyFees: '3000',
    status: 'InActive',
  },
];

const Teacher = () => {
    return (
         <div style={{width:'100%', height:'100%', backgroundColor:'#ffffff', borderRadius:'6px', padding:'20px', display:'flex', flexDirection:'column', gap:'32px'}}>
            <TeachersHeader/>
            { (Array.isArray(rows) && rows.length > 0 ) ? (
                <TeachersTable rows={rows} />
                ) : (
                <GlobalEmptyPage message="No teacher found" showAddButton={true}/>
            )}
        </div>
    );
};

export default Teacher;