import { useEffect, useState } from "react";
import { MEAL } from "../../../api/meal";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const MealDetails = ({
  meal,
  onClose,
  isFavorite,
  toggleFavorite,
  loading,
}) => {
  const [detailedMeal, setDetailedMeal] = useState(meal);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // If the passed meal doesn't have details, fetch them
  useEffect(() => {
    if (!meal.strInstructions) {
      const fetchMealDetails = async () => {
        setLoadingDetails(true);
        try {
          const response = await MEAL.GET_MEAL_DETAILS(meal.idMeal);
          console.log("res", response);
          if (response.data?.meals?.length > 0) {
            setDetailedMeal(response.data.meals[0]);
          } else {
            toast.error("Meal details not found");
          }
        } catch (error) {
          console.error("Error fetching meal details:", error);
          toast.error("Failed to load meal details");
        } finally {
          setLoadingDetails(false);
        }
      };

      fetchMealDetails();
    }
  }, [meal.idMeal, meal.strInstructions]);

  // Get ingredients and measures
  const getIngredients = () => {
    if (!detailedMeal) return [];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (
        detailedMeal[`strIngredient${i}`] &&
        detailedMeal[`strIngredient${i}`].trim() !== ""
      ) {
        ingredients.push({
          ingredient: detailedMeal[`strIngredient${i}`],
          measure: detailedMeal[`strMeasure${i}`] || "to taste",
        });
      }
    }
    return ingredients;
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="no-scrollbar z-9  bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 text-gray rounded-full p-2 hover:bg-gray transition-all z-20 shadow-md hover:shadow-lg"
              aria-label="Close meal details"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Favorite button */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(detailedMeal)}
              className={`absolute top-4 p-2 rounded-full bg-black/30 backdrop-blur-sm shadow-lg left-4 z-20 ${
                isFavorite ? "text-red" : "text-white/80 hover:text-white"
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <motion.div
                animate={{ scale: isFavorite ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d={
                      isFavorite
                        ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                    }
                  />
                </svg>
              </motion.div>
            </motion.button>

            {/* Image section */}
            <div className="relative h-72 w-full overflow-hidden">
              {loadingDetails ? (
                <div className="w-full h-full bg-gradient-to-r from-gray to-gray animate-pulse"></div>
              ) : (
                <>
                  <motion.img
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={detailedMeal.strMealThumb}
                    alt={detailedMeal.strMeal}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </>
              )}
            </div>

            {/* Content section */}
            <div className="p-6 md:p-8">
              {loadingDetails ? (
                <div className="space-y-6">
                  <div className="h-8 bg-gray rounded-full w-3/4 animate-pulse"></div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="h-6 bg-gray rounded-full w-1/3 mb-4 animate-pulse"></div>
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 bg-gray rounded-full animate-pulse"
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="h-6 bg-gray rounded-full w-1/3 mb-4 animate-pulse"></div>
                      <div className="space-y-3">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 bg-gray rounded-full animate-pulse"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-6xl mx-auto px-6 py-5"
                  >
                    <div className="flex flex-wrap items-center gap-4 mb-12">
                      <h2 className="text-4xl font-bold text-gray-dark font-serif tracking-tight">
                        {detailedMeal.strMeal}
                      </h2>
                      {detailedMeal.strArea && (
                        <span className="text-sm font-medium text-gray bg-gray-light px-4 py-1.5 rounded-full font-sans">
                          {detailedMeal.strArea}
                        </span>
                      )}
                      {detailedMeal.strCategory && (
                        <span className="text-sm font-medium text-amber bg-amber-light px-4 py-1.5 rounded-full font-sans">
                          {detailedMeal.strCategory}
                        </span>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      {/* Ingredients */}
                      <div className="bg-gray-very-light p-8 rounded-xl">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl font-semibold mb-6 text-gray-dark font-serif flex items-center"
                        >
                          <span className="w-3 h-3 bg-amber rounded-full mr-3"></span>
                          Ingredients
                        </motion.h3>
                        <ul className="space-y-4">
                          {getIngredients().map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.05 }}
                              className="flex items-start group"
                            >
                              <span className="inline-block w-2 h-2 bg-amber rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                              <span className="text-gray font-sans">
                                <span className="font-medium group-hover:text-amber transition-colors">
                                  {item.ingredient}
                                </span>
                                {item.measure && (
                                  <span className="text-gray-medium text-sm ml-2">
                                    - {item.measure}
                                  </span>
                                )}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div className="bg-white p-8 rounded-xl shadow-sm">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl font-semibold mb-6 text-gray-dark font-serif flex items-center"
                        >
                          <span className="w-3 h-3 bg-amber rounded-full mr-3"></span>
                          Instructions
                        </motion.h3>
                        <div className="prose max-w-none text-gray font-sans leading-relaxed">
                          {detailedMeal.strInstructions ? (
                            detailedMeal.strInstructions
                              .split("\n")
                              .filter((step) => step.trim())
                              .map((step, idx) => (
                                <motion.p
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 + idx * 0.03 }}
                                  className="mb-6 last:mb-0 text-gray"
                                >
                                  {step}
                                </motion.p>
                              ))
                          ) : (
                            <p className="text-gray-medium">
                              No instructions available.
                            </p>
                          )}
                        </div>

                        {detailedMeal.strYoutube && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12"
                          >
                            <motion.a
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              href={detailedMeal.strYoutube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-3 bg-red hover:bg-[#b91c1c] text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                            >
                              <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                              </svg>
                              Watch on YouTube
                            </motion.a>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MealDetails;
