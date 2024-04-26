import React, { useRef, useState } from "react";
import { ArrowForwardIos, Commit, East, West } from "@mui/icons-material";
import { useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { getLatLon, Coordinates } from "../utils/getLatLon";
import { calculateDistance } from "../utils/calculateDistance";

const Index = () => {
  const useResultRef = useRef<HTMLDivElement>(null);

  // State for Provinsi 1
  const [fetchprovinsi1, setfetchProvinsi1] = useState([]);
  const [fetchkota1, setfetchKota1] = useState([]);
  const [fetchkecamatan1, setfetchKecamatan1] = useState([]);
  const [fetchdesa1, setfetchDesa1] = useState([]);

  // State for Provinsi 2
  const [fetchprovinsi2, setfetchProvinsi2] = useState([]);
  const [fetchkota2, setfetchKota2] = useState([]);
  const [fetchkecamatan2, setfetchKecamatan2] = useState([]);
  const [fetchdesa2, setfetchDesa2] = useState([]);

  // State variables for Provinsi 1
  const [provinsi1, setProvinsi1] = useState("");
  const [kota1, setKota1] = useState("");
  const [kecamatan1, setKecamatan1] = useState("");
  const [desa1, setDesa1] = useState("");

  // State variables for Provinsi 2
  const [provinsi2, setProvinsi2] = useState("");
  const [kota2, setKota2] = useState("");
  const [kecamatan2, setKecamatan2] = useState("");
  const [desa2, setDesa2] = useState("");
  const desa1Name = fetchdesa1.find((desa) => desa.id === desa1)?.name;
  const desa2Name = fetchdesa2.find((desa) => desa.id === desa2)?.name;

  const [coordinates1, setCoordinates1] = useState<Coordinates | null>(null);
  const [coordinates2, setCoordinates2] = useState<Coordinates | null>(null);

  const handleCekiButtonClick = () => {
    if (useResultRef.current) {
      useResultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const fetchCoordinates1 = async () => {
    if (desa1Name) {
      const coords = await getLatLon(desa1Name);
      setCoordinates1(coords);
    } else {
      setCoordinates1(null);
    }
  };
  const fetchCoordinates2 = async () => {
    if (desa2Name) {
      const coords = await getLatLon(desa2Name);
      setCoordinates2(coords);
    } else {
      setCoordinates2(null);
    }
  };

  const CheckDistance = () => {
    const village1Coordinates = {
      latitude: coordinates1?.latitude,
      longitude: coordinates1?.longitude,
    };
    const village2Coordinates = {
      latitude: coordinates2?.latitude,
      longitude: coordinates2?.longitude,
    };

    const distance = calculateDistance(
      village1Coordinates.latitude,
      village1Coordinates.longitude,
      village2Coordinates.latitude,
      village2Coordinates.longitude
    );
    return distance;
  };

  const handleAlert = () => {
    alert(
      `Distance between ${desa1Name} and ${desa2Name}: ${CheckDistance().toFixed(
        2
      )} km`
    );
  };

  // Fetching Provinsi 1 data
  const fetchProvinsi1 = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setfetchProvinsi1(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fetching Kota/Kabupaten 1 data
  const fetchKota1 = async () => {
    if (provinsi1) {
      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi1}.json`
        );
        setfetchKota1(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setfetchKota1([]);
    }
  };

  // Fetching Kecamatan 1 data
  const fetchKecamatan1 = async () => {
    if (kota1) {
      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kota1}.json`
        );
        setfetchKecamatan1(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    } else {
      setfetchKecamatan1([]);
    }
  };

  // Fetching Desa/Kelurahan 1 data
  const fetchDesa1 = async () => {
    if (kecamatan1) {
      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan1}.json`
        );
        setfetchDesa1(response.data);
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    } else {
      setfetchDesa1([]);
    }
  };

  // Fetching Provinsi 2 data
  const fetchProvinsi2 = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setfetchProvinsi2(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fetching Kota/Kabupaten 2 data
  const fetchKota2 = async () => {
    if (provinsi2) {
      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi2}.json`
        );
        setfetchKota2(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setfetchKota2([]);
    }
  };

  // Fetching Kecamatan 2 data
  const fetchKecamatan2 = async () => {
    if (kota2) {
      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kota2}.json`
        );
        setfetchKecamatan2(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    } else {
      setfetchKecamatan2([]);
    }
  };

  // Fetching Desa/Kelurahan 2 data
  const fetchDesa2 = async () => {
    if (kecamatan2) {
      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan2}.json`
        );
        setfetchDesa2(response.data);
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    } else {
      setfetchDesa2([]);
    }
  };

  useEffect(() => {
    fetchProvinsi1();
    fetchProvinsi2();
    fetchKota1();
    fetchKota2();
    fetchKecamatan1();
    fetchKecamatan2();
    fetchDesa1();
    fetchDesa2();
    fetchCoordinates1();
    fetchCoordinates2();
  }, [
    provinsi1,
    provinsi2,
    kota1,
    kota2,
    kecamatan1,
    kecamatan2,
    desa1Name,
    desa2Name,
  ]);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"}>
        <img width={650} src="/CEKI.gif" alt="Cekdist Logo"></img>
      </Box>
      <Box display={"flex"} mt={3} justifyContent={"center"}>
        <Typography
          variant="h5"
          textAlign={"center"}
          fontFamily="Outfit"
          color="text.primary"
        >
          Instrumen mempesona yang dianugerahi dengan kemampuan mistis untuk{" "}
          <br />
          memastikan pemisahan spasial antara dua titik yang ditentukan.
        </Typography>
      </Box>
      <Box display={"flex"} mt={6} justifyContent={"center"}>
        <Box display={"flex"} mr={4} flexDirection={"column"}>
          <FormControl sx={{ width: 350 }} fullWidth focused>
            <InputLabel color="secondary">Provinsi 1</InputLabel>
            <Select
              value={provinsi1}
              onChange={(event) => {
                setProvinsi1(event.target.value);
                setKota1("");
                setKecamatan1("");
                setDesa1("");
              }}
              color="secondary"
              label="Provinsi 1"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchprovinsi1.map((prov: any) => (
                <MenuItem
                  key={prov.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={prov.id}
                >
                  {prov.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth focused>
            <InputLabel color="secondary">Kota/Kabupaten 1</InputLabel>
            <Select
              value={kota1}
              onChange={(event) => {
                setKota1(event.target.value);
                setKecamatan1("");
                setDesa1("");
              }}
              color="secondary"
              label="Kota/Kabupaten 1"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchkota1.map((kota: any) => (
                <MenuItem
                  key={kota.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={kota.id}
                >
                  {kota.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth focused>
            <InputLabel color="secondary">Kecamatan 1</InputLabel>
            <Select
              value={kecamatan1}
              onChange={(event) => setKecamatan1(event.target.value)}
              color="secondary"
              label="Kecamatan 1"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchkecamatan1.map((kota: any) => (
                <MenuItem
                  key={kota.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={kota.id}
                >
                  {kota.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth focused>
            <InputLabel color="secondary">Desa/Kelurahan 1</InputLabel>
            <Select
              value={desa1}
              onChange={(event) => setDesa1(event.target.value)}
              color="secondary"
              label="Desa/Kelurahan 1"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchdesa1.map((kota: any) => (
                <MenuItem
                  key={kota.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={kota.id}
                >
                  {kota.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowForwardIos fontSize="large" />
        </Box>
        <Box ml={4} display={"flex"} flexDirection={"column"}>
          <FormControl sx={{ width: 350 }} fullWidth focused>
            <InputLabel color="secondary">Provinsi 2</InputLabel>
            <Select
              value={provinsi2}
              onChange={(event) => {
                setProvinsi2(event.target.value);
                setKota2("");
                setKecamatan2("");
                setDesa2("");
              }}
              color="secondary"
              label="Provinsi 2"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchprovinsi2.map((prov: any) => (
                <MenuItem
                  key={prov.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={prov.id}
                >
                  {prov.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth focused>
            <InputLabel color="secondary">Kota/Kabupaten 2</InputLabel>
            <Select
              value={kota2}
              onChange={(event) => {
                setKota2(event.target.value);
                setKecamatan2("");
                setDesa2("");
              }}
              color="secondary"
              label="Kota/Kabupaten 2"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchkota2.map((kota: any) => (
                <MenuItem
                  key={kota.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={kota.id}
                >
                  {kota.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth focused>
            <InputLabel color="secondary">Kecamatan 2</InputLabel>
            <Select
              value={kecamatan2}
              onChange={(event) => setKecamatan2(event.target.value)}
              color="secondary"
              label="Kecamatan 2"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchkecamatan2.map((kota: any) => (
                <MenuItem
                  key={kota.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={kota.id}
                >
                  {kota.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth focused>
            <InputLabel color="secondary">Desa/Kelurahan 2</InputLabel>
            <Select
              value={desa2}
              onChange={(event) => setDesa2(event.target.value)}
              color="secondary"
              label="Desa/Kelurahan 2"
              sx={{ fontFamily: "Outfit", color: "text.primary" }}
            >
              {fetchdesa2.map((kota: any) => (
                <MenuItem
                  key={kota.id}
                  sx={{ fontFamily: "Outfit", color: "black" }}
                  value={kota.id}
                >
                  {kota.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box mt={2} display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            handleCekiButtonClick();
            // handleAlert();
          }}
          sx={{
            fontFamily: "Outfit",
            width: 300,
            fontSize: 20,
          }}
        >
          CEKI
        </Button>
      </Box>

      <Box mt={8.5} mb={10} display={"flex"} justifyContent={"center"}>
        <Box
          ref={useResultRef}
          borderRadius={"20px"}
          bgcolor={"#231F20"}
          maxWidth={"1000px"}
          minWidth={"300px"}
          height={"250px"}
        >
          <Box display={"flex"} justifyContent={"flex-start"} mt={1}>
            <Typography
              p={4}
              py={2}
              variant="h5"
              fontFamily="Outfit"
              color="#12B5E5"
            >
              useResult
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography pl={4} py={0} variant="h5" fontFamily="Outfit">
              {desa1Name || "Desa 1"}
            </Typography>
            <Typography
              ml={2}
              mt={0.7}
              variant="h6"
              fontFamily="Outfit"
              color="#12B5E5"
            >
              <West />
              <Commit />
              <East />
            </Typography>
            <Typography ml={2} pr={4} variant="h5" fontFamily={"Outfit"}>
              {desa2Name || "Desa 2"}
            </Typography>
          </Box>
          <Box mt={2} display={"flex"} justifyContent={"center"}>
            <Typography pl={4} variant="h4" fontFamily="Outfit" color="#12B5E5">
              ≈
            </Typography>
            <Typography pl={1} variant="h4" fontFamily={"Outfit"}>
              {CheckDistance() ? (
                CheckDistance().toFixed(2)
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <Typography ml={1} variant="h4">
              Km
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography pl={4} variant="h4" fontFamily="Outfit" color="#12B5E5">
              ≈
            </Typography>
            <Typography pl={1} variant="h4" fontFamily={"Outfit"}>
              {CheckDistance() ? (
                (CheckDistance() * 1000).toFixed(2)
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>

            <Typography ml={1} variant="h4">
              m
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
