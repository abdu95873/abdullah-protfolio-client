import { mergePortfolio } from "../data/defaultPortfolio";
import {
  normalizeProjectsSection,
  sanitizeForFirestore,
} from "../utils/firestoreSanitize";

const getDbAndRef = async () => {
  const [{ db }, { doc, enableNetwork }] = await Promise.all([
    import("../firebase/firebase.init"),
    import("firebase/firestore"),
  ]);
  await enableNetwork(db);
  return {
    db,
    ref: doc(db, "portfolio", "content"),
    firestore: await import("firebase/firestore"),
  };
};

const prepareSection = (section, data) => {
  if (section === "projects") {
    return normalizeProjectsSection(data);
  }
  return sanitizeForFirestore(data);
};

export const subscribePortfolio = (onData, onError) => {
  let unsubscribe = () => {};
  let cancelled = false;

  (async () => {
    try {
      const { ref, firestore } = await getDbAndRef();
      if (cancelled) return;

      unsubscribe = firestore.onSnapshot(
        ref,
        (snapshot) => {
          const remote = snapshot.exists() ? snapshot.data() : {};
          onData(mergePortfolio(remote), { exists: snapshot.exists() });
        },
        onError
      );
    } catch (err) {
      onError(err);
    }
  })();

  return () => {
    cancelled = true;
    unsubscribe();
  };
};

export const getPortfolioOnce = async () => {
  const { ref, firestore } = await getDbAndRef();
  const snapshot = await firestore.getDoc(ref);
  const remote = snapshot.exists() ? snapshot.data() : {};
  return { portfolio: mergePortfolio(remote), exists: snapshot.exists() };
};

/** Save one section — merge write (creates collection/doc on first save). */
export const savePortfolioSection = async (section, data) => {
  const { ref, firestore } = await getDbAndRef();
  const cleaned = prepareSection(section, data);

  await firestore.setDoc(
    ref,
    {
      [section]: cleaned,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
};

/** Write full portfolio document (best for empty Firestore). */
export const saveFullPortfolio = async (portfolioData) => {
  const { ref, firestore } = await getDbAndRef();
  const payload = sanitizeForFirestore({
    banner: portfolioData.banner,
    about: portfolioData.about,
    services: portfolioData.services,
    experience: portfolioData.experience,
    contact: portfolioData.contact,
    projects: normalizeProjectsSection(portfolioData.projects),
    updatedAt: new Date().toISOString(),
  });

  await firestore.setDoc(ref, payload);
};
