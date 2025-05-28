import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CategorySidebar = ({
  categories,
  loadingCategories,
  selectedCategory,
  setSelectedCategory,
  setShowFavorites,
  getRandomMeal,
  loadingRandom,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const [categoriesOpen, setCategoriesOpen] = useState(true);

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const toggleVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        className={`fixed ${
          isOpen ? "hidden" : "block"
        } lg:hidden z-20 top-4 left-4 bg-[#1C2434] p-2 rounded-full shadow-lg`}
        onClick={() => setIsOpen(!isOpen)}
        animate={isOpen ? "open" : "closed"}
        variants={toggleVariants}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed lg:relative z-9999 w-72 h-full bg-gradient-to-b from-[#1C2434] to-[#141a26] text-white p-6 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex w-full lg:justify-start justify-between gap-5 items-center mb-8">
              <div className="flex items-center justify-center gap-5">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="45px"
                  height="45px"
                  viewBox="0,0,256,256"
                >
                  <g
                    fill="#ffffff"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                  >
                    <g transform="scale(2,2)">
                      <path d="M67,0.90039c-1.7,0 -3,1.3 -3,3v38.19922c0,7.1 5.2,13.1 12,14.5v67.80078c0,1.7 1.3,3 3,3c1.7,0 3,-1.3 3,-3v-67.80078c6.8,-1.4 11.90039,-7.49961 11.90039,-14.59961l0.09961,-38c0,-1.7 -1.20039,-2.99961 -2.90039,-3.09961c-1.7,0 -3.09961,1.3 -3.09961,3v38.19922c0,4.9 -4.1,8.80078 -9,8.80078c-5,0 -9,-3.90078 -9,-8.80078v-38.19922c0,-1.6 -1.3,-3 -3,-3zM79,1c-1.7,0 -3,1.3 -3,3v24.90039c0,1.7 1.3,3 3,3c1.7,0 3,-1.3 3,-3v-24.90039c0,-1.7 -1.3,-3 -3,-3zM123.73828,1.38281c-2.01387,-0.11211 -4.03867,0.90547 -6.13867,2.91797c-4.1,3.9 -8,11.6 -10.5,20.5c-2.1,7.3 -4.1,18.69883 -2,31.29883c1,6.3 3.2,12.40117 6.5,18.20117c0.8,1.4 2.59961,1.99961 4.09961,1.09961c1.4,-0.8 2.00156,-2.59961 1.10156,-4.09961c-2.9,-5.2 -4.90078,-10.60117 -5.80078,-16.20117c-3.1,-18.5 3.49922,-37.29922 9.19922,-44.69922c0.3,-0.4 0.60078,-0.7 0.80078,-1v115.09961c0,1.7 1.3,3 3,3c1.7,0 3,-1.3 3,-3v-120c0,-1.5 -1.00039,-2.7 -2.40039,-3c-0.2875,-0.0625 -0.57363,-0.10117 -0.86133,-0.11719zM3.90234,1.85156c-1.38223,0.03145 -2.63984,1.04922 -2.90234,2.44922c-0.2,1.7 0.9,3.2 2.5,3.5c27.5,4.6 47.5,28.19922 47.5,56.19922c0,28 -20,51.59922 -47.5,56.19922c-1.6,0.3 -2.7,1.8 -2.5,3.5c0.2,1.5 1.5,2.5 3,2.5h0.5c30.4,-5.2 52.5,-31.29922 52.5,-62.19922c0,-30.9 -22.1,-56.99961 -52.5,-62.09961c-0.2,-0.0375 -0.4002,-0.05332 -0.59766,-0.04883zM4.19727,26.38086c-1.40273,-0.12168 -2.74766,0.81875 -3.09766,2.21875c-0.5,1.6 0.49961,3.30117 2.09961,3.70117c14,4 23.80078,17.09922 23.80078,31.69922c0,14.6 -9.80078,27.69922 -23.80078,31.69922c-1.6,0.5 -2.49961,2.10117 -2.09961,3.70117c0.4,1.3 1.60039,2.19922 2.90039,2.19922c0.3,0 0.60078,0.00039 0.80078,-0.09961c16.6,-4.8 28.19922,-20.2 28.19922,-37.5c0,-17.3 -11.59922,-32.7 -28.19922,-37.5c-0.2,-0.0625 -0.40313,-0.10176 -0.60352,-0.11914z"></path>
                    </g>
                  </g>
                </svg>
                <h2 className="text-2xl font-bold font-serif tracking-tight">
                  MEALS
                </h2>
              </div>
              <div className="flex">
                <button
                  className="lg:hidden items-end flex text-white p-1 rounded-full hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-4 flex-1 flex flex-col min-h-0">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="font-medium font-sans">All Categories</span>
                </div>
                <motion.div
                  animate={{ rotate: categoriesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: categoriesOpen ? "auto" : 0,
                  opacity: categoriesOpen ? 1 : 0,
                  marginTop: categoriesOpen ? "0.75rem" : "0",
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden flex-1 min-h-0"
              >
                <div className="h-full font-sans overflow-y-auto no-scrollbar">
                  {loadingCategories ? (
                    <div className="space-y-3">
                      {[...Array(8)].map((_, index) => (
                        <motion.div
                          key={index}
                          className="h-12 bg-white/10 rounded-lg animate-pulse"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        />
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {categories.map((category) => (
                        <motion.li
                          key={category.idCategory}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center ${
                              selectedCategory === category.strCategory
                                ? "bg-white/20 shadow-md font-semibold"
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                            onClick={() => {
                              setSelectedCategory(category.strCategory);
                              setShowFavorites(false);
                            }}
                          >
                            <span className="flex-1">
                              {category.strCategory}
                            </span>
                            {selectedCategory === category.strCategory && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-2"
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </motion.div>
                            )}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="mt-auto space-y-3 font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className={`w-full flex items-center justify-center py-3 px-6 rounded-lg transition-all ${
                  loadingRandom
                    ? "bg-white/20 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#d97706] hover:to-[#b45309] shadow-md"
                } text-white font-medium`}
                onClick={() => {
                  setSelectedCategory(null);
                  setShowFavorites(false);
                  getRandomMeal();
                }}
                disabled={loadingRandom}
                whileHover={!loadingRandom ? { scale: 1.02 } : {}}
                whileTap={!loadingRandom ? { scale: 0.98 } : {}}
              >
                {loadingRandom ? (
                  <>
                    <motion.svg
                      className="h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
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
                    </motion.svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Random Meal
                  </>
                )}
              </motion.button>

              <motion.button
                className="w-full py-3 px-6 bg-gradient-to-r from-[#ec4899] to-[#db2777] hover:from-[#db2777] hover:to-[#be185d] text-white rounded-lg shadow-md transition-all font-medium flex items-center justify-center"
                onClick={() => setShowFavorites(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                My Favorites
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategorySidebar;
