const BASE_URL = 'https://api.tvmaze.com';
const RATE_LIMIT_DELAY = 10000 / 20; // 500ms

let lastApiCallTime = 0;

export const get = async (path) => {
  // API calls are rate limited to allow at least 20 calls every 10 seconds per IP address.
  const now = Date.now();
  const diff = now - lastApiCallTime;
  if (diff < RATE_LIMIT_DELAY) {
    // Inform the user and give option
    throw new Error('API rate limit exceeded');
  }

  const response = await fetch(`${BASE_URL}${path}`);
  lastApiCallTime = Date.now();

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  return data;
};