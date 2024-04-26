import fetch from "isomorphic-unfetch";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function getLatLon(desa: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${desa}, Indonesia&format=json`
    );
    const data = await response.json();

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}
