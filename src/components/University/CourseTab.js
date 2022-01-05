import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Modal, Button, message } from 'antd';
import { getScreenSize } from '../../features/generalSlice';
import BuyCourseModal from '../../components/University/BuyCourseModal';
import axios from '../../utils/apiCall';

const CourseTab = ({ courses }) => {

    const size = useSelector(getScreenSize);
    const [visible, setIsVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const isStudent = false;
    const studentId = 3;

    const [name, setName] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [date, setDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleOk = () => {
        axios.post(`/courses/${selectedCourse.id}/${studentId}`)
            .then((res) => message.success(res.data))
            .then(() => setIsVisible(false))
            .catch((err) => message.error(err.message))
    }

    const checkHasCourse = (course) => {
        let result = false;
        course.Students.forEach((student) => {
            if (studentId === student.id) {
                result = true;
            }
        })
        return result;
    }

    return (
        <Grid>
            <Grid item container spacing={2}>
                {courses?.map((course, index) => (
                    <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={size > 850 ? "flex-start" : "center"} style={{ marginTop: 5 }}>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    <Link to={`/courses/${course.id}`} className="course-tab-list-header">
                                        {course.courseName}
                                    </Link>
                                </Card.Header>
                                <Card.Meta>
                                    Lecturer: {course.teacher}
                                </Card.Meta>
                                <Card.Description>
                                    CRN: {course.crn}
                                </Card.Description>
                                <Card.Description>
                                    Price: {course.price}
                                </Card.Description>
                            </Card.Content>
                            {isStudent && (
                                (checkHasCourse(course)) === true ? null : (
                                    <Card.Content extra>
                                        <Button type="primary" onClick={() => {
                                            setIsVisible(true)
                                            setSelectedCourse(course)
                                        }}>
                                            Buy
                                        </Button>
                                    </Card.Content>
                                )
                            )}
                        </Card>
                    </Grid>
                ))}
                <Modal title="Buy Course" visible={visible} onOk={handleOk} onCancel={() => setIsVisible(false)}>
                    <BuyCourseModal
                        course={selectedCourse}
                        name={name}
                        setName={setName}
                        creditCard={creditCard}
                        setCreditCard={setCreditCard}
                        date={date}
                        setDate={setDate}
                        cvc={cvc}
                        setCvc={setCvc}
                    />
                </Modal>
            </Grid>
        </Grid>
    )
}

export default CourseTab;   