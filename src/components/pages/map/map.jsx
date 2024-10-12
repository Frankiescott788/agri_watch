// src/App.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
} from "@nextui-org/react";

// Custom icon for markers
const defaultIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"), // Normal marker icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Coordinates for multiple farms around Laberry Farm
const farmerLocations = [
  {
    name: "Laberry Farm",
    address: "66 Shuma St, Block J, Thohoyandou, 0950",
    location: [-22.9518, 30.4711],
    crops: ["Maize", "Potatoes", "Spinach"],
    status: "Healthy",
  },
  {
    name: "Nearby Farm 1",
    address: "Thohoyandou, 0950",
    location: [-22.952, 30.4715],
    crops: ["Tomatoes", "Onions"],
    status: "Danger",
  },
  {
    name: "Nearby Farm 2",
    address: "Thohoyandou, 0950",
    location: [-22.9515, 30.472],
    crops: ["Carrots", "Cabbage"],
    status: "Healthy",
  },
  {
    name: "Nearby Farm 3",
    address: "Thohoyandou, 0950",
    location: [-22.9525, 30.4705],
    crops: ["Beans", "Peas"],
    status: "Danger",
  },
  {
    name: "Nearby Farm 4",
    address: "Thohoyandou, 0950",
    location: [-22.9505, 30.471],
    crops: ["Pumpkins", "Squash"],
    status: "Healthy",
  },
  {
    name: "Nearby Farm 5",
    address: "Thohoyandou, 0950",
    location: [-22.95, 30.4715],
    crops: ["Lettuce", "Zucchini"],
    status: "Healthy",
  },
  {
    name: "Nearby Farm 6",
    address: "Thohoyandou, 0950",
    location: [-22.953, 30.4725],
    crops: ["Radishes", "Kale"],
    status: "Danger",
  },
  {
    name: "Nearby Farm 7",
    address: "Thohoyandou, 0950",
    location: [-22.9495, 30.47],
    crops: ["Garlic", "Onions"],
    status: "Healthy",
  },
  {
    name: "Nearby Farm 8",
    address: "Thohoyandou, 0950",
    location: [-22.954, 30.4712],
    crops: ["Beets", "Chard"],
    status: "Danger",
  },
  {
    name: "Nearby Farm 9",
    address: "Thohoyandou, 0950",
    location: [-22.9502, 30.4722],
    crops: ["Eggplants", "Bell Peppers"],
    status: "Healthy",
  },
];

const FarmerMap = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <h1>Farmer Mapping Intelligence</h1>
          <Card>
          <MapContainer
            center={[-22.9518, 30.4711]}
            zoom={18}
            zoomControl={false} // Disable zoom control buttons
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {farmerLocations.map((farmer, index) => (
              <Marker key={index} position={farmer.location} icon={defaultIcon}>
                <Popup>
                  <h2>{farmer.name}</h2>
                  <p>Address: {farmer.address}</p>
                  <p>Crops: {farmer.crops.join(", ")}</p>
                  <p>Status: <span className={`${farmer.status === 'Healthy' ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} text-tiny px-1 rounded-full`}>{farmer.status}</span></p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          </Card>
        </div>
        <div className="col-span-4">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Location</TableColumn>
              <TableColumn>Crops</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
                {farmerLocations.map((farm, i ) => (
                     <TableRow key={i}>
                     <TableCell>{farm.name}</TableCell>
                     <TableCell>{farm.crops.join(", ")}</TableCell>
                     <TableCell><p className={`${farm.status === 'Healthy' ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} text-tiny px-1 rounded-full`}> {farm.status} </p></TableCell>
                   </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FarmerMap;
