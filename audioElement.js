// import mitt from "mitt";

const emitter = mitt();

// Object that maps to the properties of the html 5 audio element
// Info for the audio element https://html.spec.whatwg.org/multipage/media.html#event-media-playing
// const audioElement = {
// 	track: track,
// 	id: "",
// 	root_id: "", // passed in from the redux store
// 	product: "Web app",
// 	structureVersion: 12,
// 	duration: 1, // Double, need this info from
// 	contentId: "", // Article Id passed in from the redux store
// 	rootContentId: "", // Article Id  passed in from the redux store contentId, same as above
// 	audioSubtype: "", //  "podcast" passed in from the redux store
// 	playerType: "ft-audio-player",
// 	progress: null, // determined by the tracking
// 	currentTime: 0, // Double determined by the
// 	paused: false, // Read only boolean
// 	loadmedmetadata: emitter.on("nativePodcastLoaded", e => {
// 		console.log("Data loaded, ", e);
// 		emitter.emit("loadmedmetadata", { audio: "urlString", ...e });
// 	}),
// 	playing: emitter.on("nativePodcastPlay", e => {
// 		console.log("Podcast playing, ", e);
// 		emitter.emit("playing", { audio: "urlString", ...e });
// 	}),
// 	timeupdate: emitter.on("nativePodcastProgress", e => {
// 		console.log("Podcast progress, ", e);
// 		// Update the current time of the audio element every second? Or 250ms as per HTML 5 element
// 		this.currentTime = e.currentTime; // turn it into a Double
// 		emitter.emit("timeupdate", { audio: "urlString", ...e });
// 	})
// };

// Function to build the audio element based on the audio file selected by user
export const generateAudioElement = (
	track,
	root_id,
	contentId,
	audioSubtype
) => {
	const audioElement = {
		track: track,
		id: "",
		root_id: root_id, // passed in from the redux store
		// product: "Web app",
		// structureVersion: 12,
		duration: 1, // Double
		contentId: contentId, // Article Id passed in from the redux store
		rootContentId: contentId, // Article Id  passed in from the redux store contentId, same as above
		audioSubtype: audioSubtype, //  "podcast" passed in from the redux store
		playerType: "ft-audio-player",
		progress: null, // determined by the tracking and added to the object
		currentTime: 0, // Double
		paused: false, // Read only boolean
		loadmedmetadata: emitter.on("nativePodcastLoaded", e => {
			console.log("Data loaded, ", e);
			emitter.emit("loadmedmetadata", { audio: "urlString", ...e });
		}),
		playing: emitter.on("nativePodcastPlay", e => {
			console.log("Podcast playing, ", e);
			emitter.emit("playing", { audio: "urlString", ...e });
		}),
		timeupdate: emitter.on("nativePodcastProgress", e => {
			console.log("Podcast progress, ", e);
			// Update the current time of the audio element every second? Or 250ms as per HTML 5 element
			audioElement.currentTime = e.currentTime;
			emitter.emit("timeupdate", { audio: "urlString", ...e });
			console.log(audioElement.currentTime);
		})
	};
	return audioElement;
};

generateAudioElement(
	"https://media.acast.com/ft-politics/anotherqueen-sspeech-anotherbrexitvote-pluslabourleadershiplatest/media.mp3",
	"ck4ivoe5v000h3z6ebdl94huz",
	"7ddded94-3115-46c1-9afa-68ddf57e8401",
	"podcast"
);

// Events emitted by the native player
// The audio element listens to these
export const loaded = () => {
	emitter.emit("nativePodcastLoaded", { audio: "urlString" });
	console.log("LOAD EMITTED");
};

export const play = () => {
	emitter.emit("nativePodcastPlay", { audio: "urlString" });
	console.log("PLAY EMITTED");
};

export const progress = time => {
	emitter.emit("nativePodcastProgress", {
		audio: "urlString",
		currentTime: time
	});
	console.log("PROGRESS EMITTED");
};
