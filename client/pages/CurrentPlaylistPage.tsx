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
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
          }),
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
        }));
        console.log(typeof transformedPlaylist);
        localStorage.setItem(
          "currentPlaylist",
          JSON.stringify(transformedPlaylist)
        );
        setPlaylist(transformedPlaylist);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="w-100 mx-auto p-3 container-fluid center body-text">
      <div className="card card-margin card-color-alt">
        <h1 className="body-text-primary fw-bold">Your Playlist</h1>
          <p className="body-text-primary">
            Based on your responses, we curated this playlist <span className="fst-italic fw-bold">just for you!</span>
          </p>
          <p className="body-text-primary">
            Feel free to check out the music and save the playlist to your profile to listen later.
          </p>
      </div>
      {loading ? (
        <h4 className="fst-italic">Loading your playlist...</h4>
      ) : playlist.length > 0 ? (
        <div className="p-3 center">
          {playlist.map((song, index) => (
            <div className="card card-margin card-color mx-auto w-75" key={index}>
              <div className="card-header d-flex justify-content-between">
                <div className="text-start">
                  <h3 className="fw-bold">{song.songTitle}</h3>
                  <h5 className="fst-italic">{song.artistName}</h5>
                </div>
                <div className="d-flex">
                  <button
                    className="btn btn-medium-alt fw-bold ms-auto"
                    onClick={() => toggleCard(index)}
                    >
                    {expandedCard === index ? "⬆" : "⬇"}
                  </button>
                </div>
              </div>
              {expandedCard === index && (
                <div className="card-body">
                  <iframe
                    id={`iframe-${index}`}
                    className="mx-auto p-3 d-flex container-fluid center"
                    width="420"
                    height="350"
                    src={`https://www.youtube.com/embed/${song.url}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="fst-italic">No songs found for your preferences.</p>
          <p className="fst-italic">Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default CurrentPlaylist;
