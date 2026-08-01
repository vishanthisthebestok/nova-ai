import React from "react";

export function Image({ src, alt, className, fittingType = "cover" }) {
  return <img src={src} alt={alt} className={className} style={{ objectFit: fittingType }} />;
}
