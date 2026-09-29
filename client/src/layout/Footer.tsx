import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Student Marketplace. Built for campus
            exchange.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              to="/listings"
              className="transition-colors hover:text-gray-900"
            >
              Listings
            </Link>

            <a
              href="mailto:lahamomar25@gmail.com"
              className="transition-colors hover:text-gray-900"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 text-center sm:text-left">
          <p className="text-sm text-gray-500">
            Questions or feedback?{" "}
            <a
              href="mailto:your-email@example.com"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
