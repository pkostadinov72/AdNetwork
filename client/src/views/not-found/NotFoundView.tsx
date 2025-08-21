import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundView: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! This page was not found.
        </p>
        <Link
          to="/"
          className="inline-block rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundView;
