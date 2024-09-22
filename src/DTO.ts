import type { ConferenceHallTalk, Options, TalkRow } from "./types";

export const DTO = (talks: ConferenceHallTalk[], options: Options): TalkRow[] =>
  talks.map((talk) => ({
    id: talk.id,
    title: talk.title,
    abstract: talk.abstract,
    format: talk.formats.shift()?.name,
    category: talk.categories.shift()?.name,
    speakers: talk.speakers?.map(({ name, company, location, picture }) => ({
      name,
      company,
      location,
      picture,
    })),
    rating: talk.reviews?.average,
    positives: talk.reviews?.positives,
    negatives: talk.reviews?.negatives,
    deliberationStatus: talk.deliberationStatus,
    confirmationStatus: talk.confirmationStatus,
    level: talk.level,
    languages: talk.languages,
    link: options.links
      ? `https://conference-hall.io/organizer/event/${options.links}/proposals/${talk.id}`
      : "",
  }));
