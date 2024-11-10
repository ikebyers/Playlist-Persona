import React, { useState } from "react";
import { ApiMessage } from "../interfaces/ApiMessage";

interface Song {
    songTitle: string;
    artistName: string;
    url: string;
}

interface PlaylistCardProps {
    id: number | null;
    title: string | null;
    songList: Song[] | null;
    assignedUserId: number | null;
    deleteListById: (playlistId: number) => Promise<ApiMessage>;
}

const PlayListCard: React.FC<PlaylistCardProps> = ({
    id,
    title,
    songList,
    // assignedUserId,
    deleteListById,
}) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const handleDelete = async () => {
        if (id) {
            await deleteListById(id);
        }
    };

    const toggleCard = (index: number) => {
        setExpandedCard(expandedCard === index ? null : index);
    };
    return (
        <div className="u-card container-fluid card mx-auto card-color d-flex flex-column align-items-center justify-content-center">
            <div className="mt-4">
                <h5>
                    <span className="fst-italic">Playlist Title: </span>
                    <span className="body-text-alt">{title}</span>
                </h5>
                <div>
                    {songList && songList.length > 0 ? (
                        songList.map((song, index) => (
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
                        ))
                    ) : (
                        <h1>No Songs Found!!</h1>
                    )}
                </div>
                <button
                    className="btn-medium w-50 mx-auto center"
                    onClick={handleDelete}
                >
                    Delete Playlist
                </button>
            </div>
        </div>
    );
};

export default PlayListCard;