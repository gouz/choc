const converter = new showdown.Converter();

const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>`;

const lovesIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>`;

const hatesIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
</svg>`;

const ratingIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>`;

const datas = {
  categories: [...new Set(talks.map((talk) => talk.category))].sort(),
  formats: [...new Set(talks.map((talk) => talk.format))].sort(),
  speakers: [
    ...new Set(
      talks.flatMap((talk) => talk.speakers.map((speaker) => speaker.name)),
    ),
  ].sort(),
  companies: [
    ...new Set(
      talks.flatMap((talk) => talk.speakers.map((speaker) => speaker.company)),
    ),
  ].sort(),
};

["categories", "formats", "speakers", "companies"].forEach((key, _) => {
  document.getElementById(key).innerHTML = [
    `<option value="">All ${key}</option>`,
    Object.values(
      datas[key]
        .sort((a, b) => (a < b ? -1 : 1))
        .filter((name) => name !== "")
        .map((name) => `<option value="${name}">${name}</option>`),
    ).join(""),
  ].join("");
});

const joliSpeaker = (speaker) => `
<div class="speaker">
    <img src="${speaker.picture}">
    <h4>${speaker.name}</h4>
    ${speaker.company ? `<h5>${speaker.company}</h5>` : ""}
</div>
`;

const joliTalk = (talk) => `
  <article class="talk" data-categories=" ${talk.category} " data-formats=" ${
    talk.format
  } " data-speakers=" ${talk.speakers
    .map((s) => s.name)
    .join(" ")} " data-companies=" ${talk.speakers
    .map((s) => s.company)
    .join(" ")} ">
    <header>
        ${talk.link !== "" ? `<a href="${talk.link}">${linkIcon}</a>` : ""}
        <h3>${talk.title}</h3>
    </header>
    <div class="info">
        <div class="abstract">${converter.makeHtml(talk.abstract)}</div>
        <div class="speakers">
            ${talk.speakers.map((speaker) => joliSpeaker(speaker)).join("")}
        </div>
    </div>
    <footer>
        <span class="category">${talk.category}</span>
        <span class="format">${talk.format}</span>
        ${talk.language ? `<span class="language">${talk.language}</span>` : ""}
        ${talk.level ? `<span class="level">${talk.level}</span>` : ""}
        <div>
            <span>${ratingIcon}: ${talk.rating?.toFixed(2) ?? "-"}</span>
            <span>${lovesIcon}: ${talk.positives ?? "0"}</span>
            <span>${hatesIcon}: ${talk.negatives ?? "0"}</span>
        </div>
    </footer>
  </article>
`;

const rowTalk = (talk) => `
<tr class="talk" data-categories=" ${
    talk.category
  } " data-formats=" ${talk.format} " data-speakers=" ${talk.speakers.join(
    " ",
  )} " data-companies=" ${talk.speakers
    .map((s) => s.company)
    .join(" ")} ">
  <td>${talk.link !== "" ? `<a href="${talk.link}">${linkIcon}</a>` : ""}${talk.title}</td>
  <td class="format">${talk.format}</td>
  <td class="category">${talk.category}</td>
  <td class="speakers">${talk.speakers.map((s) => s.name).join("<br />")}</td>
  <td class="companies">${talk.speakers.map((s) => s.company ?? "").join("<br />")}</td>
  <td class="addresses">${talk.speakers.map((s) => s.location ?? "").join("<br />")}</td>
  <td class="languages">${talk.language ?? ""}</td>
  <td class="rating">${talk.rating?.toFixed(2) ?? "-"}</td>
  <td class="positives">${talk.positives}</td>
  <td class="negatives">${talk.negatives}</td>
</tr>
`;

const htmlTalks = talks
  .sort((a, b) => (a.rating <= b.rating ? 1 : -1))
  .map((talk, i) => ({ ...talk, position: i + 1 }))
  .map((talk) => (options.compact ? rowTalk(talk) : joliTalk(talk)))
  .join("");

document.getElementById("talks").innerHTML = options.compact
  ? `
<table>
  <thead>
    <th>Titles</th>
    <th class="format">Formats</th>
    <th class="category">Categories</th>
    <th class="speakers">Speakers</th>
    <th class="companies">Companies</th>
    <th class="addresses">Addresses</th>
    <th class="languages">Languages</th>
    <th class="rating">Rating</th>
    <th class="positives">Positives</th>
    <th class="negatives">Negatives</th>
  </thead>
  <tbody>
    ${htmlTalks}
  </tbody>
</table>
`
  : htmlTalks;

window.filterTalks = () => {
  const articles = document.querySelectorAll(".talk");
  articles.forEach((article, _) => {
    article.classList.remove("hidden");
  });

  ["categories", "formats", "speakers", "companies"].forEach((key, _) => {
    const choice = document.getElementById(key).value.trim();
    if (choice !== "")
      articles.forEach((article, _) => {
        if (article.getAttribute(`data-${key}`).indexOf(` ${choice} `) === -1)
          article.classList.add("hidden");
      });
  });
};
