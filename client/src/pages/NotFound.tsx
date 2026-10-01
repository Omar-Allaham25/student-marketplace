import {Link} from "react-router-dom";

export const NotFound = () => {
    return (<div>
        <h1 className="text-4xl font-bold text-center mt-20">404 - Page Not Found</h1>
        <p className="text-center mt-4 text-gray-600">The page you are looking for does not exist.</p>
        <div className="text-center mt-6">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Go back home
            </Link>
        </div>
    </div>)}