import * as React from "react";
import {
  Box,
  CardContent,
  Typography,
} from "@material-ui/core";

const VideoIframe = () => (
  <>
    <div padding="56.25% 0 0 0" position="relative">
      <iframe
        src="https://player.vimeo.com/video/925038827?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        title="BuddieDemo2024"
        position="absolute"
        top="0"
        left="0"
        width="600px"
        height="600px"
      ></iframe>
    </div>
    <script src="https://player.vimeo.com/api/player.js"></script>
  </>
);

const DemoVideo = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
        <br/>
      <CardContent >
        <Typography component="div" variant="h5" align="center">
          Buddie Demo
        </Typography>
        <br/>
        <Typography variant="body1" color="text.secondary" component="div" align="center">
          Buddie is down at the moment. But check out the demo!
        </Typography>
      </CardContent>
      <VideoIframe />
    </Box>
  );
};

export default DemoVideo;
