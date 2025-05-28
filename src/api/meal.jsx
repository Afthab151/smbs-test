import { CONSTANT } from "../utils/Constant";
import { API_REQUEST } from "./api";

export const MEAL = {
  // Categories
  GET_ALL_CATEGORIES() {
    const url = `${CONSTANT.URL}categories.php`;
    return API_REQUEST("GET", url);
  },

  // Meals by Category
  GET_MEALS_BY_CATEGORY(category) {
    const url = `${CONSTANT.URL}filter.php?c=${category}`;
    return API_REQUEST("GET", url);
  },

  // Meal Details
  GET_MEAL_DETAILS(id) {
    const url = `${CONSTANT.URL}lookup.php?i=${id}`;
    return API_REQUEST("GET", url);
  },

  // Search Meals
  SEARCH_MEALS(term) {
    const url = `${CONSTANT.URL}search.php?s=${term}`;
    return API_REQUEST("GET", url);
  },

  // Random Meal
  GET_RANDOM_MEAL() {
    const url = `${CONSTANT.URL}random.php`;
    return API_REQUEST("GET", url);
  },

  // Filter by Ingredient
  FILTER_BY_INGREDIENT(ingredient) {
    const url = `${CONSTANT.URL}filter.php?i=${ingredient}`;
    return API_REQUEST("GET", url);
  },

  // Filter by Area
  FILTER_BY_AREA(area) {
    const url = `${CONSTANT.URL}filter.php?a=${area}`;
    return API_REQUEST("GET", url);
  },

  // List all ingredients
  LIST_ALL_INGREDIENTS() {
    const url = `${CONSTANT.URL}list.php?i=list`;
    return API_REQUEST("GET", url);
  },

  // List all areas
  LIST_ALL_AREAS() {
    const url = `${CONSTANT.URL}list.php?a=list`;
    return API_REQUEST("GET", url);
  },
};
