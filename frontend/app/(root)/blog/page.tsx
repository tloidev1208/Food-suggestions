import SocialFeed from "@/components/SocialFeed";
import RecentlyJoined from "@/components/RecentlyJoined";

export default function BlogPage() {
  return (
    <div className="max-w-6xl bg-gray-100 mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Feed */}
        <div className="flex-1">
          <SocialFeed />
        </div>

        {/* Sidebar */}
        <div className="flex justify-center lg:w-1/3 mt-6 lg:mt-0">
  <RecentlyJoined />
</div>

      </div>
    </div>
  );
}
