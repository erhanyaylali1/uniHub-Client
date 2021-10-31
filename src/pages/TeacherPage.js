import React, { useEffect, useState } from 'react'
import axios from '../utils/apiCall';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; 
import { useParams } from 'react-router-dom'; 

const TeacherPage = () => {

	const classes = useStyles();
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        axios.get(`/teachers/${teacherId}`)
        .then((res) => setTeacher(res.data))
    }, [teacherId]);
    
    console.log(teacher);

    return (
        <Grid className={classes.main} container justifyContent="center" >
            Teacher Page
            {teacher ? (
                <React.Fragment>
                    <Grid container item xs={6} md={12} justifyContent="center">
                        {teacher.id}
                    </Grid>
                    <Grid container item xs={6} md={12} justifyContent="center">
                        {teacher.fullName}
                    </Grid>
                </React.Fragment>
            ):(
                <Grid container justifyContent="center">
                    Teacher Not Found
                </Grid>
            )}
        </Grid>
    )
}

export default TeacherPage

const useStyles = makeStyles({
	main: {
        paddingTop: 40
    },
});
