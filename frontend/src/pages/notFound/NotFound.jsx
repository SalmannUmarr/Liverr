import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-gray-100 px-6">
      <section className="text-center max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Page not found
        </h1>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          <Home size={18} />
          Back home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
