import { motion } from "framer-motion";
const MealCard = ({ meal, setSelectedMeal, isFavorite, toggleFavorite }) => {
  console.log("meal", meal);
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="relative rounded-2xl overflow-hidden z-10 shadow-lg h-80 cursor-pointer"
    >
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </motion.div>

      {/* Floating Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(meal);
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm shadow-lg"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <motion.svg
          animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={`w-7 h-7 ${
            isFavorite
              ? "text-red fill-current"
              : "text-white fill-transparent stroke-white stroke-2"
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      </motion.button>

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 bg-gradient-to-t from-black/50 via-black/20 to-black/0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col justify-between gap-2 items-start">
          <div>
            <h3 className="text-white text-lg font-semibold line-clamp-2">
              {meal.strMeal}
            </h3>
          </div>
          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < 4
                    ? "text-yellow fill-current"
                    : "text-white/30 fill-current"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </motion.div>
          <motion.button
            whileHover={{ x: 3 }}
            className="flex items-center mt-1 justify-center text-sm font-medium bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMeal(meal);
            }}
          >
            View
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </div>

        {/* Animated rating stars (example) */}
      </motion.div>
    </motion.div>
  );
};

export default MealCard;
