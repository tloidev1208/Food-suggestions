import SocialFeed from "@/components/SocialFeed";
import RecentlyJoined from "@/components/RecentlyJoined";

export default function BlogPage() {
  return (
    <div className="max-w-6xl bg-gray-100 mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Feed */}
        <div className="flex-1">
          <SocialFeed />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <RecentlyJoined />
        </div>
      </div>
    </div>
  );
}
