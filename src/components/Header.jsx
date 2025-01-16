import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

const Header = ({ onNewVideoClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      sx={{
        background: '#202020',
        boxShadow: '0px 10px 30px rgba(34, 113, 209, 0.7)',
        height: isSmallScreen ? '60px' : '80px',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          paddingX: 2,
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="logo.png"
            alt="AluraFlix"
            style={{
              height: isSmallScreen ? '40px' : '60px',
              marginRight: '10px',
              transition: 'filter 0.5s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.filter = 'drop-shadow(2px 8px 10px rgba(81, 164, 202, 0.7))';
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = 'none';
            }}
          />
          {!isSmallScreen && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: '1.1rem',
                fontWeight: theme.typography.h1.fontWeight,
                color: theme.palette.text.primary,
              }}
            >
              { }
            </Typography>
          )}
        </Box>

        {/* Menú */}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 3,
          }}
        >
          <Button
            href="/"
            sx={{
              fontFamily: theme.typography.fontFamily,
              color: '#6BD1FF', // Texto azul
              textTransform: theme.typography.button.textTransform,
              fontWeight: theme.typography.button.fontWeight,
              fontSize: isSmallScreen ? '0' : '1rem',
              border: '2px solid rgb(0, 102, 255)',
              borderRadius: '8px',
              padding: '6px 12px',
              transition: 'transform 0.5s ease, box-shadow 0.5s ease',
              '&:hover': {
                color: '#FFFFFF',
                transform: 'scale(1.1)',
                boxShadow: '0px 10px 20px rgb(255, 255, 255)',
              },
            }}
          >
            {!isSmallScreen && 'Home'}
          </Button>

          <Button
            onClick={onNewVideoClick}
            sx={{
              fontFamily: theme.typography.fontFamily,
              color: '#6BD1FF',
              textTransform: theme.typography.button.textTransform,
              fontWeight: theme.typography.button.fontWeight,
              fontSize: isSmallScreen ? '0' : '1rem',
              border: '2px solid rgb(0, 102, 255)',
              borderRadius: '8px',
              padding: '6px 12px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                color: '#FFFFFF',
                transform: 'scale(1.1)',
                boxShadow: '0px 10px 20px rgb(255, 255, 255)',
              },
            }}
          >
            {!isSmallScreen && 'Nuevo Video'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onNewVideoClick: PropTypes.func.isRequired,
};

export default Header;
