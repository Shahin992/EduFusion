import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from "@mui/icons-material/Person"
import GroupIcon from "@mui/icons-material/Group"
import PackageIcon from "@mui/icons-material/Inventory"
import BillingIcon from "@mui/icons-material/Receipt"
import LogoutIcon from "@mui/icons-material/Logout"
import LockResetIcon from "@mui/icons-material/LockReset";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BasicInput from '../common/BasicInput';
import { useState } from 'react';

const Topbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (action) => {
    console.log(`${action} clicked`)
    handleClose()
  }
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: '#ebe8ed', color: 'black', height: '80px' }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: '100%',
          px: 2,
        }}
      >
        {/* Left logo/title */}
        {!isMobile &&(
          <Typography
          variant="h4"
          sx={{ width: 230, fontWeight: 'bold', userSelect: 'none' }}
        >
          Edufusion
        </Typography>)}

        {/* Center search + right user */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            gap: 3,
          }}
        >
          {/* Search input box */}
          {!isMobile && (
            <Box sx={{ flex: 1, maxWidth: 400 }}>
            <BasicInput
              placeholder="Search system wise"
              name="appName"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: '#ced4da' }} />
                </InputAdornment>
              }
            />
          </Box>)}

          {/* User Info */}
          {/* <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: '#6f42c1' }}>ED</Avatar>
            <Typography variant="body1">Admin User</Typography>
          </Box> */}
            <Box
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            gap={2}
            sx={{
              height: '48px',
              padding: '24px',
              cursor: "pointer",
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f0f0f0",
              "&:hover": {
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
             onClick={handleClick}
          >
            <Avatar sx={{ bgcolor: "#6f42c1", width: 36, height: 36 }}>EE</Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.2, color: "#333" }}>
                EngLish And ICT Educare
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", fontSize: "0.875rem" }}>
                englishandicteducare@gmail.com
              </Typography>
            </Box>
          </Box>
           <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  PaperProps={{
    sx: {
      width: 300,
      mt: 2.5,
      overflow: "visible",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      bgcolor: "white",
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 26,
        width: 40,
        height: 40,
        bgcolor: "white", // same as menu bg
        borderLeft: "1px solid #f0f0f0", // match menu border
        borderTop: "1px solid #f0f0f0",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0, // behind menu items
      },
      "& .MuiMenuItem-root": {
        "&:focus, &.Mui-focusVisible": {
          backgroundColor: "transparent",
        },
        "&:hover": {
          backgroundColor: "#f6f6f6",
        },
      },
    },
  }}
  transformOrigin={{ horizontal: "right", vertical: "top" }}
  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
>
  <MenuItem onClick={() => handleMenuItemClick("My Profile")} sx={{ px: 3, py: 2 }}>
    <PersonIcon sx={{ mr: 2, color: "#666" }} />
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      My Profile
    </Typography>
  </MenuItem>

  <MenuItem onClick={() => handleMenuItemClick("Change Password")} sx={{ px: 3, py: 2 }}>
    <VpnKeyIcon sx={{ mr: 2, color: "#666" }} />
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      Change Password
    </Typography>
  </MenuItem>

  <Divider sx={{ my: 1 }} />

  <MenuItem onClick={() => handleMenuItemClick("Logout")} sx={{ px: 3, py: 2, color: "#d32f2f" }}>
    <LogoutIcon sx={{ mr: 2 }} />
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      Logout
    </Typography>
  </MenuItem>
</Menu>


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
