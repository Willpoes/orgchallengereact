import { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import PropTypes from 'prop-types';

const VideoModal = ({ isOpen, onClose, onSave, video }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    video: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (video) {
      setFormData(video);
      setErrors({});
    } else {
      setFormData({
        title: '',
        category: '',
        image: '',
        video: '',
        description: '',
      });
      setErrors({});
    }
  }, [video]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Se encesita titulo';
    if (!formData.category) newErrors.category = 'Se necesita categoria';
    if (!/^https?:\/\/.+$/.test(formData.image))
      newErrors.image = 'ERROR IMAGEN';
    if (!/^https?:\/\/.+$/.test(formData.video))
      newErrors.video = 'IERROR LINK VIDEO';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '80%', sm: '400px' },
            maxHeight: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: '#03122f',
            padding: '25px 60px',
            border: '3px solid #6BD1FF',
            borderRadius: '15px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Roboto, sans-serif',
            color: '#FFF',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              color: '#6BD1FF',
              fontSize: '24px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '13px',
            }}
          >
            {video ? 'Editar Video' : 'Nuevo Video'}
          </Typography>
          <Button
            sx={{
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              fontSize: '2.2rem',
              cursor: 'pointer',
              color: '#6BD1FF',
              background: 'none',
              border: 'none',
              transition: 'transform 0.3s ease, color 0.3s ease',
              '&:hover': {
                transform: 'rotate(180deg) scale(1.3)',
                color: '#FFBA05',
              },
            }}
            onClick={onClose}
          >
            ×
          </Button>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              margin="dense"
              sx={{
                marginBottom: 3,
              }}
              InputLabelProps={{
                sx: {
                  color: '#FFFFFF',
                  fontWeight: 'normal',
                  fontSize: '0.7rem',
                  transform: 'translateY(-20px)',
                  transition: 'color 0.3s ease',
                  '&.Mui-focused': {
                    color: '#FFBA05',
                  },
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '1px solid #6BD1FF',
                  borderRadius: '10px',
                  color: '#FFF',
                  fontWeight: 'normal',
                  fontSize: '0.8rem',
                  padding: '0.1px',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                  '&.Mui-focused': {
                    borderColor: '#FFBA05',
                    boxShadow: '0 0 5px #FFBA05',
                  },
                },
              }}
            />
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'normal',
                  fontSize: '0.7rem',
                  transition: 'color 0.3s ease',
                  transform: 'translateY(-20px)',
                  '&.Mui-focused': { color: '#6BD1FF' },
                }}
              >
                Categoría
              </InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                sx={{
                  backgroundColor: '#000',
                  border: '1px solid #6BD1FF',
                  borderRadius: '10px',
                  color: '#FFF',
                  fontWeight: 'normal',
                  fontSize: '0.8rem',
                  padding: '0.1px',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                }}
              >
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Gestión">Innovación y Gestión</MenuItem>

              </Select>
              <Typography variant="caption" color="error">
                {errors.category}
              </Typography>
            </FormControl>
            <TextField
              fullWidth
              label="Imagen (URL)"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={!!errors.image}
              helperText={errors.image}
              margin="dense"

              sx={{
                marginBottom: 3,
              }}
              InputLabelProps={{
                sx: {
                  color: '#FFFFFF',
                  fontWeight: 'normal',
                  fontSize: '0.7rem',
                  transform: 'translateY(-20px)',
                  transition: 'color 0.3s ease',
                  '&.Mui-focused': {
                    color: '#FFBA05',
                  },
                },
              }}

              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '1px solid #6BD1FF',
                  borderRadius: '10px',
                  color: '#FFF',
                  fontWeight: 'normal',
                  fontSize: '0.8rem',
                  padding: '0.1px',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                  '&.Mui-focused': {
                    borderColor: '#FFBA05',
                    boxShadow: '0 0 5px #FFBA05',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Video (URL)"
              name="video"
              value={formData.video}
              onChange={handleChange}
              error={!!errors.video}
              helperText={errors.video}
              margin="dense"
              sx={{
                marginBottom: 3,
              }}
              InputLabelProps={{
                sx: {
                  color: '#FFFFFF',
                  fontWeight: 'normal',
                  fontSize: '0.7rem',
                  transform: 'translateY(-20px)',
                  transition: 'color 0.3s ease',
                  '&.Mui-focused': {
                    color: '#FFBA05',
                  },
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '1px solid #6BD1FF',
                  borderRadius: '10px',
                  color: '#FFF',
                  fontWeight: 'normal',
                  fontSize: '0.8rem',
                  padding: '0.1px',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                  '&.Mui-focused': {
                    borderColor: '#FFBA05',
                    boxShadow: '0 0 5px #FFBA05',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              margin="dense"
              InputLabelProps={{
                sx: {
                  color: '#FFFFFF',
                  fontWeight: 'normal',
                  fontSize: '0.6rem',
                  transition: 'color 0.3s ease',
                  transform: 'translateY(-20px)',
                  '&.Mui-focused': {
                    color: '#FFBA05',
                  },
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '1px solid #6BD1FF',
                  borderRadius: '10px',
                  color: '#FFF',
                  fontWeight: 'normal',
                  fontSize: '0.6rem',
                  padding: '0.1px',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                  '&.Mui-focused': {
                    borderColor: '#FFBA05',
                    boxShadow: '0 0 5px #FFBA05',
                  },
                },
              }}

            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'transparent',
                  color: '#FFF',
                  border: '2px solid #FFF',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '0.6rem',
                  width: '80px',
                  height: '45px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#2271D1',
                    color: '#2271D1',
                    boxShadow: '0px 4px 15px rgba(34, 113, 209, 0.7)',
                  },
                }}
              >
                Guardar
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  setFormData({
                    title: '',
                    category: '',
                    image: '',
                    video: '',
                    description: '',
                  })
                }
                sx={{
                  backgroundColor: 'transparent',
                  color: '#FFF',
                  border: '2px solid #FFF',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '0.6rem',
                  width: '80px',
                  height: '45px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#2271D1',
                    color: '#2271D1',
                    boxShadow: '0px 4px 15px rgba(34, 113, 209, 0.7)',
                  },
                }}
              >
                Limpiar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          ¡Video guardado exitosamente!
        </Alert>
      </Snackbar>
    </>
  );
};

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  video: PropTypes.object,
};

VideoModal.defaultProps = {
  video: null,
};

export default VideoModal;
