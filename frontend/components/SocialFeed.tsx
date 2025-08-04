'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Share2, Bookmark, Send } from 'lucide-react';

interface Post {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string; 
  };
  content: string;
  images: string[];
  createdAt: string;
  __v?: number;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const data = await res.json();

    // Bỏ `.data`, vì API trả trực tiếp mảng
    if (Array.isArray(data)) {
      setPosts(data.reverse());
    } else {
      setPosts([]);
    }
  } catch (err) {
    console.error('Lỗi khi lấy bài viết:', err);
  }
};



  useEffect(() => {
    fetchPosts();
  }, []);

 const handleSubmit = async () => {
  if (!content.trim()) return;

  const formData = new FormData();
  formData.append('content', content);
  if (image) formData.append('image', image);

  // Lấy user từ localStorage
  const stored = JSON.parse(localStorage.getItem('user') || '{}');
  let userId = '';

  if (stored._id) {
    userId = stored._id;
  } else if (stored.id) {
    userId = stored.id;
  } else if (stored.user && stored.user._id) {
    userId = stored.user._id;
  } else if (typeof stored === 'string') {
    userId = stored;
  }

  if (!userId) {
    alert('Không tìm thấy userId, vui lòng đăng nhập lại!');
    return;
  }

  formData.append('userId', userId); // Gửi userId như backend cần

  try {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Lỗi khi đăng bài');

    const newPost = await res.json();

    
    const userObj = stored?.user?._id
      ? stored.user
      : { _id: userId, name: 'Bạn', avatar: '' };

    setPosts((prev) => [
      {
        ...newPost,
        user: userObj,
      },
      ...prev,
    ]);
    setContent('');
    setImage(null);
    
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Chia sẻ một công thức ngay"
                className="resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="text-sm"
              />
              <Button onClick={handleSubmit} disabled={loading || !content}>
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

     {posts.map((post) => (
  <Card key={post._id}>
    <CardContent className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.user.avatar || ('https://i.pravatar.cc/150?u=' + post.user._id)} />
          <AvatarFallback>{post.user?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium leading-tight">{post.user?.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-800 whitespace-pre-line">{post.content}</p>

      {Array.isArray(post.images) && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {post.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="post"
              className="rounded-xl object-cover h-48 w-full"
            />
          ))}
        </div>
      )}

      <div className="flex justify-between items-center text-gray-600 text-sm">
        <span>0 lượt thích</span>
        <span>0 bình luận</span>
        <span>0 chia sẻ</span>
      </div>

      <div className="flex items-center justify-around text-gray-700 border-t pt-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Heart size={16} /> Thích
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 size={16} /> Chia sẻ
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Bookmark size={16} /> Lưu
        </Button>
      </div>

      <div className="mt-2 flex gap-2 items-center">
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <Input placeholder="Thêm một bình luận..." className="text-sm" />
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
