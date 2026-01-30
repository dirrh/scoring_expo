export type SocialPost = {
  id: string;
  user: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  images?: string[];
  video?: string;
  videoPoster?: string;
  likes: number;
  comments: number;
  shares: number;
};

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: '1',
    user: 'Izabela Majáková',
    handle: '@iza123',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    time: '3h',
    content: 'Liverpool looked in top form last night — the pressing, tempo, and movement were on a completely different level 🔥.',
    images: [
      'https://picsum.photos/id/1011/1200/800',
      'https://picsum.photos/id/1015/1200/800',
      'https://picsum.photos/id/1021/1200/800'
    ],
    likes: 15,
    comments: 6,
    shares: 2
  },
  {
    id: '2',
    user: 'Eva Novotná',
    handle: '@eva123',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    time: '4h',
    content: 'Kane fits Bayern like he’s been there for years. Easy goals every week 🏆⚽',
    images: [
      'https://picsum.photos/id/1035/1200/800'
    ],
    likes: 78,
    comments: 13,
    shares: 0
  },
  {
    id: '3',
    user: 'Martin Novák',
    handle: '@mato123',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    time: '6h',
    content: 'Morning session from the stands — quick clip from today.',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoPoster: 'https://picsum.photos/id/1003/1200/800',
    likes: 41,
    comments: 9,
    shares: 1
  }
];

export const VIDEO_POSTS = SOCIAL_POSTS.filter((post) => !!post.video);
