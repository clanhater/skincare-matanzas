"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen Principal */}
      <div className="relative aspect-[4/5] w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-primary-100">
        <Image
          src={selectedImage}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>

      {/* Miniaturas (Scroll Horizontal Optimizado para Móvil) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all snap-start ${
                selectedImage === img
                  ? "border-primary-900 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} vista ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}