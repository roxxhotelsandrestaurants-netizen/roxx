import { Icon } from "./icons";

const signatures = [
  { name: "Chicken Dum Biryani", image: "biryani-hq", price: "279", description: "Aromatic rice, warming spices, and the kind of comfort you come back for.", label: "THE COMFORT CLASSIC", veg: false },
  { name: "Paneer Makhan Wala", image: "paneer-hq", price: "349", description: "Our ROXX special. Rich, creamy, and made for one more piece of naan.", label: "ROXX SPECIAL", veg: true },
  { name: "Chicken Butter Masala", image: "chicken-hq", price: "339", description: "A little buttery. A whole lot of flavour. An Indian favourite for your table.", label: "A CURRY TO COME BACK FOR", veg: false },
  { name: "The Dragon Paneer", image: "dragon-paneer-hq", price: "289", description: "Bold, fiery, and full of character. The perfect beginning to your evening.", label: "TURN UP THE FLAVOUR", veg: true },
];

function FoodPhoto({ image, name, featured = false }: { image: string; name: string; featured?: boolean }) {
  return <img
    src={`/images/dining/${image}.webp`}
    srcSet={`/images/dining/${image}-320.webp 320w, /images/dining/${image}-600.webp 600w, /images/dining/${image}.webp 1200w`}
    sizes={featured ? "(max-width: 650px) 90vw, (max-width: 900px) 44vw, 42vw" : "(max-width: 650px) 104px, 144px"}
    alt={name}
    width="1200"
    height="800"
    loading="lazy"
    decoding="async"
  />;
}

export function SignatureDishes() {
  const [featured, ...others] = signatures;
  return <section className="signature-section" id="signatures">
    <div className="container">
      <div className="signature-heading" data-reveal>
        <div><p className="eyebrow"><Icon name="spark" size={16} /> THE ROXX SIGNATURES</p><h2>Some flavours<br /><em>stay with you.</em></h2></div>
        <div><p>A little indulgence. A familiar favourite.<br />Something worth making an evening of.</p><a href="#full-menu" className="text-link">Explore every flavour <Icon name="arrow" size={19} /></a></div>
      </div>
      <div className="signature-layout">
        <article className="signature-feature" data-reveal>
          <a href="#full-menu" className="signature-feature-photo" aria-label={`Explore the menu including ${featured.name}`}><FoodPhoto image={featured.image} name={featured.name} featured /><span className="signature-photo-note">01 · THE COMFORT CLASSIC</span></a>
          <div className="signature-feature-caption"><div><p className="signature-kicker">AROMATIC. GENEROUS. UNMISTAKABLY ROXX.</p><h3>{featured.name}</h3></div><span className="signature-price">₹{featured.price}</span></div>
          <p className="signature-feature-description">{featured.description}</p>
          <span className="signature-diet"><i className="diet-dot nonveg" /> Non-vegetarian</span>
        </article>
        <div className="signature-selection">
          {others.map((dish, index) => <article className="signature-row" key={dish.name} data-reveal>
            <a className="signature-row-photo" href="#full-menu" aria-label={`Explore the menu including ${dish.name}`}><FoodPhoto image={dish.image} name={dish.name} /></a>
            <div className="signature-row-copy"><p className="signature-kicker"><span>0{index + 2}</span> {dish.label}</p><div className="signature-row-title"><h3>{dish.name}</h3><span className="signature-price">₹{dish.price}</span></div><p>{dish.description}</p><span className="signature-diet"><i className={`diet-dot ${dish.veg ? "veg" : "nonveg"}`} />{dish.veg ? "Vegetarian" : "Non-vegetarian"}</span></div>
          </article>)}
          <a className="signature-invitation" href="#full-menu"><span>Good food is always<br /><em>a good idea.</em></span><span className="signature-invitation-arrow"><Icon name="arrow" size={25} /></span></a>
        </div>
      </div>
    </div>
  </section>;
}
