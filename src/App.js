import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import { useDispatch } from 'react-redux';
import { setScreenSize } from './features/generalSlice';
import './App.css';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';

function App() {

    const dispatch = useDispatch();

    useEffect(() => { 
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize",updateDimensions);
    }, [])

    const updateDimensions = () => {
		dispatch(setScreenSize(window.innerWidth));
	};

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/teachers/:teacherId">
                    <TeacherPage/>
                </Route>
                <Route path="/students/:studentId">
                    <StudentPage />
                </Route>
                <Route path="/courses/:courseId">
                    <CoursePage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
