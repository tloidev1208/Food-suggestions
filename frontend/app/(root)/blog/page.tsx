'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image as LucideImage, Heart, Share2, Bookmark, Send } from 'lucide-react';

const postsMock = [
  {
    id: 1,
    user: {
      name: 'Ray Hammond',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    date: '2d ago',
    content: {
      text: "I'm so glad to share with you guys some photos from my recent trip to New York...",
       images: [
        '/images/3.avif',
        '/images/2.avif',
      ]
    },
    likes: 925,
    comments: 23,
    shares: 4,
  },
  {
    id: 2,
    user: {
      name: 'Todd Torres',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    date: '5d ago',
    content: {
      text: "Magical city, always glad to come back 👌",
      images: [
        '/images/1.avif',
        '/images/2.avif',
      ]
    },
    likes: 550,
    comments: 15,
    shares: 2,
  },
];

export default function SocialFeed() {
  const [posts, setPosts] = useState(postsMock);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* New Post */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea placeholder="What's on your mind?" className="resize-none" />
              <Input type="file" className="text-sm" />
              <Button variant="default">Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium leading-tight">{post.user.name}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>

            <p className="text-sm text-gray-800 whitespace-pre-line">{post.content.text}</p>

            {post.content.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {post.content.images.map((img, i) => (
                  <img key={i} src={img} alt="post" className="rounded-xl object-cover h-48 w-full" />
                ))}
              </div>
            )}

            <div className="flex justify-between items-center text-gray-600 text-sm">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>

            <div className="flex items-center justify-around text-gray-700 border-t pt-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart size={16} /> Like
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Share2 size={16} /> Share
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Bookmark size={16} /> Save
              </Button>
            </div>

            <div className="mt-2 flex gap-2 items-center">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <Input placeholder="Add a comment..." className="text-sm" />
              <Button variant="ghost" size="icon">
                <Send size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
