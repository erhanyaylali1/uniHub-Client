import React, { useEffect, useState } from 'react'
import './styles/Profile.css';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import axios from '../utils/apiCall';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { getRefresh, getScreenSize } from '../features/generalSlice';
import { getUser } from '../../src/features/userSlice'
import Info from '../components/Profile/Info';
import UserCourses from '../components/Profile/UserCourses'
const { TabPane } = Tabs;

const ProfilePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [activeKey, setActiveKey] = useState("1");
    const user = useSelector(getUser);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const size = useSelector(getScreenSize);
    const refresh = useSelector(getRefresh);
    var type = 'Student';
    const userId = user.id;


    if(user.gpa != null){
        type = 'Student';
    }
    else{
        type = 'Teacher';
    }

    useEffect(() => {
        setLoading(true);
        if(type=== 'Student'){
                axios.get(`/students/${userId}`)
            .then((res) => {
                setUserInfo(res.data)
            })
            .finally(() => setLoading(false))
        }
        else{
            axios.get(`/teachers/${userId}`)
            .then((res) => {
                setUserInfo(res.data)
            })
            .finally(() => setLoading(false))
        }
        
    }, [userId, refresh]);

    console.log(userInfo);
    const RenderTabScreensStudent = () => {
        switch(activeKey) {
            case "1": 
                return <Info user={userInfo} type={type}/>
            case "2":
                return <UserCourses user={userInfo} type={type}/>
            case "3":
                return 
            case "4":
                return
            default:
                return  
        }
    }

    const RenderTabScreensTeacher = () => {
        switch(activeKey) {
            case "1": 
                return <Info user={userInfo} type={type}/>
            case "2":
                return <UserCourses user={userInfo} type={type}/>
            default:
                return  
        }
    }
    

    return (
        <Grid container justifyContent='center'>
            {loading ? "Loading...":(
                <Grid item container spacing={2}>
                    <Grid item container xs={0} sm={0} md={0} lg={2} /> 
                    <Grid item container xs={12} sm={12} md={3} lg={1.5}>
                        {type === 'Student' ? ( 
                        <Tabs activeKey={activeKey} onTabClick={setActiveKey} tabPosition={size > 850 ? 'left':'top'} style={{ width: '100%' }} centered>
                            <TabPane tab="Info" key="1" />
                            <TabPane tab="Courses" key="2" />
                            <TabPane tab="Grades" key="3" />
                            <TabPane tab="Weekly Schedule" key="4" />
                        </Tabs>
                        ):(
                        <Tabs activeKey={activeKey} onTabClick={setActiveKey} tabPosition={size > 850 ? 'left':'top'} style={{ width: '100%' }} centered>
                            <TabPane tab="Info" key="1" />
                            <TabPane tab="Courses" key="2" />
                        </Tabs>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={5}>
                        {type === 'Student' ? ( 
                            RenderTabScreensStudent()
                        ) : (
                            RenderTabScreensTeacher() 
                        )}
                    </Grid>
                    <Grid item container xs={0} sm={0} md={0} lg={2} />
                </Grid>
                
            )}
        </Grid>
    )
}


export default ProfilePage;