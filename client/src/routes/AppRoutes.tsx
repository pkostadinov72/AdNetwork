import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/routes/ProtectedRoute";

const LoginView = lazy(() => import("@/views/auth/LoginView"));
const RegisterView = lazy(() => import("@/views/auth/RegisterView"));
const HomeView = lazy(() => import("@/views/home/HomeView"));
const NotFoundView = lazy(() => import("@/views/not-found/NotFoundView"));
const ProfileView = lazy(() => import("@/views/profile/ProfileView"));
const CreatePostView = lazy(() => import("@/views/posts/CreatePostView"));
const SearchView = lazy(() => import("@/views/search/SearchView"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <Routes>
        <Route path="/auth/login" element={<LoginView />} />
        <Route path="/auth/register" element={<RegisterView />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/profile/:username" element={<ProfileView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/posts/create" element={<CreatePostView />} />
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Suspense>
  );
};
