#!/usr/bin/env bun
import { program } from "commander";
import packagejson from "../package.json";
import choc from "./choc";

program
  .name("choc")
  .description("ConferenceHall organization companion")
  .version(packagejson.version, "-v, --version");

program
  .argument("<json>", "the json export file from Conference Hall")
  .option("-c, --with-categories", "view categories", false)
  .option("-f, --with-formats", "view formats", false)
  .option("-e, --with-companies", "view speakers company", false)
  .option("-a, --with-addresses", "view speakers address", false)
  .option("-l, --with-languages", "view talks language", false)
  .option("-w, --links <eventId>", "view links")
  .option("-p, --compact", "compact render on a webpage", false)
  .action(choc);

program.showHelpAfterError();

program.parse();
