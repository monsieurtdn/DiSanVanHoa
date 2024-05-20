import { UserData } from './Utils';

export interface attr {
  name: string;
  content: string;
}

export interface ISite {
  _id: string;
  name: string;
  location: string;
  content: attr[];
  source: string;
  image_link: string;
  region: string;
  video_link: string;
  type: string;
  category: string;
}

export interface ResponseToken {
  error: string;
  jwt: string;
  user: UserData;
}

export interface IEvent {
  _id: string;
  event_name: string;
  event_date: string;
  author: string;
  content: string;
  image_link: string;
  video_link: string;
}

export interface IPost {
  id: string;
  title: string;
  author: string;
  content: string;
  img: string[];
}
