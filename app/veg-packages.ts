export type VegPackage = {
  id: string;
  name: string;
  price: number;
  items: { name: string; quantity: number }[];
};

// Prices and quantities from the original ROXX vegetarian package poster.
export const vegPackages: VegPackage[] = [
  {
    id: "simple", name: "Veg Simple", price: 499,
    items: [
      { name: "Main Course Veg (Paneer)", quantity: 1 },
      { name: "Main Course Seasonal Veg", quantity: 1 },
      { name: "Dal Fry", quantity: 1 },
      { name: "Steam Basmati Rice / Jeera Rice", quantity: 1 },
      { name: "Tandoori Roti & Naan", quantity: 1 },
      { name: "Salad", quantity: 1 },
      { name: "Papad", quantity: 1 },
      { name: "Pickle", quantity: 1 },
      { name: "Raita", quantity: 1 },
      { name: "Dessert", quantity: 1 },
    ],
  },
  {
    id: "silver", name: "Veg Silver", price: 599,
    items: [
      { name: "Welcome Drink", quantity: 1 },
      { name: "Starter", quantity: 1 },
      { name: "Salad", quantity: 1 },
      { name: "Curd Preparation", quantity: 1 },
      { name: "Main Course Veg", quantity: 2 },
      { name: "Assorted Indian Breads", quantity: 2 },
      { name: "Rice", quantity: 1 },
      { name: "Dal", quantity: 1 },
      { name: "Dessert", quantity: 1 },
      { name: "Achar / Papad / Pickle", quantity: 1 },
    ],
  },
  {
    id: "gold", name: "Veg Gold", price: 799,
    items: [
      { name: "Welcome Drink", quantity: 2 },
      { name: "Soup", quantity: 1 },
      { name: "Manchurian & Noodles", quantity: 2 },
      { name: "Starter", quantity: 2 },
      { name: "Salad", quantity: 2 },
      { name: "Curd Preparation", quantity: 1 },
      { name: "Main Course Veg", quantity: 2 },
      { name: "Assorted Indian Breads", quantity: 3 },
      { name: "Rice", quantity: 1 },
      { name: "Dal", quantity: 1 },
      { name: "Dessert", quantity: 1 },
      { name: "Ice Cream", quantity: 1 },
      { name: "Achar / Papad / Pickle", quantity: 1 },
      { name: "Chutney", quantity: 1 },
    ],
  },
  {
    id: "platinum", name: "Veg Platinum", price: 1099,
    items: [
      { name: "Welcome Drink", quantity: 3 },
      { name: "Soup", quantity: 1 },
      { name: "Chat Counter", quantity: 1 },
      { name: "Noodles & Manchurian", quantity: 2 },
      { name: "Starter", quantity: 3 },
      { name: "Salad", quantity: 2 },
      { name: "Curd Preparation", quantity: 1 },
      { name: "Main Course Veg", quantity: 3 },
      { name: "Assorted Indian Breads", quantity: 4 },
      { name: "Rice", quantity: 2 },
      { name: "Dal", quantity: 1 },
      { name: "Dessert", quantity: 1 },
      { name: "Ice Cream", quantity: 2 },
      { name: "Achar / Papad / Chutney", quantity: 1 },
    ],
  },
];
