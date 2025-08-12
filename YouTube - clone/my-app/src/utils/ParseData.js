// utils/ParseData.js

export const ParseData = async (items) => {
    // Process and transform the items as needed
    const processedItems = items.map(item => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const description = item.snippet.description;
      const publi_time = item.snippet.publi_time;
      const thumbnail = item.snippet.thumbnails.high.url;
  
      // Convert duration from ISO 8601 format to a human-readable format
      const duration = item.contentDetails ? formatDuration(item.contentDetails.duration) : 'Unknown';
  
      return {
        id: videoId,
        title,
        description,
        thumbnail,
        duration,
        publi_time
      };
    });
  
    // Log or debug processed items
    console.log(processedItems);
    
    return processedItems;
  };
  
  // Helper function to convert ISO 8601 duration to a human-readable format
  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 'Unknown';
  
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;
  
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  