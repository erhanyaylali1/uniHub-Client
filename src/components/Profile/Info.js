import React, { useState } from 'react'
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';



const Info = ({user, type}) => {

    const size = useSelector(getScreenSize);
    console.log(user);
    return (
        <Grid>
            <Grid item container spacing={2}>
                <Grid item container xs={12} md={6} xl={4} justifyContent={ size > 850 ? "flex-start":"center" } style={{ marginTop: 20 }}>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                {user.fullName}
                            </Card.Header>
                            <Card.Meta>
                                Number: { type === 'Student' ? user.studentNumber: user.teacherNumber}
                            </Card.Meta>
                            <Card.Description>
                                Email: {user.email}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default Info;