import { UserData } from "./UserData";

interface Song {
  title: string;
  artist: string;
}

export interface PlaylistData {
    id: number | null;
    title: string | null;
    songList: Song[] | null;
    assignedUserId: number | null;
    assignedUser: UserData | null;
  }