import type { MenuItem } from "./menu";

/** One square, dish-specific generated photograph for every menu entry. */
export function dishImageSlug(name: string): string {
  return name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getMenuPresentation(dish: MenuItem): { image: string; description: string } {
  const name = dish.name.toLowerCase();
  const result = (description: string) => ({ image: `/images/dishes/${dishImageSlug(dish.name)}.webp`, description });
  if (dish.category === "Soup") {
    if (/corn|cream/.test(name)) return result("A comforting, mellow start to your meal.");
    if (/lemon|sangam/.test(name)) return result("A warm bowl to ease into a flavourful evening.");
    return result("A savoury favourite from our soup selection.");
  }
  if (dish.category === "Breads") {
    if (/garlic/.test(name)) return result("A flavourful companion to your favourite curry.");
    if (/missi/.test(name)) return result("A homestyle bread to complete your ROXX meal.");
    if (/roti/.test(name)) return result("Keep a little room for one more warm roti.");
    return result("Made for scooping, sharing, and that last spoonful of gravy.");
  }
  if (dish.category === "Dal") {
    if (/makhani/.test(name)) return result("Rich comfort for the centre of your table.");
    if (/tadka|tarka|makai/.test(name)) return result("An Indian comfort classic to enjoy with rice or bread.");
    return result("Simple, comforting, and always at home on an Indian table.");
  }
  if (dish.category === "Rice & Biryani") {
    if (/biryani/.test(name)) return result("Fragrant rice and layers of flavour, for a satisfying feast.");
    if (/steam/.test(name)) return result("A simple accompaniment to your favourite curry or dal.");
    if (/jeera|pulao/.test(name)) return result("A fragrant rice favourite to complete your meal.");
    return result("A satisfying favourite from our rice selection.");
  }
  if (dish.category === "Starters") {
    if (/noodles/.test(name)) return result("A Chinese-menu favourite for your next craving.");
    if (/spring/.test(name)) return result("A crisp beginning, best enjoyed with good company.");
    if (/fish/.test(name)) return result("A savoury seafood starter to begin your feast.");
    if (!dish.veg) return result("A bold chicken starter, made for the first round of sharing.");
    if (/potato/.test(name)) return result("A sweet-and-spicy favourite from our starter selection.");
    if (/manchurian/.test(name)) return result("A flavour-packed Chinese favourite to start things off.");
    return result("A bold vegetarian beginning to your ROXX meal.");
  }
  if (dish.category === "Non-vegetarian") {
    if (/egg/.test(name)) return result("A comforting choice from our Indian main courses.");
    if (/fish/.test(name)) return result("A seafood curry to pair with your favourite rice or bread.");
    if (/mutton/.test(name)) return result("A hearty Indian favourite for a leisurely meal.");
    if (/butter|tikka/.test(name)) return result("A rich chicken favourite, ready for a side of naan.");
    if (/korma|khurma/.test(name)) return result("A comforting curry for an indulgent Indian meal.");
    if (/kolhapuri|punjabi/.test(name)) return result("A full-flavoured choice from our chicken selection.");
    return result("A hearty chicken main to bring the whole table together.");
  }
  if (/bhindi/.test(name)) return result("A familiar vegetarian favourite from the Indian kitchen.");
  if (/kofta/.test(name)) return result("A comforting vegetarian curry to enjoy with warm naan.");
  if (/aloo/.test(name)) return result("A homestyle potato favourite to share around the table.");
  if (/palak/.test(name)) return result("A comforting green curry from our vegetarian selection.");
  if (/mushroom/.test(name) && !/paneer/.test(name)) return result("A hearty vegetarian choice for your next curry craving.");
  if (/paneer/.test(name)) return result(/roxx special/.test(name) ? "Our ROXX special. Rich comfort, one delicious bite at a time." : "A paneer favourite to enjoy with your choice of rice or bread.");
  return result("A colourful comfort favourite from our vegetarian kitchen.");
}
