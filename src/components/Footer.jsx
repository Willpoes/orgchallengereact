import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <>
      {/* ===AZUL==== */}
      <Box
        sx={{
          width: '100%',
          height: '5px',
          borderBottom: '4px solid var(--Blue, #2271D1)',
          background: '#202020',
          boxShadow: '20px 10px 30px 5px rgba(34, 113, 209, 0.70)',
        }}
      />
      <Box
        component="footer"
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
          padding: 2,
          marginTop: 'auto',
        }}
      >
        <img
          src="logo.png"
          alt="AluraFlix"
          style={{ height: '50px', marginBottom: '20px' }}
        />

      </Box>
    </>
  );
};

export default Footer;
