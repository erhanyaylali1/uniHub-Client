import React, { useState } from 'react'
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';



const UserCourses = ({user, type}) => {

    const size = useSelector(getScreenSize);
    console.log(user);
    const courses = user.Courses;
    return (
        <Grid>
            <Grid item container spacing={2}>
            {courses?.map((course, index) => (
                <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={ size > 850 ? "flex-start":"center" } style={{ marginTop: 20 }}>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                {course.courseName}
                            </Card.Header>
                            <Card.Meta>
                                Crn: { course.crn}
                            </Card.Meta>
                            
                            
                        </Card.Content>
                        <Card.Content extra>
                            <Link to={`/courses/${course.id}`} className="course-tab-list-header">
                                See more
                            </Link>
                        </Card.Content>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Grid>
    )
}


export default UserCourses;