#!/usr/bin/env bun
import packagejson from "../package.json";
import choc from "./choc";
import { Clipse } from "clipse";
import exportTSV from "./export";

const myCMD = new Clipse(
  "choc",
  "ConferenceHall organization companion",
  packagejson.version,
);
myCMD
  .addArguments([
    { name: "json", description: "the json export file from Conference Hall" },
  ])
  .addOptions({
    "with-categories": {
      short: "c",
      description: "view categories",
      type: "boolean",
      default: false,
    },
    "with-formats": {
      short: "f",
      description: "view formats",
      type: "boolean",
      default: false,
    },
    "with-companies": {
      short: "e",
      description: "view speakers company",
      type: "boolean",
      default: false,
    },
    "with-address": {
      short: "a",
      description: "view speakers address",
      type: "boolean",
      default: false,
    },
    "with-languages": {
      short: "t",
      description: "view speakers languages",
      type: "boolean",
      default: false,
    },
    links: {
      short: "l",
      description: "view links",
      type: "string",
      default: "",
      optional: true,
    },
    compact: {
      short: "p",
      description: "compact render",
      type: "boolean",
      default: false,
    },
    export: {
      short: "x",
      description: "export into tsv file",
      type: "string",
      default: "export.tsv",
      optional: true,
    },
  })
  .action(async (a, o) => {
    if (o.export)
      await exportTSV(a.json ?? "", {
        withCategories: o["with-categories"] === true,
        withCompanies: o["with-companies"] === true,
        withFormats: o["with-formats"] === true,
        withLanguages: o["with-languages"] === true,
        withAddresses: o["with-address"] === true,
        compact: o.compact === "true",
        links: o.links?.toString(),
        export: o.export?.toString(),
      });
    else
      await choc(a.json ?? "", {
        withCategories: o["with-categories"] === true,
        withCompanies: o["with-companies"] === true,
        withFormats: o["with-formats"] === true,
        withLanguages: o["with-languages"] === true,
        withAddresses: o["with-address"] === true,
        compact: o.compact === "true",
        links: o.links?.toString(),
        export: o.export?.toString(),
      });
  })
  .ready();
