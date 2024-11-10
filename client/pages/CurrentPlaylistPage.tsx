import { useEffect, useState } from "react";
import YouTube from "react-youtube";


interface Song {
  songTitle: string;
  artistName: string;
  url: string;
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
        // console.log("data before transforming", data);
        // setPlaylist(data);

        const transformedPlaylist = data.map((song: any) => ({
          songTitle: song.songTitle,
          artistName: song.artistName,
          url: song.url,
          // thumbnailUrl: song.thumbnailUrl || song.snippet?.thumbnails?.default?.url
        }));
        // console.log(typeof(transformedPlaylist));
        localStorage.setItem("currentPlaylist", JSON.stringify(transformedPlaylist));
        // transformedPlaylist.forEach((element: Song) => {
        //   console.log("transformed playlist:", element.songTitle, element.artistName, element.url);
        // });
        setPlaylist(transformedPlaylist);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  // const handlePlay = async (index: number, event: Event) => {
  //   const iframe = document.getElementById(`iframe-${index}`);
  //   const button = document.getElementById(`button-${index}`);
  // //   button?.addEventListener();
  // //   setCurrentSong(videoId);
  //     iframe.contentWindow.document.getElementById("toggleDivButton").click();
  // };

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
    <div className="w-100 mx-auto p-3 container-fluid center body-text">
      <div className="card card-margin card-color-alt">
        <h1 className="body-text-primary">Your Playlist</h1>
          <p className="body-text-primary">Based on your responses we currated this playlist just for you! Feel free to check out the music and save the playlist to your profile to listen later.</p>
      </div>
      {loading ? (
        <h4>Loading your playlist...</h4>
      ) : playlist.length > 0 ? (
        <div className="p-3 center">
          {playlist.map((song, index) => (
            <div className="card card-margin card-color" key={index}>
              {/* <img src={song.thumbnailUrl} alt={`${song.title} thumbnail`} width="120" height="90" /> */}
              {/* <iframe
              className="w-100 p-3 container-fluid center"
                width="380"
                height="360"
                src={song.url}
              ></iframe> */}
              <iframe id={`iframe-${index}`} className="w-100 p-3 container-fluid center" width="420" height="350" src={`https://www.youtube.com/embed/${song.url}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <h3>{song.songTitle}</h3>
              <h5>Artist: {song.artistName}</h5>
              <div className="btn-group">
              <button id={`button-${index}`} className="btn-medium" onClick={function(){}}>Play</button>
              <button id="pause-video" className="btn-medium" onClick={handleStop}>Pause</button>
              </div>
              {currentSong === song.url && (
                <YouTube videoId={song.url} opts={playerOptions} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No songs found for your preferences. Please try again.</p>
      )}
    </div>
  );
};

export default CurrentPlaylist;
