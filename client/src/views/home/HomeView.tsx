import { Feed } from "@/components/posts/Feed";
import { MainLayout } from "@/layouts/MainLayout";

const HomeView = () => {
  return (
    <MainLayout>
      <Feed />
    </MainLayout>
  );
};

export default HomeView;
