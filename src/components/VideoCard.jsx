import { Card, CardMedia, CardContent, Typography, Button, Box, Modal, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const VideoCard = ({ video, categoryTitle, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  if (!video || !video.video) return null;

  const videoId = video.video.includes('v=')
    ? video.video.split('v=')[1]?.split('&')[0]
    : video.video.split('/').pop();

  const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  const categoryColors = {
    Frontend: '#6BD1FF',
    Backend: '#00C86F',
    "Innovacion y Gestion": '#FFBA05',
  };

  //
  const getColorByCategory = (category) => {
    if (!category) return '#FFFFFF';
    return categoryColors[category] || '#FFFFFF';
  };

  const cardColor = getColorByCategory(video.category);
  const titleColor = getColorByCategory(categoryTitle);

  return (
    

    <Box sx={{ marginBottom: '20px', fontFamily: 'Roboto, sans-serif' }}>
      {/* CAT */}
      <Card>
        <Box
          sx={{
            backgroundColor: titleColor,
            borderRadius: '8px',
            padding: '10px 15px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '1.2rem',
            }}
          >
            {categoryTitle}
          </Typography>
        </Box>
      </Card>

      <Card
        sx={{
          maxWidth: 360,
          margin: '10px auto',
          border: `2px solid ${cardColor}`,
          borderRadius: '10px',
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#03122f',
          fontFamily: 'Roboto, sans-serif',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)',
          },
        }}
        onClick={() => setOpenModal(true)}
      >

        {/* VID */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '15em',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={video.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <PlayCircleOutlineIcon
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '64px',
              color: 'white',
              opacity: 0.9,
              transition: 'opacity 0.3s ease',
              '&:hover': { opacity: 1 },
            }}
          />
        </Box>

        {/* BOITONBS */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.90)',
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(video);
            }}
            sx={{
              image: 'editar.png',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            <img
              src="eliminar.png"
              alt="Editar"
              style={{ width: '20px', height: '20px' }}
            />
            Eliminar
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(video);
            }}
            sx={{
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            <img
              src="editar.png"
              alt="Editar"
              style={{ width: '20px', height: '20px' }}
            />

            Editar
          </Button>

        </Box>
      </Card>

      {/* MODALS */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            aspectRatio: '16/9',
            backgroundColor: 'black',
            borderRadius: '14px',
            width: '95%',
            maxWidth: '960px',
            overflow: 'hidden',
            border: `5px solid ${cardColor}`,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: cardColor,
            }}
            onClick={() => setOpenModal(false)}
          >
            <CloseIcon sx={{ fontSize: '32px' }} />
          </IconButton>
          <iframe
            width="100%"
            height="100%"
            src={videoEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </Box>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    video: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
  }).isRequired,
  categoryTitle: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

VideoCard.defaultProps = {
  categoryTitle: null,
};

export default VideoCard;
