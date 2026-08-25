/** Editorial photographs. Atmosphere for the work — not a claim about the firm's premises. */

export const media = {
  londonStreet: {
    src: "/images/london-street.jpg",
    width: 1536,
    height: 1024,
    alt: "Looking from a quiet interior onto a wet London street of brick terraces",
  },
  londonWindow: {
    src: "/images/london-window.jpg",
    width: 1536,
    height: 1024,
    alt: "Rain on a London terrace street, seen through a tall interior window",
  },
  meetingRoom: {
    src: "/images/meeting-room.jpg",
    width: 1024,
    height: 1024,
    alt: "A quiet meeting room with leather seating and daylight",
  },
  evidenceTable: {
    src: "/images/evidence-table.jpg",
    width: 1536,
    height: 1024,
    alt: "A glass meeting table set with folders, ready for a confidential discussion",
  },
  fileRoom: {
    src: "/images/file-room.jpg",
    width: 1536,
    height: 1024,
    alt: "A corridor of labelled archive boxes leading to a daylit room",
  },
  fileCorridor: {
    src: "/images/file-corridor.jpg",
    width: 1536,
    height: 1024,
    alt: "Organised files and a palm in a quiet, daylit corridor",
  },
  deskFiles: {
    src: "/images/desk-files.jpg",
    width: 1536,
    height: 1024,
    alt: "Paper files and notes laid out on a glass table",
  },
  archiveBoxes: {
    src: "/images/archive-boxes.jpg",
    width: 1536,
    height: 1024,
    alt: "Uniform archive boxes on floor-to-ceiling shelves",
  },
  aboutWho: {
    src: "/images/about-who.jpg",
    width: 1536,
    height: 1024,
    alt: "A quiet London street of brick terraces on an overcast day",
  },
  aboutMethod: {
    src: "/images/about-method.jpg",
    width: 1536,
    height: 1024,
    alt: "Paper files and notes laid out on a glass desk",
  },
  aboutClients: {
    src: "/images/about-clients.jpg",
    width: 1536,
    height: 1024,
    alt: "Two chairs set for a confidential discussion",
  },
  aboutOffice: {
    src: "/images/about-office.jpg",
    width: 1536,
    height: 1024,
    alt: "A wet London terrace street seen from a quiet interior",
  },
};

const practiceImages = {
  "private-prosecutions": "fileCorridor",
  "asset-tracing": "evidenceTable",
  "crypto-fraud": "deskFiles",
  regulatory: "meetingRoom",
  "cross-border": "londonStreet",
  "corporate-intelligence": "archiveBoxes",
};

const investigationImages = {
  internal: "meetingRoom",
  "financial-crime": "fileRoom",
  digital: "deskFiles",
  "cross-border": "londonWindow",
  "asset-tracing": "evidenceTable",
};

const insightImages = {
  "tracing-assets-across-wallets": "deskFiles",
  "hmrc-enquiry-evidence": "archiveBoxes",
  "preserving-digital-evidence": "evidenceTable",
};

export function mediaItem(id) {
  return media[id];
}

export function practiceMedia(id) {
  return media[practiceImages[id]] || media.fileRoom;
}

export function investigationMedia(id) {
  return media[investigationImages[id]] || media.deskFiles;
}

export function insightMedia(slug) {
  return media[insightImages[slug]] || media.deskFiles;
}
