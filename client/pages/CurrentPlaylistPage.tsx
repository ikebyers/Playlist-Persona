import { useEffect, useState } from "react";
import YouTube from "react-youtube";

interface Song {
  songTitle: string;
  artistName: string;
  url: string;
  // thumbnailUrl: string;
}

const CurrentPlaylist: React.FC = () => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);

      try {
        const questions = JSON.parse(localStorage.getItem("questions") || "[]");
        const answers = JSON.parse(localStorage.getItem("answers") || "[]");

        const response = await fetch("http://localhost:3001/playlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questions,
            answers,
          })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch playlist");
        }

        const data = await response.json();
        console.log("data before transforming", data);
        // setPlaylist(data);

        const transformedPlaylist = data.map((song: any) => ({
          songTitle: song.songTitle,
          artistName: song.artistName,
          url: song.url,
          // thumbnailUrl: song.thumbnailUrl || song.snippet?.thumbnails?.default?.url
        }));
        transformedPlaylist.forEach((element: Song) => {
          console.log("transformed playlist:", element.songTitle, element.artistName, element.url);
        });
        setPlaylist(transformedPlaylist);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  // const fetchYoutubeUrl = async (title, artist) => {

  // }

  const handlePlay = (videoId: string) => {
    setCurrentSong(videoId);
  };

  const handleStop = () => {
    setCurrentSong(null);
  };

  const playerOptions = {
    height: "0", // Minimize height to simulate audio-only
    width: "0", // Minimize width to simulate audio-only
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <h1>Your Generated Playlist</h1>
      {loading ? (
        <p>Loading your playlist...</p>
      ) : playlist.length > 0 ? (
        <ul>
          {playlist.map((song, index) => (
            <li key={index}>
              {/* <img src={song.thumbnailUrl} alt={`${song.title} thumbnail`} width="120" height="90" /> */}
              <h3>{song.songTitle}</h3>
              <p>Artist: {song.artistName}</p>
              <iframe
                width="420"
                height="360"
                src={song.url}
              ></iframe>
              <button onClick={() => handlePlay(song.url)}>Play</button>
              <button onClick={handleStop}>Stop</button>
              {currentSong === song.url && (
                <YouTube videoId={song.url} opts={playerOptions} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs found for your preferences. Please try again.</p>
      )}
    </div>
  );
};

export default CurrentPlaylist;
