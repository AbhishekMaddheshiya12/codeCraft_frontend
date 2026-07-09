import React, { memo } from 'react';
import moment from 'moment';
import { Typography, Box, alpha } from '@mui/material';
import { useSelector } from 'react-redux';

const MessageComponent = ({ message, sender, sendername, date }) => {
  const user = useSelector(state => state.auth.user);
  const userId = user?._id;
  const apiUrl = import.meta.env.VITE_API_URL;
  const isOtherSender = sender !== userId;
  const timeAgo = moment(date).fromNow();

  return (
    <Box
      sx={{
        alignSelf: isOtherSender ? 'flex-start' : 'flex-end',
        // Updated colors to match your platform's slate backgrounds and emerald accents
        backgroundColor: isOtherSender 
          ? "rgba(30, 41, 59, 0.4)" 
          : "rgba(16, 185, 129, 0.15)",
        color: '#ffffff',
        padding: '10px 14px',
        margin: '4px 0',
        borderRadius: isOtherSender 
          ? '0px 16px 16px 16px' 
          : '16px 16px 0px 16px',
        maxWidth: '75%',
        width: 'fit-content',
        // Clean high-contrast borders
        border: `1px solid ${isOtherSender ? "rgba(30, 41, 59, 0.8)" : "rgba(16, 185, 129, 0.3)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: isOtherSender 
          ? "0 4px 15px rgba(0,0,0,0.2)" 
          : "0 4px 15px rgba(16, 185, 129, 0.1)",
      }}
    >
      {isOtherSender && (
        <Typography
          variant="caption"
          sx={{
            color: '#10b981', // Sender name changed to emerald green to pop out nicely
            fontWeight: 800,
            display: 'block',
            mb: 0.5,
            fontSize: '0.65rem',
            fontFamily: 'monospace',
            textTransform: 'uppercase'
          }}
        >
          {sendername}
        </Typography>
      )}

      <Typography 
        variant="body2" 
        sx={{ 
          lineHeight: 1.5,
          wordBreak: 'break-word',
          fontFamily: message.includes('`') ? 'monospace' : 'inherit'
        }}
      >
        {message}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          display: 'block',
          textAlign: 'right',
          mt: 0.5,
          fontSize: '0.6rem',
          color: alpha("#94a3b8", 0.6),
          fontFamily: 'monospace'
        }}
      >
        {timeAgo}
      </Typography>
    </Box>
  );
};

export default memo(MessageComponent);