import React from 'react'
import { Menu } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getIsUserLogged, logout } from '../../features/userSlice';
import { useLocation } from "react-router-dom";

const { SubMenu } = Menu;

const Navbar = () => {

    const isLogged = useSelector(getIsUserLogged);
    const dispatch = useDispatch();
    const url = useLocation();
    const History = useHistory()
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
    }

    return (
        <Menu mode="horizontal" className="nav-bar-for-shadow">
            <Menu.Item key="home" onClick={() => History.push('/home')}>
                Home
            </Menu.Item>
            <Menu.Item key="universities" onClick={() => History.push('/universities')}>
                Universities
            </Menu.Item>
            <Menu.Item key="Profile" onClick={() => History.push('/profile')}>
                Profile
            </Menu.Item>
            {isLogged ? (
                <Menu.Item key="Logout" onClick={() => History.push('/logout')} style={{ marginLeft: 'auto' }}>
                    Logout
                </Menu.Item>
            ) : (
                <>
                    <Menu.Item key="login" onClick={() => History.push('/login')} style={{ marginLeft: 'auto' }} >
                        Login
                    </Menu.Item>
                    <Menu.Item key="Register" onClick={() => History.push('/register')}>
                        Register
                    </Menu.Item>
                </>
            )}

        </Menu>
    )
}

export default Navbar