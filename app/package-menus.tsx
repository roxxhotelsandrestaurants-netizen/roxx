"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./icons";
import { vegPackages } from "./veg-packages";

const packagePhotos = [
  { stem: "paneer", alt: "Illustrative paneer curry garnished with coriander in a copper serving bowl" },
  { stem: "vegetables", alt: "Illustrative mixed vegetable curry in a copper serving bowl" },
  { stem: "veg-biryani", alt: "Illustrative fragrant vegetable rice with peas, carrots and cauliflower" },
  { stem: "bread", alt: "Illustrative dal makhani with freshly baked naan on a dark wooden table" },
];

function PackagePhoto({ index, className, decorative = false }: { index: number; className?: string; decorative?: boolean }) {
  const photo = packagePhotos[index];
  return <img
    className={className}
    src={`/images/dining/${photo.stem}-hq.webp`}
    srcSet={`/images/dining/${photo.stem}-hq-320.webp 320w, /images/dining/${photo.stem}-hq-600.webp 600w, /images/dining/${photo.stem}-hq.webp 1200w`}
    sizes={decorative ? "70px" : "(max-width: 650px) 90vw, (max-width: 900px) 48vw, 540px"}
    alt={decorative ? "" : photo.alt}
    width="1200"
    height="800"
    loading="lazy"
    decoding="async"
  />;
}

export function PackageMenus() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = vegPackages[selected];
  const message = `Hi ROXX, I’d like to enquire about the ${current.name} menu package at ₹${current.price.toLocaleString("en-IN")} plus tax. Please share availability, customisation options and booking details.`;
  const whatsapp = `https://wa.me/919241289990?text=${encodeURIComponent(message)}`;

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % vegPackages.length;
    else if (event.key === "ArrowLeft") next = (index + vegPackages.length - 1) % vegPackages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = vegPackages.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return <section id="veg-packages" className="package-section section-space" aria-labelledby="package-heading">
    <div className="package-background" aria-hidden="true"><Icon name="leaf" size={280} /><Icon name="leaf" size={200} /></div>
    <div className="container">
      <div className="package-heading">
        <div className="package-heading-copy">
          <p className="eyebrow"><Icon name="leaf" size={18} /> VEGETARIAN MENU PACKAGES</p>
          <h2 id="package-heading">A menu for your<br /><em>kind of celebration.</em></h2>
          <p>Four ways to bring everyone together.<br />Choose your favourites. Make it your own.</p>
          <span className="package-heading-note"><Icon name="spark" size={16} /> GOOD FOOD. GOOD MOOD. GOOD TIME.</span>
        </div>
        <div className="package-feast">
          <div className="package-feast-main"><PackagePhoto index={0} /></div>
          <div className="package-feast-inset"><PackagePhoto index={3} /></div>
          <div className="package-veg-seal"><Icon name="leaf" size={25} /><span>VEGETARIAN</span><strong>A little<br />more joy.</strong><span>ON EVERY TABLE</span></div>
          <span className="package-feast-caption">A FEAST WORTH GATHERING FOR <span /></span>
        </div>
      </div>
      <div className="package-tabs" role="tablist" aria-label="Vegetarian menu packages">
        {vegPackages.map((item, index) => <button key={item.id} ref={(node) => { tabs.current[index] = node; }} id={`package-tab-${item.id}`} role="tab" aria-selected={selected === index} aria-controls={`package-panel-${item.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => navigate(event, index)}>
          <span className="package-tab-top"><PackagePhoto index={index} decorative /><span className="package-tab-name"><small>0{index + 1}</small>{item.name}</span></span>
          <strong>₹{item.price.toLocaleString("en-IN")}<small>plus tax</small></strong><span className="package-tab-action">{selected === index ? "Your selected menu" : "Explore this menu"}<Icon name={selected === index ? "check" : "diagonal"} size={17} /></span>
        </button>)}
      </div>
      {vegPackages.map((item, index) => <div key={item.id} className="package-details" id={`package-panel-${item.id}`} role="tabpanel" aria-labelledby={`package-tab-${item.id}`} hidden={selected !== index} tabIndex={0}>
        <div className="package-details-copy">
          <div className="package-selected-photo"><PackagePhoto index={index} /><span><Icon name="leaf" size={13} /> A VEGETARIAN CELEBRATION</span></div>
          <p className="eyebrow">YOUR SELECTED SPREAD</p><h3>{item.name}</h3><p>Good food. Good mood. Good time.<br />A thoughtful spread for your next gathering.</p><p className="package-customise">Menu items can be customised<br />as per your requirement.</p><a className="button button-gold" href={whatsapp} target="_blank" rel="noopener noreferrer">Enquire about {item.name}<Icon name="whatsapp" size={19} /></a><a className="package-call" href="tel:+918292839087">Or call +91 82928 39087 <Icon name="diagonal" size={13} /></a>
        </div>
        <div className="package-inclusions"><div className="package-list-labels" aria-hidden="true"><span>WHAT’S INCLUDED</span><span>QTY</span></div><ul>{item.items.map((entry) => <li key={entry.name}><span>{entry.name}</span><span><span className="sr-only">Quantity </span>{entry.quantity}</span></li>)}</ul></div>
      </div>)}
      <div className="package-footnote"><p>All package prices are plus tax.<br />Please confirm current pricing and arrangements with our team.</p><details className="package-original"><summary>View original package menu <Icon name="diagonal" size={16} /></summary><a href="/menu/veg-menu-packages.jpeg" target="_blank" rel="noreferrer"><img src="/menu/veg-menu-packages.jpeg" alt="Original ROXX vegetarian menu packages poster: Veg Simple ₹499, Veg Silver ₹599, Veg Gold ₹799 and Veg Platinum ₹1099, all plus tax, with item quantities" width="853" height="1280" loading="lazy" /><span>Open full-size poster <Icon name="diagonal" size={14} /></span></a></details></div>
    </div>
  </section>;
}
