import React, { FC, useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Button } from "../../buttons/Button";
import { IconButton } from "../../buttons/IconButton";
import { DialogPanel } from "../../content/DialogPanel";
import { Dialog } from "../../content/Dialog";
import { TextInput } from "../../inputs/TextInput";
import { Stack } from "../../layout/Stack";
import { Layer } from "../../layout/Layer";
import { SearchInput } from "../../inputs/SearchInput";
import { Checkbox } from "../../inputs/Checkbox";
import { Tooltip } from "../../content/Tooltip";
import { SelectInput } from "../../inputs/SelectInput";

export default {
  title: "Examples/Map",
} satisfies Meta;

interface MapProps {
  theme?: string;
}

const locations = [
  { value: "1", label: "Bratislava", coords: [48.1425, 17.1004] },
  { value: "2", label: "Praha", coords: [50.0755, 14.4378] },
  { value: "3", label: "Brno", coords: [49.2104, 16.6113] },
  { value: "12", label: "Nitra", coords: [48.3069, 18.0864] },
  { value: "13", label: "Trnava", coords: [48.3774, 17.5887] },
  { value: "14", label: "Trenčín", coords: [48.8945, 18.044] },
  { value: "15", label: "Žilina", coords: [49.2231, 18.7394] },
  { value: "16", label: "Banská Bystrica", coords: [48.7395, 19.1531] },
  { value: "17", label: "Prešov", coords: [48.9984, 21.2339] },
];

const Map: FC<MapProps> = ({ theme }) => {
  const color = theme === "light" ? "#ddd" : "#222";
  const [open, setOpen] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href = "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css";
    document.head.appendChild(leafletCSS);

    const leafletJS = document.createElement("script");
    leafletJS.src = "https://unpkg.com/leaflet@1.6.0/dist/leaflet.js";
    leafletJS.async = true;
    leafletJS.onload = () => setLeafletLoaded(true);
    document.body.appendChild(leafletJS);

    return () => {
      document.head.removeChild(leafletCSS);
      document.body.removeChild(leafletJS);
    };
  }, []);

  useEffect(() => {
    if (leafletLoaded && (window as any).L) {
      const map = (window as any).L.map("osm-map", {
        zoomControl: false,
        attributionControl: false,
      }).setView([48.148935, 17.094645], 15);

      mapRef.current = map;

      const applyTheme = () => {
        const isDarkMode =
          document.documentElement.getAttribute("data-theme-variant") ===
          "dark";

        map.eachLayer((layer: any) => map.removeLayer(layer));

        const attributionElement = document.querySelector(
          ".leaflet-control-attribution",
        ) as HTMLElement;
        if (attributionElement) {
          attributionElement.style.background = "transparent";
          attributionElement.style.fontFamily = "var(--font-sans)";
          attributionElement.style.fontSize = "0.6rem";
          attributionElement.style.marginRight = "8px";
          attributionElement.style.color = isDarkMode ? "#777" : "#333";
          attributionElement.style.padding = "4px 8px";
          attributionElement.style.borderRadius = "4px";
        }

        const osmMapElement = document.getElementById("osm-map") as HTMLElement;
        if (osmMapElement) {
          osmMapElement.style.background = isDarkMode ? "#222" : "#ddd";
        }

        (window as any).L.tileLayer(
          isDarkMode
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
            subdomains: "abcd",
            maxZoom: 20,
          },
        ).addTo(map);

        const icon = (window as any).L.divIcon({
          className: "custom-dot-marker",
          iconSize: [8, 8],
          iconAnchor: [4, 4],
          html: '<div style="width: 8px; height: 8px; background-color: var(--color-primary-main); border-radius: 50%;"></div>',
        });

        (window as any).L.marker([48.1425, 17.1004], {
          icon: icon,
        }).addTo(map);
      };

      map.attributionControl = (window as any).L.control
        .attribution({ position: "bottomright" })
        .addTo(map);

      applyTheme();

      const observer = new MutationObserver(applyTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme-variant"],
      });

      return () => observer.disconnect();
    }
  }, [leafletLoaded]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleLocationChange = (
    value: string | number | (string | number)[],
  ) => {
    const selectedLocation = locations.find((loc) => loc.value === value);

    if (selectedLocation && mapRef.current) {
      mapRef.current.setView(selectedLocation.coords, 15);
    }
  };

  return (
    <div className="fixed inset-0" style={{ background: color }}>
      <div id="osm-map" className="fixed inset-0" />
      <div className="absolute top-4 left-4">
        <Layer classes="!p-0 !m-0">
          <SelectInput
            icon="magnifyingGlass"
            iconPosition="start"
            placeholder="Search the map"
            autocomplete
            options={locations}
            width={300}
            onChange={handleLocationChange}
          />
        </Layer>
      </div>
      <div className="absolute flex flex-col bottom-6 right-4">
        <IconButton
          icon="plus"
          color="secondary"
          size="xs"
          onClick={handleZoomIn}
        />
        <IconButton
          icon="minus"
          color="secondary"
          size="xs"
          onClick={handleZoomOut}
        />
      </div>
      <div className="absolute top-4 right-4 flex flex-col gap-4">
        <Tooltip label="Account" direction="left">
          <IconButton
            icon="user"
            size="xl"
            iconVariant="light"
            onClick={() => setOpen(true)}
          />
        </Tooltip>
        <div className="flex flex-col">
          <IconButton
            icon="stack"
            color="secondary"
            tooltip="Layers"
            direction="left"
            size="xl"
            iconVariant="light"
          />
          <IconButton
            icon="list"
            color="secondary"
            tooltip="Legend"
            direction="left"
            size="xl"
            iconVariant="light"
          />
          <IconButton
            icon="export"
            color="secondary"
            tooltip="Export"
            direction="left"
            size="xl"
            iconVariant="light"
          />
          <IconButton
            icon="ruler"
            color="secondary"
            tooltip="Measurement"
            direction="left"
            size="xl"
            iconVariant="light"
          />
          <IconButton
            icon="scribble"
            color="secondary"
            tooltip="Drawing"
            direction="left"
            size="xl"
            iconVariant="light"
          />
        </div>
      </div>
      <Dialog
        label="Account"
        active={open}
        actions={[
          <Button label="Register" variant="outline" color="secondary" />,
          <Button label="Login" color="primary" />,
        ]}
        draggable
        minimizable
        closable
        onClose={() => setOpen(false)}
        width="350px"
      >
        <Stack>
          <TextInput label="Email" type="email" />
          <TextInput label="Password" type="password" />
          <Checkbox label="Remember me" />
        </Stack>
      </Dialog>
      <DialogPanel
        variant="filled"
        color="primary"
        classes={{ dialogPanel: "ml-4" }}
      />
    </div>
  );
};

export const Default: StoryObj = {
  name: "Map",
  render: (args, { globals: { theme } }) => {
    return <Map theme={theme} {...args} />;
  },
  parameters: parameters(`// Map component example`, "Map component example"),
};
