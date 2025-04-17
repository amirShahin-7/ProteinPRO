const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4 gap-4">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
      <p className="text-gray-500 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export default NotFound;
