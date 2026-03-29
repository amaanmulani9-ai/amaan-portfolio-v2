export const GITHUB_USER = "amaanmulani9-ai";
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_CACHE_KEY = "portfolio-live-projects-v4";
const GITHUB_PROFILE_CACHE_KEY = "portfolio-live-github-profile-v1";
const GITHUB_CACHE_TTL = 1000 * 60 * 30;
const EXCLUDED_REPOS = new Set([
  "amaan-portfolio-v2",
  "password-manager-vault",
  "hello-world",
]);

const GENERIC_HEADINGS = new Set([
  "next.js",
  "react",
  "readme",
  "features",
  "installation",
  "getting started",
  "quick start",
  "project structure",
]);

const REPO_TOKEN_BLACKLIST = new Set([
  "main",
  "repo",
  "app",
  "new",
  "project",
  "portfolio",
  "v1",
  "v2",
  "v3",
]);

const README_TECH_PATTERNS = [
  ["Next.js", /\bnext(?:\.js|js)\b/i],
  ["React", /\breact\b/i],
  ["TypeScript", /\btypescript\b|\btsx\b/i],
  ["JavaScript", /\bjavascript\b|\becmascript\b|\bjsx\b/i],
  ["Python", /\bpython\b/i],
  ["FastAPI", /\bfastapi\b/i],
  ["Django", /\bdjango\b/i],
  ["Flask", /\bflask\b/i],
  ["PyQt", /\bpyqt\b/i],
  ["Tailwind CSS", /\btailwind(?:\s+css)?\b/i],
  ["Vite", /\bvite\b/i],
  ["HTML", /\bhtml\b/i],
  ["CSS", /\bcss\b/i],
  ["MongoDB", /\bmongodb\b/i],
  ["MySQL", /\bmysql\b/i],
  ["PostgreSQL", /\bpostgres(?:ql)?\b/i],
  ["SQLite", /\bsqlite\b/i],
  ["Supabase", /\bsupabase\b/i],
  ["Node.js", /\bnode(?:\.js)?\b/i],
  ["GSAP", /\bgsap\b/i],
  ["Lenis", /\blenis\b/i],
  ["REST API", /\brest(?:ful)?\s+api\b/i],
  ["JWT", /\bjwt\b/i],
  ["Pydantic", /\bpydantic\b/i],
  ["SQLAlchemy", /\bsqlalchemy\b/i],
  ["Argon2", /\bargon2(?:id)?\b/i],
  ["Fernet", /\bfernet\b/i],
  ["Docker", /\bdocker\b/i],
  ["Ollama", /\bollama\b/i],
  ["SpeechRecognition", /\bspeechrecognition\b/i],
  ["OpenCV", /\bopencv\b/i],
  ["TensorFlow", /\btensorflow\b/i],
  ["AWS", /\baws\b|\bamazon web services\b/i],
  ["Arduino", /\barduino\b/i],
];

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;

const readCachedValue = (cacheKey) => {
  if (typeof window === "undefined") return null;

  try {
    const cached = window.localStorage.getItem(cacheKey);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    if (!parsed?.timestamp) return null;

    if (Date.now() - parsed.timestamp > GITHUB_CACHE_TTL) {
      window.localStorage.removeItem(cacheKey);
      return null;
    }

    return parsed.value ?? null;
  } catch {
    return null;
  }
};

const cacheValue = (cacheKey, value) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        value,
      })
    );
  } catch {
    // Ignore cache write failures and keep the live response.
  }
};

const fetchJson = async (url, signal) => {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  return response.json();
};

const decodeBase64Text = (value = "") => {
  try {
    const binary = atob(value.replace(/\n/g, ""));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return "";
  }
};

const normalizeMarkdownText = (value = "") =>
  value
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~>#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getRepoTokens = (repoName) =>
  repoName
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !REPO_TOKEN_BLACKLIST.has(token));

