// src/components/visual/MapPreview.tsx
import React from "react";

/**
 * MapPreview - preview simples de mapa.
 * - Se lat/lng fornecidos, renderiza iframe do Google Maps (embeddable)
 * - Caso contrário, mostra um placeholder.
 *
 * Observação: para uso em produção, considere usar Leaflet/Mapbox com API key.
 */

type Props = {
  lat?: number | null;
  lng?: number | null;
  zoom?: number;
  width?: string | number;
  height?: string | number;
  markerLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function MapPreview({
  lat,
  lng,
  zoom = 12,
  width = "100%",
  height = 300,
  markerLabel,
  className,
  style,
}: Props) {
  // usar nullish check para que 0 seja aceito como coordenada válida
  const missing = lat == null || lng == null;

  const wrapperStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid #eee",
    ...style,
  };

  if (missing) {
    const placeholderStyle: React.CSSProperties = {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      border: "1px dashed #ddd",
      background: "#fafafa",
      color: "#666",
      fontSize: 14,
      textAlign: "center",
      padding: 8,
    };

    return (
      <div className={className} style={{ width, height }}>
        <div style={placeholderStyle}>Sem geolocalização disponível</div>
      </div>
    );
  }

  // montar URL embed do Google Maps (simples)
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    `${lat},${lng}`
  )}&z=${zoom}&output=embed`;

  return (
    <div className={className} style={wrapperStyle}>
      <iframe
        title={markerLabel ?? "map-preview"}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
