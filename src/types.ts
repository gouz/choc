export type ConferenceHallFormat = {
  id: string;
  name: string;
  description: string | null;
  migrationId: string;
  eventId: string;
};

export type ConferenceHallCategory = {
  id: string;
  name: string;
  description?: string | null;
  migrationId?: string;
  eventId?: string;
};

export type ConferenceHallSpeaker = {
  name: string;
  bio: string | null;
  company: string | null;
  references: string | null;
  picture: string | null;
  location: string | null;
  email: string | null;
  socials: { [key: string]: string };
};

export type ConferenceHallTalk = {
  id: string;
  title: string;
  abstract: string | null;
  deliberationStatus: string | null;
  confirmationStatus: string | null;
  level: string;
  references: string | null;
  formats: ConferenceHallFormat[];
  categories: ConferenceHallCategory[];
  languages: string[];
  speakers?: ConferenceHallSpeaker[];
  review?: {
    average?: number;
    positives?: number;
    negatives?: number;
  };
};

export type TalkRow = {
  title?: string;
  abstract?: string | null;
  format?: string;
  category?: string;
  speakers?: {
    name: string;
    company: string | null;
    location: string | null;
    picture: string | null;
  }[];
  rating?: number;
  positives?: number;
  negatives?: number;
  deliberationStatus?: string | null;
  confirmationStatus?: string | null;
  level?: string;
  languages?: string[];
  link?: string;
};

export type Options = {
  withCategories: boolean;
  withCompanies: boolean;
  withFormats: boolean;
  withLanguages: boolean;
  withAddresses: boolean;
  links?: string;
  export?: string;
  compact: boolean;
};
