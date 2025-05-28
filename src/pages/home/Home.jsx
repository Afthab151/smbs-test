import { useState, useEffect } from "react";
import Favorites from "./comp/Favorites";
import { useSessionStorage } from "../../utils/useSessionStorage";
import CategorySidebar from "./comp/CategorySidebar";
import MealCard from "./comp/MealCard";
import MealDetails from "./comp/MealDetails";
import { MEAL } from "../../api/meal";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useSessionStorage("favorites", []);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);

      try {
        const response = await MEAL.GET_ALL_CATEGORIES();
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        toast.error("Failed to load categories. Please try again later.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch meals when category changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchMeals = async () => {
        setLoadingMeals(true);

        try {
          const response = await MEAL.GET_MEALS_BY_CATEGORY(selectedCategory);
          setMeals(response.data.meals || []);
        } catch (error) {
          console.error("Error fetching meals:", error.message);
          toast.error("Failed to load meals. Please try again later.");
          setMeals([]);
        } finally {
          setLoadingMeals(false);
        }
      };

      fetchMeals();
    }
  }, [selectedCategory]);

  // Search meals by name
  const searchMeals = async () => {
    if (!searchTerm.trim()) return;

    setLoadingMeals(true);

    try {
      const response = await MEAL.SEARCH_MEALS(searchTerm);
      setMeals(response.data.meals || []);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error searching meals:", error.message);
      toast.error("Search failed. Please try again.");
      setMeals([]);
    } finally {
      setLoadingMeals(false);
    }
  };

  // Get random meal
  const getRandomMeal = async () => {
    setLoadingRandom(true);

    try {
      const response = await MEAL.GET_RANDOM_MEAL();
      setSelectedMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching random meal:", error.message);
      toast.error("Failed to get random meal. Please try again.");
    } finally {
      setLoadingRandom(false);
    }
  };

  // Toggle favorite
  const toggleFavorite = (meal) => {
    if (favorites.some((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites(favorites.filter((fav) => fav.idMeal !== meal.idMeal));
      toast.success(`${meal.strMeal} removed from favorites`);
    } else {
      setFavorites([...favorites, meal]);
      toast.success(`${meal.strMeal} added to favorites! `);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <CategorySidebar
        categories={categories}
        loadingCategories={loadingCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setShowFavorites={setShowFavorites}
        getRandomMeal={getRandomMeal}
        loadingRandom={loadingRandom}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-3 lg:mt-0 mt-15 items-center">
            {/* Search Input */}
            <motion.div
              className="flex-1 relative"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                type="text"
                placeholder="Discover amazing recipes..."
                className="w-full p-4 pl-12 pr-5 text-lg border-2 border-gray-light rounded-xl focus:outline-none focus:border-[#1C2434] focus:ring-1 focus:ring-amber/30 shadow-sm transition-all duration-200 bg-white/90 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchMeals()}
                disabled={loadingMeals}
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-dark"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>

            {/* Search Button */}
            <motion.button
              onClick={searchMeals}
              disabled={loadingMeals || !searchTerm.trim()}
              className={`px-6 py-4 rounded-xl flex items-center justify-center min-w-[120px] transition-all duration-200 shadow-md ${
                loadingMeals || !searchTerm.trim()
                  ? "bg-gray-light text-gray cursor-not-allowed"
                  : "bg-[#1C2434] text-white hover:shadow-lg"
              }`}
              whileHover={
                !loadingMeals && searchTerm.trim() ? { scale: 1.03 } : {}
              }
              whileTap={
                !loadingMeals && searchTerm.trim() ? { scale: 0.97 } : {}
              }
            >
              {loadingMeals ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="flex items-center"
                >
                  <svg
                    className="h-5 w-5"
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
                </motion.div>
              ) : (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center font-medium"
                >
                  Search
                </motion.span>
              )}
            </motion.button>
          </div>
        </motion.div>

        {showFavorites ? (
          <Favorites
            favorites={favorites}
            setSelectedMeal={setSelectedMeal}
            toggleFavorite={toggleFavorite}
            setShowFavorites={setShowFavorites}
            loading={loadingMeals}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-3xl font-bold font-serif">
                {selectedCategory ? `${selectedCategory} Meals` : "All Meals"}
              </h1>
              {loadingMeals && (
                <div className="flex items-center text-gray">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary"
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
                  Loading...
                </div>
              )}
            </div>

            {loadingMeals ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {[...Array(8)].map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Skeleton Card */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="bg-white h-48 w-full relative">
                        {/* Floating tag placeholder (only on some cards) */}
                        {index % 3 === 0 && (
                          <div className="absolute top-3 left-3 bg-gray-medium/30 h-6 w-16 rounded-full"></div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="h-5 bg-gray-light rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-light rounded w-1/3"></div>
                        <div className="h-6 w-16 bg-gray-light mt-3 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : meals.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium font-sans text-graydark">
                  No meals found
                </h3>
                <p className="mt-1 font-sans text-gray">
                  {selectedCategory
                    ? `No meals found in ${selectedCategory} category.`
                    : "Try selecting a category or searching for meals."}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchTerm("");
                    }}
                    className="inline-flex font-sans items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-black-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            ) : (
              //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              //     {meals.map((meal) => (
              //       <MealCard
              //         key={meal.idMeal}
              //         meal={meal}
              //         setSelectedMeal={setSelectedMeal}
              //         isFavorite={favorites.some(
              //           (fav) => fav.idMeal === meal.idMeal
              //         )}
              //         toggleFavorite={toggleFavorite}
              //       />
              //     ))}
              //   </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {meals.map((meal, index) => (
                  <motion.div
                    key={meal.idMeal}
                    variants={itemVariants}
                    whileHover="hover"
                    className="relative"
                  >
                    <MealCard
                      meal={meal}
                      setSelectedMeal={setSelectedMeal}
                      isFavorite={favorites.some(
                        (fav) => fav.idMeal === meal.idMeal
                      )}
                      toggleFavorite={toggleFavorite}
                    />

                    {/* Floating tags */}
                    {index % 3 === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="absolute top-3 left-3 bg-black-2/30 hover:bg-white/40 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10"
                      >
                        Popular
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>

      {selectedMeal && (
        <MealDetails
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          isFavorite={favorites.some(
            (fav) => fav.idMeal === selectedMeal.idMeal
          )}
          toggleFavorite={toggleFavorite}
          loading={loadingRandom}
        />
      )}
    </div>
  );
}
