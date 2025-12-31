import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-6">Đang tải kết quả tìm kiếm...</p>}>
      <SearchClient />
    </Suspense>
  );
}
