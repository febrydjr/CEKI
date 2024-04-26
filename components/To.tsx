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
  Typography,
} from "@mui/material";

const To = () => {
  // State for Provinsi 2
  const [fetchprovinsi2, setfetchProvinsi2] = useState([]);
  const [fetchkota2, setfetchKota2] = useState([]);
  const [fetchkecamatan2, setfetchKecamatan2] = useState([]);
  const [fetchdesa2, setfetchDesa2] = useState([]);

  // State variables for Provinsi 2
  const [provinsi2, setProvinsi2] = useState("");
  const [kota2, setKota2] = useState("");
  const [kecamatan2, setKecamatan2] = useState("");
  const [desa2, setDesa2] = useState("");
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
    fetchProvinsi2(); // Fetch initial data for Provinsi 2
    fetchKota2();
    fetchKecamatan2();
    fetchDesa2();
  }, [provinsi2, kota2, kecamatan2]); // Triggered when Provinsi 2, Kota/Kabupaten 2, or Kecamatan 2 changes

  return (
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
  );
};

export default To;