const getReadmeHeadings = (readmeText) =>
  readmeText
    .split(/\r?\n/)
    .map((line, index) => ({ line: line.trim(), index }))
    .filter(({ line }) => /^#{1,6}\s+/.test(line))
    .map(({ line, index }) => ({
      index,
      text: normalizeMarkdownText(line.replace(/^#{1,6}\s+/, "")),
    }))
    .filter(({ text }) => text);

const selectReadmeHeading = (readmeText, repoName) => {
  const headings = getReadmeHeadings(readmeText);
  if (!headings.length) return null;

  const repoTokens = getRepoTokens(repoName);
  const repoMatch = headings.find(({ text }) => {
    const normalized = text.toLowerCase();
    return repoTokens.some((token) => normalized.includes(token));
  });

  if (repoMatch) return repoMatch;

  return headings.find(({ text }) => !GENERIC_HEADINGS.has(text.toLowerCase())) ?? headings[0];
};

const extractReadmeTitle = (readmeText, repoName) =>
  selectReadmeHeading(readmeText, repoName)?.text ?? "";

const extractReadmeDescription = (readmeText, repoName) => {
  if (!readmeText.trim()) return "";

  const lines = readmeText.split(/\r?\n/);
  const heading = selectReadmeHeading(readmeText, repoName);
  const startIndex = heading ? heading.index + 1 : 0;
  const paragraph = [];
  let inCodeBlock = false;

  for (let index = startIndex; index < lines.length; index += 1) {
    const rawLine = lines[index].trim();

    if (/^```/.test(rawLine)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    if (!rawLine) {
      if (paragraph.length) break;
      continue;
    }

    if (
      /^#{1,6}\s+/.test(rawLine) ||
      /^!\[/.test(rawLine) ||
      /^\[!\[/.test(rawLine) ||
      /^<img\b/i.test(rawLine) ||
      /^\|/.test(rawLine) ||
      /^[-*]\s+/.test(rawLine) ||
      /^\d+\.\s+/.test(rawLine) ||
      /^---+$/.test(rawLine)
    ) {
      if (paragraph.length) break;
      continue;
    }

    paragraph.push(rawLine);

    if (paragraph.join(" ").length >= 220) {
      break;
    }
  }

  return normalizeMarkdownText(paragraph.join(" "));
};

const formatRepoName = (repoName) =>
  repoName
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) =>
      /^[A-Z0-9]+$/.test(word)
        ? word
        : `${word.charAt(0).toUpperCase()}${word.slice(1)}`
    )
    .join(" ");

const parseReadmeTech = (readmeText) => {
  const stack = [];

  README_TECH_PATTERNS.forEach(([label, pattern]) => {
    if (pattern.test(readmeText) && !stack.includes(label)) {
      stack.push(label);
    }
  });

  return stack;
};

const buildProject = (repo, readmeText, index) => {
  const repoName = formatRepoName(repo.name);
  const readmeTitle = extractReadmeTitle(readmeText, repo.name);
  const readmeDescription = extractReadmeDescription(readmeText, repo.name);
  const techStack = parseReadmeTech(readmeText);
  const description = readmeDescription || repo.description || "Live GitHub repository.";
  const summaryTech = techStack.length ? techStack : [repo.language || "GitHub"];

  return {
    id: String(index + 1).padStart(2, "0"),
    name: repoName,
    full: readmeTitle || repoName,
    description,
    href: repo.html_url,
    pushedAt: repo.pushed_at,
    tags: summaryTech.slice(0, 3),
    type: summaryTech.slice(0, 4).join(" | "),
  };
};

const shouldDisplayRepo = (repo) =>
  !repo.fork &&
  !repo.archived &&
  !EXCLUDED_REPOS.has(repo.name.toLowerCase()) &&
  repo.name.toLowerCase() !== GITHUB_USER.toLowerCase();

const fetchRepoReadme = async (owner, repoName, signal) => {
  try {
    const readme = await fetchJson(
      `${GITHUB_API_BASE}/repos/${owner}/${repoName}/readme`,
      signal
    );

    return decodeBase64Text(readme.content);
  } catch {
    return "";
  }
};

export const loadGithubProjects = async ({ signal } = {}) => {
  const cachedProjects = readCachedValue(GITHUB_CACHE_KEY);
  if (cachedProjects?.length) return cachedProjects;

  const repos = await fetchJson(
    `${GITHUB_API_BASE}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    signal
  );

  const liveRepos = repos
    .filter(shouldDisplayRepo)
    .sort((left, right) => new Date(right.pushed_at) - new Date(left.pushed_at));

  const projects = await Promise.all(
    liveRepos.map(async (repo, index) => {
      const readmeText = await fetchRepoReadme(repo.owner.login, repo.name, signal);
      return buildProject(repo, readmeText, index);
    })
  );

  cacheValue(GITHUB_CACHE_KEY, projects);
  return projects;
};

export const loadGithubProfile = async ({ signal } = {}) => {
  const cachedProfile = readCachedValue(GITHUB_PROFILE_CACHE_KEY);
  if (cachedProfile) return cachedProfile;

  const profile = await fetchJson(`${GITHUB_API_BASE}/users/${GITHUB_USER}`, signal);

  const mappedProfile = {
    login: profile.login,
    name: profile.name,
    avatarUrl: profile.avatar_url,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    htmlUrl: profile.html_url,
  };

  cacheValue(GITHUB_PROFILE_CACHE_KEY, mappedProfile);
  return mappedProfile;
};
