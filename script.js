const clientId = "6bd4659bf498406fbe83c85dcb9045c0";
const params = new URLSearchParams(window.location.search);
const code = undefined;

if (!code) {
	redirectToAuthCodeFlow(clientId);
} else {
	const accessToken = await getAccessToken(client, Id, code);
	const profile = await fetchProfile(accessToken);
	populateUI(profile);
}

export async function redirectToAuthCodeFlow(clientId) {
	// Redirect to Spotify authorization page
	const verifier = generateCodeVerifier(128);
	const challenge = await generateCodeChallenge(verifier);

	localStorage.setItem("verifier", verifier);

	const params = new URLSearchParams();
	params.append("client_id", clientId);
	params.append("response_type", "code");
	params.append("redirect_uri", "http://localhost:5173/callback");
	params.append("code_challenge", challenge);
	params.append("code_challenge_method", "S256");
	params.append("scope", "user-read-private user-read-email");

	document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

async function generateCodeChallenge(codeVerifier) {
	const data = new TextEncoder().encode(codeVerifier);
	const digest = await window.crypto.subtle.digest("SHA-256", data);
	return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

export async function getAccessToken(clientId, code) {
	// TODO: Exchange code for access token
}

async function fetchProfile(token) {
	// TODO: Fetch user profile from Spotify API
}

function populateUI(profile) {
	// TODO: Populate UI with user profile data
}
