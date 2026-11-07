"use client";

import { useRef, useState } from "react";
import { Icon } from "./icons";

const photos = [
  { number: 1, title: "A warm welcome", alt: "ROXX reception with its illuminated horse mosaic, marble counter and gold crest", width: 1086, height: 1448 },
  { number: 2, title: "Made for celebration", alt: "ROXX birthday setting with colourful flowers, a Happy Birthday sign and a woven chair", width: 1086, height: 1448 },
  { number: 3, title: "Room for everyone", alt: "ROXX gathering space with pink sofas, burgundy chairs and gold chandeliers", width: 1086, height: 1448 },
  { number: 4, title: "Your favourite corner", alt: "ROXX dining room with cream booths, wooden chairs and polished black tables", width: 1051, height: 1496 },
];

export function VenueGallery() {
  const viewer = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const photo = photos[selected];

  function changePhoto(direction: number) {
    setSelected((index) => (index + direction + photos.length) % photos.length);
  }

  return <section id="venue-gallery" className="venue-gallery section-space" aria-labelledby="venue-gallery-title">
    <div className="container">
      <div className="section-heading venue-gallery-heading">
        <div><p className="eyebrow"><Icon name="spark" size={17} /> STEP INSIDE ROXX</p><h2 id="venue-gallery-title">A place for <em>your moments.</em></h2></div>
        <p>A glimpse of our spaces.<br />From your first hello to your next celebration.</p>
      </div>
      <div className="venue-gallery-photos">
        {photos.map((item, index) => <figure key={item.number}>
          <button className="venue-photo-open" aria-label={`View photo: ${item.title}`} onClick={() => { setSelected(index); viewer.current?.showModal(); }}>
            <img src={`/images/venue/roxx-${item.number}-enhanced.webp`} srcSet={`/images/venue/roxx-${item.number}-enhanced-360.webp 360w, /images/venue/roxx-${item.number}-enhanced-600.webp 600w, /images/venue/roxx-${item.number}-enhanced.webp ${item.width}w`} sizes={`(max-width: 650px) ${index === 0 || index === 3 ? "90vw" : "44vw"}, ${index === 0 || index === 2 ? "61vw" : "32vw"}`} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
            <span className="venue-photo-expand" aria-hidden="true"><Icon name="diagonal" size={19} /></span>
          </button>
          <figcaption><span>0{index + 1}</span>{item.title}</figcaption>
        </figure>)}
      </div>
    </div>
    <dialog ref={viewer} className="venue-photo-dialog" aria-labelledby="venue-photo-title" onClick={(event) => { if (event.target === event.currentTarget) viewer.current?.close(); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); changePhoto(-1); } if (event.key === "ArrowRight") { event.preventDefault(); changePhoto(1); } }}>
      <div className="venue-photo-toolbar"><h3 id="venue-photo-title">{photo.title}</h3><button className="close-button" aria-label="Close venue photo" onClick={() => viewer.current?.close()}><Icon name="close" size={23} /></button></div>
      <img className="venue-photo-full" src={`/images/venue/roxx-${photo.number}-enhanced.webp`} alt={photo.alt} width={photo.width} height={photo.height} />
      <div className="venue-photo-controls"><button aria-label="Previous venue photo" onClick={() => changePhoto(-1)}><Icon name="arrow" size={21} /></button><span aria-live="polite">{selected + 1} / {photos.length}</span><button aria-label="Next venue photo" onClick={() => changePhoto(1)}><Icon name="arrow" size={21} /></button></div>
    </dialog>
  </section>;
}
