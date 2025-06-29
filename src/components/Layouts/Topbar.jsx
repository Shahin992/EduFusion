import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicInput from '../common/BasicInput';

const Topbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: '#6f42c1' }}>ED</Avatar>
            <Typography variant="body1">Admin User</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
