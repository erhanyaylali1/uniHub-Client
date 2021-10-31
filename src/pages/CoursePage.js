import React, { useEffect, useState } from 'react'
import axios from '../utils/apiCall';
import { makeStyles } from '@material-ui/core/styles';  
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';


const CoursePage = (props) => {

    const classes = useStyles();
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        axios.get(`/courses/${courseId}`)
        .then((res) => setCourse(res.data))
    }, [courseId]);


    console.log(course);

    return (
        <Grid container className={classes.main} justifyContent="center">
            Course Page
            {course ? (
                <Grid item container xs={12}>
                    <Grid container item xs={6} md={12} justifyContent="center">
                        {course.id}
                    </Grid>
                    <Grid container item xs={6} md={12} justifyContent="center">
                        {course.courseName}
                    </Grid>
                </Grid>
            ):(
                <Grid container justifyContent="center">
                    Course Not Found
                </Grid>
            )}
        </Grid>
    )
}

export default CoursePage


const useStyles = makeStyles({
	main: {
        paddingTop: 40
    },
});
