import { SidebarLayout } from "@/layouts/SidebarLayout";
import { SearchCommand } from "./components/SearchCommand";

const SearchView = () => {
  return (
    <SidebarLayout>
      <div className="w-full max-w-[600px] mx-auto p-4 sm:p-6 flex flex-col justify-center rounded-lg shadow-md">
        <SearchCommand />
      </div>
    </SidebarLayout>
  );
};

export default SearchView;
