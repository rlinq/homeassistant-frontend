import { mdiHome, mdiHomeExportOutline } from "@mdi/js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant } from "../../../../../types";
import { ComputeBadgeFunction } from "./tile-badge";

function getZone(entity: HassEntity, hass: HomeAssistant) {
  const state = entity.state;
  if (state === "home" || state === "not_home") return undefined;

  const zones = Object.values(hass.states).filter((stateObj) =>
    stateObj.entity_id.startsWith("zone.")
  );

  return zones.find((z) => state === z.attributes.friendly_name);
}

function personBadgeIcon(entity: HassEntity) {
  const state = entity.state;
  return state === "not_home" ? mdiHomeExportOutline : mdiHome;
}

function personBadgeColor(entity: HassEntity) {
  switch (entity.state) {
    case "home":
      return "var(--rgb-state-person-home-color)";
    case "not_home":
      return "var(--rgb-state-person-not-home-color)";
    default:
      return "var(--rgb-state-person-zone-color)";
  }
}

export const computePersonBadge: ComputeBadgeFunction = (stateObj, hass) => {
  const zone = getZone(stateObj, hass);

  return {
    iconPath: personBadgeIcon(stateObj),
    icon: zone?.attributes.icon,
    color: personBadgeColor(stateObj),
  };
};
