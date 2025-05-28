import MealCard from "./MealCard";

const Favorites = ({
  favorites,
  setSelectedMeal,
  toggleFavorite,
  setShowFavorites,
  loading,
}) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold font-serif">My Favorite Meals</h1>
          {loading && (
            <svg
              className="animate-spin ml-2 h-5 w-5 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
        <button
          onClick={() => setShowFavorites(false)}
          className="bg-gray font-sans text-white px-4 py-2 rounded hover:bg-gray-dark transition-colors flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Meals
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-16 w-16 text-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-sans font-medium text-gray-dark">
            No favorites yet
          </h3>
          <p className="mt-1 text-gray font font-sans">
            Your favorite meals will appear here
          </p>
          <button
            onClick={() => setShowFavorites(false)}
            className="mt-4 font-sans bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Browse Meals
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow overflow-hidden animate-pulse"
            >
              <div className="bg-gray-light h-48 w-full"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-light rounded w-3/4 mb-3"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-light rounded w-1/4"></div>
                  <div className="h-6 w-6 bg-gray-light rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              setSelectedMeal={setSelectedMeal}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
