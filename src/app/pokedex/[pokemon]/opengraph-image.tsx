import { ImageResponse } from "next/og";

import { pokemonService, PokemonServiceError } from "@/lib/pokemon";

export const alt = "PokeAtlas Pokemon profile preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type PokemonOgImageProps = {
  params: Promise<{ pokemon: string }>;
};

export default async function OpenGraphImage({
  params,
}: PokemonOgImageProps) {
  const { pokemon } = await params;

  try {
    const detail = await pokemonService.getDetail(pokemon);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            background:
              "radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 28%), linear-gradient(135deg, #07111f 0%, #0f172a 55%, #172554 100%)",
            color: "#f8fafc",
            fontFamily: "Arial, sans-serif",
            padding: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              borderRadius: "32px",
              border: "1px solid rgba(148, 163, 184, 0.28)",
              background: "rgba(15, 23, 42, 0.82)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "44px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    fontSize: "24px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#7dd3fc",
                  }}
                >
                  <span>PokeAtlas</span>
                  <span style={{ color: "rgba(226, 232, 240, 0.45)" }}>•</span>
                  <span>{detail.dexNumber}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "72px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {detail.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {detail.types.map((type) => (
                      <div
                        key={type.slug}
                        style={{
                          display: "flex",
                          borderRadius: "999px",
                          border: "1px solid rgba(125, 211, 252, 0.35)",
                          background: "rgba(14, 165, 233, 0.12)",
                          padding: "10px 18px",
                          fontSize: "24px",
                          color: "#e0f2fe",
                        }}
                      >
                        {type.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    maxWidth: "560px",
                    fontSize: "28px",
                    lineHeight: 1.4,
                    color: "#cbd5e1",
                  }}
                >
                  {detail.flavorText ??
                    `Inspect ${detail.name}'s profile, core stats, species context, and evolution cues in PokeAtlas.`}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "28px",
                  fontSize: "22px",
                  color: "#94a3b8",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: "#e2e8f0" }}>Height</span>
                  <span>{detail.heightMeters} m</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: "#e2e8f0" }}>Weight</span>
                  <span>{detail.weightKilograms} kg</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: "#e2e8f0" }}>Abilities</span>
                  <span>{detail.abilities.length}</span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "360px",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(circle at center, rgba(125, 211, 252, 0.18), transparent 58%), linear-gradient(180deg, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.9))",
                padding: "36px",
              }}
            >
              {detail.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={detail.imageUrl}
                  alt={detail.name}
                  width="280"
                  height="280"
                  style={{
                    objectFit: "contain",
                    filter: "drop-shadow(0 24px 30px rgba(15, 23, 42, 0.55))",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    height: "280px",
                    width: "280px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "36px",
                    border: "1px dashed rgba(148, 163, 184, 0.5)",
                    color: "#cbd5e1",
                    fontSize: "28px",
                  }}
                >
                  Artwork unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      size,
    );
  } catch (error) {
    const title =
      error instanceof PokemonServiceError && error.status === 404
        ? "Pokemon not found"
        : "Pokemon profile preview";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #07111f 0%, #0f172a 55%, #172554 100%)",
            color: "#f8fafc",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7dd3fc",
              }}
            >
              PokeAtlas
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "56px",
                fontWeight: 700,
              }}
            >
              {title}
            </div>
          </div>
        </div>
      ),
      size,
    );
  }
}
