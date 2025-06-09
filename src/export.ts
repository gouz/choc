import { DTO } from "./DTO";
import type { Options } from "./types";

export default async (file: string, options: Options) => {
  const talks = DTO(await Bun.file(file).json(), options).sort((a, b) =>
    (a.rating ?? 0) <= (b.rating ?? 0) ? -1 : 1,
  );
  const talksLines: {
    position: number;
    title: string;
    format?: string;
    categories?: string;
    speakers: string;
    companies?: string;
    addresses?: string;
    languages?: string;
    rating: number;
    positives: number;
    negatives: number;
    link?: string;
  }[] = talks.map((talk, index) => {
    return {
      position: index + 1,
      title: talk.title,
      ...(options.withFormats ? { format: talk.format } : {}),
      ...(options.withCategories ? { categories: talk.category } : {}),
      speakers: talk.speakers?.map((s) => s.name).join(", "),
      ...(options.withCompanies
        ? { companies: talk.speakers?.map((s) => s.company).join(", ") }
        : {}),
      ...(options.withAddresses
        ? { addresses: talk.speakers?.map((s) => s.location).join(", ") }
        : {}),
      ...(options.withLanguages
        ? { languages: talk.languages?.join(", ") }
        : {}),
      rating: Number(talk.rating ?? 0),
      positives: Number(talk.positives ?? 0),
      negatives: Number(talk.negatives ?? 0),
      ...(options.links ? { link: talk.link } : {}),
    };
  });

  Bun.write(
    options.export ?? "export.tsv",
    `${Object.keys(talksLines[0]).join("\t")}\n${talksLines
      .map((t) => Object.values(t).join("\t"))
      .join("\n")}`,
  );
};
