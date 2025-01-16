import { useState, useEffect, useRef, useMemo } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import VideoCard from '../../components/VideoCard';
import Banner from '../../components/Banner';
import VideoModal from '../../components/VideoModal';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({ isOpen: false, currentVideo: null });
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  const videoSectionRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/');
        setVideos(response.data);
      } catch (error) {
        console.error('Error al obtener los videos', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const groupedVideos = useMemo(() => {
    return videos
      .filter(({ title, category }) =>
        [title, category].some((text) =>
          text?.toLowerCase().includes(searchTerm)
        )
      )
      .reduce((acc, video) => {
        const category = video.category || 'Sin categoría';
        acc[category] = acc[category] || [];
        acc[category].push(video);
        return acc;
      }, {});
  }, [videos, searchTerm]);

  const handleSaveVideo = async (videoData) => {
    const isEditing = !!formState.currentVideo;
    try {
      const response = isEditing
        ? await api.put(`/${formState.currentVideo.id}`, videoData)
        : await api.post('/', videoData);

      setVideos((prev) =>
        isEditing
          ? prev.map((v) => (v.id === formState.currentVideo.id ? response.data : v))
          : [...prev, response.data]
      );

      setFormState({ isOpen: false, currentVideo: null });
      setSuccessMessage(isEditing ? 'Video actualizado' : 'Video agregado');
    } catch (error) {
      console.error('Error al guardar el video:', error);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este video?')) {
      try {
        await api.delete(`/${id}`);
        setVideos((prev) => prev.filter((v) => v.id !== id));
        setSuccessMessage('Video eliminado');
      } catch (error) {
        console.error('Error al eliminar el video:', error);
      }
    }
  };

  return (

    <Box>
      <Header onNewVideoClick={() => setFormState({ isOpen: true, currentVideo: null })} />
      <Banner ref={videoSectionRef} />

      {/* BARR  */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      {/* CONTENIDO */}
      <Box sx={{ padding: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          Object.entries(groupedVideos).map(([category, videos]) => (
            <Box key={category}>
              
              <Grid container spacing={2}>
                {videos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id}>
                    <VideoCard
                      video={video}
                      categoryTitle={category}  
                      onEdit={(video) =>
                        setFormState({ isOpen: true, currentVideo: video })
                      }
                      onDelete={() => handleDeleteVideo(video.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Box>
      {showScroll && (
        <Box onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <KeyboardArrowUpIcon />
        </Box>
      )}

      <Footer />
      <VideoModal
        isOpen={formState.isOpen}
        video={formState.currentVideo}
        onClose={() => setFormState({ isOpen: false, currentVideo: null })}
        onSave={handleSaveVideo}
      />
    </Box>
  );
};

export default Home;
