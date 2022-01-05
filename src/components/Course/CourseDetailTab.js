import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Statistic, Form, Input, Select, TimePicker, message } from 'antd';
import days from '../../utils/days';
import { Button, IconButton } from '@mui/material';
import moment from 'moment';
import axios from '../../utils/apiCall';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../../features/generalSlice';
import EditIcon from '@mui/icons-material/Edit';

const Option = Select.Option;

const CourseDetailTab = ({ info, teacherInfo, isOwner }) => {

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = (values) => {

        if (values.startTime) {
            values.startTime = values.startTime.format("HH:mm").toString();
        }

        axios.put(`courses/${info.id}`, values)
            .then(async (res) => {
                await setTimeout(() => { dispatch(setRefresh()); }, 1000);
                dispatch(setRefresh());
                message.success(res.data);
                setIsEdit(false);
            }).catch((err) => message.error(err.message))
    }

    return (
        isEdit ? (
            <Grid item container>
                <Grid item container xs={0.5} lg={0} />
                <Grid item container xs={11} lg={12} >
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                        autoComplete="off"
                        style={{ width: '100%' }}
                    >
                        <Form.Item
                            label="Course Name"
                            name="courseName"
                        >
                            <Input defaultValue={info?.courseName} />
                        </Form.Item>

                        <Form.Item
                            label="CRN"
                            name="crn"
                        >
                            <Input defaultValue={info?.crn} />
                        </Form.Item>
                        <Form.Item
                            label="Zoom Link"
                            name="zoomLink"
                        >
                            <Input defaultValue={info?.zoomLink} />
                        </Form.Item>
                        <Form.Item
                            label="Course Day"
                            name="day"
                        >
                            <Select defaultValue={days[info?.day - 1]}>
                                {days.map((el, index) => (
                                    <Option value={index + 1} key={index}>{el}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Start Time"
                            name="startTime"
                        >
                            <TimePicker defaultValue={moment(info?.startTime, "HH:mm")} format="HH:mm" />
                        </Form.Item>
                        <Form.Item
                            label="Duration"
                            name="duration"
                        >
                            <Input defaultValue={info?.duration} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button color="error" onClick={() => setIsEdit(false)} style={{ marginRight: 20 }}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Grid>
                <Grid item container xs={0.5} lg={0} />
            </Grid>
        ) : (
            <Grid item container>
                <Grid container item xs={1.5} md={0} />
                <Grid container item xs={9} md={12} style={{ paddingBottom: 0 }}>
                    {isOwner && (
                        <Grid item container xs={12} justifyContent="flex-end" style={{ marginTop: 10, marginBottom: 10 }} >
                            <IconButton onClick={() => setIsEdit(true)} color="primary">
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    )}
                    <Grid item container xs={12} md={6}>
                        <Statistic title="Course Name" value={info?.courseName} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="CRN" formatter={() => <span>{info?.crn}</span>} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Teacher Name" value={teacherInfo?.fullName} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Teacher Mail" value={teacherInfo?.email} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Zoom Link" formatter={() => <a href={info?.zoomLink}>Click Here</a>} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Course Day" value={days[info?.day - 1]} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Start Time" value={info?.startTime} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Duration" value={`${info?.duration} minute`} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Number of Students" value={info?.studentCount} />
                    </Grid>
                </Grid>
                <Grid container item xs={1.5} md={0} />
            </Grid>
        )
    )
}

export default CourseDetailTab
