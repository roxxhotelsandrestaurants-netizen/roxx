"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { menu, type Category } from "./menu";
import { getMenuPresentation } from "./menu-presentation";
import "./menu-cards.css";

const categories: Category[] = ["Soup", "Starters", "Vegetarian", "Non-vegetarian", "Rice & Biryani", "Dal", "Breads"];
const PAGE_SIZE = 6;
const descriptions: Record<Category, string> = {
  Soup: "A warm beginning to a wonderful meal.",
  Starters: "Crisp, fiery, and made for sharing.",
  Vegetarian: "Comforting classics from our vegetarian kitchen.",
  "Non-vegetarian": "Rich curries and hearty favourites, full of character.",
  "Rice & Biryani": "Fragrant grains. Layers of flavour.",
  Dal: "Slow comfort, one spoonful at a time.",
  Breads: "The perfect companion to every curry.",
};

export function MenuCatalog({ onOriginalMenu }: { onOriginalMenu: () => void }) {
  const [category, setCategory] = useState<Category | "All">("Starters");
  const [diet, setDiet] = useState("Everything");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filtered = menu.filter((dish) =>
    (category === "All" || dish.category === category) &&
    (diet === "Everything" || (diet === "Vegetarian only" ? dish.veg : !dish.veg)) &&
    dish.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  const visibleDishes = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleDishes.length;
  const activeGroups = categories.map((name) => ({ name, dishes: visibleDishes.filter((dish) => dish.category === name) })).filter((group) => group.dishes.length);

  return <section id="full-menu" className="catalog-section section-space">
    <div className="container">
      <div className="section-heading catalog-heading" data-reveal><div><p className="eyebrow"><Icon name="spark" size={17} /> EXPLORE THE ROXX MENU</p><h2>A world of flavour.<br /><em>Find your favourite.</em></h2></div><div><p>Take your time. Follow your cravings.<br />Browse {menu.length} dishes, a few at a time.</p><button className="text-link" onClick={onOriginalMenu}>View original menu pages <Icon name="diagonal" size={17} /></button></div></div>
      <div className="catalog-tools"><div className="menu-search"><Icon name="search" size={19} /><input aria-label="Search all menu items" placeholder="Find your favourite — try paneer, biryani, naan…" value={search} onChange={(event) => { setSearch(event.target.value); setVisibleCount(PAGE_SIZE); }} />{search && <button aria-label="Clear menu search" onClick={() => { setSearch(""); setVisibleCount(PAGE_SIZE); }}><Icon name="close" size={17} /></button>}</div><label className="diet-select"><span>Show</span><select aria-label="Dietary preference" value={diet} onChange={(event) => { setDiet(event.target.value); setVisibleCount(PAGE_SIZE); }}><option>Everything</option><option>Vegetarian only</option><option>Non-vegetarian only</option></select></label></div>
      <div className="category-tabs" aria-label="Menu categories">{["All", ...categories].map((name) => <button className={category === name ? "active" : ""} aria-pressed={category === name} key={name} onClick={() => { setCategory(name as Category | "All"); setVisibleCount(PAGE_SIZE); }}>{name === "All" ? "All dishes" : name}<span>{name === "All" ? menu.length : menu.filter((dish) => dish.category === name).length}</span></button>)}</div>
      <div className="menu-meta"><span aria-live="polite">Showing {visibleDishes.length} of {filtered.length} matching dishes</span><span><i className="diet-dot veg" /> Vegetarian <i className="diet-dot nonveg" /> Non-vegetarian</span></div>
      <div className="menu-results" key={`${category}-${diet}-${search}`}>
        {activeGroups.map((group, index) => (
          <section className="menu-group" key={group.name} style={{ animationDelay: `${index * 45}ms` }} aria-label={`${group.name} dishes`}>
            <div className="menu-group-heading"><span className="menu-group-number">0{categories.indexOf(group.name) + 1}</span><div><h3>{group.name}</h3><p>{descriptions[group.name]}</p></div><Icon name={group.name === "Breads" ? "utensils" : "spark"} size={26} /></div>
            <div className="menu-items">
              {group.dishes.map((dish, dishIndex) => {
                const presentation = getMenuPresentation(dish);
                return (
                  <article className="menu-item" key={dish.name} style={{ animationDelay: `${(dishIndex % 6) * 55}ms` }}>
                    <div className="menu-card-image"><img src={presentation.image} srcSet={`${presentation.image.replace(".webp", "-160.webp")} 160w, ${presentation.image.replace(".webp", "-320.webp")} 320w, ${presentation.image} 768w`} sizes="(max-width: 370px) 72px, (max-width: 650px) 86px, (max-width: 1000px) 132px, (max-width: 1150px) 106px, 124px" alt="" width="768" height="768" loading="lazy" decoding="async" /></div>
                    <div className="menu-card-body">
                      <div className="menu-card-title"><h4>{dish.name}</h4><span className="menu-price">₹{dish.price}</span></div>
                      <p className="menu-card-description">{presentation.description}</p>
                      <span className="menu-card-diet"><span className={`diet-marker ${dish.veg ? "veg" : "nonveg"}`} aria-hidden="true"><i /></span>{dish.veg ? "Vegetarian" : "Non-vegetarian"}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        {!filtered.length && <div className="menu-empty"><Icon name="search" size={30} /><h3>A different craving?</h3><p>No dishes match these filters. Try another search or browse the menu.</p><button className="button button-dark" onClick={() => { setSearch(""); setCategory("All"); setDiet("Everything"); setVisibleCount(PAGE_SIZE); }}>Reset menu filters <Icon name="arrow" size={17} /></button></div>}
      </div>
      {!!filtered.length && <div className="menu-pagination"><div><p>{remaining > 0 ? "There’s more to discover." : "You’ve explored this selection."}</p><span>{remaining > 0 ? `${remaining} more ${remaining === 1 ? "dish" : "dishes"} in this selection` : "Try another category for your next craving."}</span></div><div>{visibleDishes.length > PAGE_SIZE && <button className="text-link menu-show-less" onClick={() => setVisibleCount(PAGE_SIZE)}>Show fewer</button>}{remaining > 0 && <button className="button button-outline" onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))}>Show {Math.min(PAGE_SIZE, remaining)} more {remaining === 1 ? "dish" : "dishes"} <Icon name="arrow" size={17} /></button>}</div></div>}
      <div className="catalog-bottom"><p>Prices in Indian rupees. Please confirm current prices and availability when ordering.<br />A little spicy? Extra buttery? Tell us how you like it.</p><a className="button button-dark" href="tel:+919241289990"><Icon name="phone" size={17} /> Call to order</a></div>
    </div>
  </section>;
}
