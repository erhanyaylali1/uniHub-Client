import React, { useEffect, useState } from 'react'
import axios from '../utils/apiCall';
import { makeStyles } from '@material-ui/core/styles';  
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';

const StudentPage = () => {

    const classes = useStyles();
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get(`/students/${studentId}`)
        .then((res) => setStudent(res.data))
    }, [studentId]);

    console.log(student);

    return (
        <Grid container className={classes.main} justifyContent="center">
            Student Page
            {student ? (
                <Grid item container xs={12}>
                    <Grid item container xs={6} md={12} justifyContent="center">
                        {student.id}
                    </Grid>
                    <Grid item container xs={6} md={12} justifyContent="center">
                        {student.fullName}
                    </Grid>
                </Grid>
            ):(
                <Grid container justifyContent="center">
                    Student Not Found
                </Grid>
            )}
        </Grid>
    )
}

export default StudentPage


const useStyles = makeStyles({
	main: {
        paddingTop: 40
    },
});
