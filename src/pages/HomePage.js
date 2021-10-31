import React from 'react';
import AddQuestionForm from '../components/AddQuestionForm';
import AddHomeworkToCourse from '../components/AddHomeworkToCourse';
import ExamPage from '../components/ExamPage';


const Home = () => {

    return (
        <div style={{ padding: 50 }}>
            {/* <AddHomeworkToCourse /> */}
            {/* <AddQuestionForm /> */}
            <ExamPage />
        </div>
    )
}

export default Home
