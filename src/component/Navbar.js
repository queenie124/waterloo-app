import * as React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Divider } from '@mui/material';

const pages = ['/Home', '/Profile'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const Navbar= () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();
    const redirectToHome = () => {
        navigate('/Home');
    }
    const redirectToProfile = () => {
        navigate('/Profile');
    }
    const redirectToWheel = () => {
        navigate('/');
    }
    const redirectToSignup = () => {
        navigate('/Signup')
      }
    
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          alert("Sign out failed: ", error.message);
          return;
        } else {
          console.log("Sign out successful");
          redirectToSignup();
        }
    }
    
    // Get user information
    
    const [userInfo, setUserInfo] = useState({});
    const fetchUser = async () => {
        const {data: { user }} = await supabase.auth.getUser();
        // if (user) {
        //   console.log("user", user);
        // } else {
        //   console.log("user not found");
        // }
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();
            if (error) {
                console.log("error", error);
            } else {
                //console.log("data", data);
                setUserInfo(data); // Store the fetched user data in the userInfo state
            }
        } catch (error) {
          console.error('Error fetching user:', error.message);
        }
      }
      useEffect(() => {
        fetchUser();
      }, []);
    
    console.log("userInfo", userInfo);
    console.log("userInfo.username", userInfo.username);
    
    // This function is not tested
    const handleDelete = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          console.log("user", user);
        } else {
          console.log("user not found");
        }
        try {
          const { data, error } = await supabase.auth.admin.deleteUser(user.id);
        } catch (error) {
          console.error('Error deleting user:', error.message);
        }
    };

    const handleEdit = () => {
        console.log("Edit account");
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



  return (
    // Default styling for now
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                key='Home'
                onClick={redirectToHome}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
            <Button
                key='Spin Wheel'
                onClick={redirectToWheel}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Spin Wheel
                </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem key={'profile'} onClick={redirectToProfile}>
                <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem key={'edit-account'} onClick={handleEdit}>
                <Typography textAlign="center">Edit-account</Typography>
            </MenuItem>
            <Divider />
            <MenuItem key={'sign-out'} onClick={handleSignOut}>
                <Typography textAlign="center">Sign-out</Typography>
            </MenuItem>
            <MenuItem key={'delete-account'} onClick={handleDelete}>
                <Typography textAlign="center">Delete Account</Typography>
            </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;