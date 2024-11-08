import { useEffect, useState } from "react";
import YouTube from "react-youtube";

interface Song {
  title: string;
  artist: string;
  videoId: string;
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
        // const response = await fetch("http://localhost:3001/api/playlist");

        // if (!response.ok) {
        //   throw new Error("Failed to fetch playlist");
        // }

        // const data = await response.json();
        const data = [
          {
            title:
              "IS THIS THE HOTTEST NEW ROCKSTAR OF 2023?! #music #emo #punkrock #hardrock #rocksong #rock #rockstar",
            artist: "TX2 OFFICIAL",
            url: "https://www.youtube.com/watch?v=hAQcodpwsIA",
          },
          {
            title: "CUTE DEPRESSED",
            artist: "Dyan Dxddy - Topic",
            url: "https://www.youtube.com/watch?v=abwf-BdPFsQ",
          },
          {
            title: "Top 5 PHONK songs of 2024 (so far)",
            artist: "TheonlyMajed",
            url: "https://www.youtube.com/watch?v=kCBov1UIey8",
          },
          {
            title:
              "I CUT EMO MUSIC OUT #emo #goth #emomusic #emophase #poppunk #punk #emoboy #mychemicalromance",
            artist: "TX2 OFFICIAL",
            url: "https://www.youtube.com/watch?v=TUarBf60KxU",
          },
          {
            title: "Blitzkrieg Bop",
            artist: "Ramones - Topic",
            url: "https://www.youtube.com/watch?v=NQDPx_k66w4",
          },
          {
            title: "Joey Valence & Brae - PUNK TACTICS (Official Video)",
            artist: "Joey Valence & Brae",
            url: "https://www.youtube.com/watch?v=OklSZmIx9-o",
          },
          {
            title: "Top 5 phonk songs of the month",
            artist: "TheonlyMajed",
            url: "https://www.youtube.com/watch?v=rP4uTRihl0o",
          },
          {
            title: "What Is You Phonk / Funk Song?😈 #phonk",
            artist: "Tholo Music",
            url: "https://www.youtube.com/watch?v=mmi9CLb2OVM",
          },
        ];

        const transformedPlaylist = data.map((song: any) => ({
          title: song.title,
          artist: song.artist,
          videoId: song.url,
          // thumbnailUrl: song.thumbnailUrl || song.snippet?.thumbnails?.default?.url
        }));
        transformedPlaylist.forEach((element) => {
          console.log(element.videoId);
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
              <h3>{song.title}</h3>
              <p>Artist: {song.artist}</p>
              <iframe
                width="420"
                height="360"
                src={song.videoId}
              ></iframe>
              <button onClick={() => handlePlay(song.videoId)}>Play</button>
              <button onClick={handleStop}>Stop</button>
              {currentSong === song.videoId && (
                <YouTube videoId={song.videoId} opts={playerOptions} />
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
