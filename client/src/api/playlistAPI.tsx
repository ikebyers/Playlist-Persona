import { PlaylistData } from "../interfaces/PlaylistData";
import { ApiMessage } from "../interfaces/ApiMessage";

//Retrieve all the playlists in the database...
const retrievePlaylists = async () => {
  try {
    const response = await fetch('/api/playlists', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    if(!response.ok) {
      throw new Error('invalid playlist API response, check network tab!');
    }

    return data;
  } catch(err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

//Retrieve the playlist by playlist id number
const retrievePlaylist = async (id: number | null) => {
  try {
    const response = await fetch(`/api/playlists/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch playlist');
  }
};


//Retrieve the playlist by user id
const retrievePlaylistsByUserId = async (userId: number | null) => {
  try {
    const response = await fetch(`/api/playlists/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch playlists');
  }
};


const createPlaylist = async (body: PlaylistData):Promise<PlaylistData> => {
  try {
    const response = await fetch(
      '/api/playlists/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
      }

    )
    const data = response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from Playlist Creation: ', err);
    return Promise.reject('Could not create new playlist');
  }
};

const updatePlaylist = async (id: number, body: PlaylistData ):Promise<PlaylistData> => {
  try {
    const response = await fetch(
      `/api/playlists/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not playlist', err);
    return Promise.reject('Update did not playlist');
  }
};

const deletePlaylist = async (playListId: number | null): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/playlists/${playListId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting Playlist', err);
    return Promise.reject('Could not delete playlist');
  }
};

export { retrievePlaylist, retrievePlaylists, retrievePlaylistsByUserId, createPlaylist, updatePlaylist, deletePlaylist };
