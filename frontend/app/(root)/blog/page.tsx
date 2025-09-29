import SocialFeed from "@/components/SocialFeed";
import RecentlyJoined from "@/components/RecentlyJoined";
import SidebarBlog from "@/components/SidebarBlog";

export default function BlogPage() {
  return (
    <div className="max-w-full mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex">
          <SidebarBlog />
        </div>
        <div className="flex-1">
          <SocialFeed />
        </div>
        <div className="flex">
          <RecentlyJoined />
        </div>
      </div>
    </div>
  );
}
