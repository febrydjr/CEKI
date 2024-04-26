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

const From = ({
  onFetchProvinsi1,
  onFetchKota1,
  onFetchKecamatan1,
  onFetchDesa1,
}) => {
  useEffect(() => {
    onFetchProvinsi1(fetchProvinsi1);
    onFetchKota1(fetchKota1);
    onFetchKecamatan1(fetchKecamatan1);
    onFetchDesa1(fetchDesa1);
  }, [onFetchProvinsi1, onFetchKota1, onFetchKecamatan1, onFetchDesa1]);

  // State for Provinsi 1
  const [fetchprovinsi1, setfetchProvinsi1] = useState([]);
  const [fetchkota1, setfetchKota1] = useState([]);
  const [fetchkecamatan1, setfetchKecamatan1] = useState([]);
  const [fetchdesa1, setfetchDesa1] = useState([]);

  // State variables for Provinsi 1
  const [provinsi1, setProvinsi1] = useState("");
  const [kota1, setKota1] = useState("");
  const [kecamatan1, setKecamatan1] = useState("");
  const [desa1, setDesa1] = useState("");

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
  useEffect(() => {
    fetchProvinsi1();
    fetchKota1();
    fetchKecamatan1();
    fetchDesa1();
  }, [provinsi1, kota1, kecamatan1]);

  return (
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
  );
};

export default From;
