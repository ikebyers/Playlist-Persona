export interface Song {
  songTitle: string;
  artistName: string;
  url: string;
}

export interface PlaylistData {
    id: number | null;
    title: string | null;
    songList: Song[] | null;
    assignedUserId: number | null;
  }