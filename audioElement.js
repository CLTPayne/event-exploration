// import mitt from "mitt";

const emitter = mitt();

// Info for the audio element https://html.spec.whatwg.org/multipage/media.html#event-media-playing
// Function to build the audio element based on the audio file selected by user
// Return bject that maps to the properties of the html 5 audio element
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

// Need to listen for some event from the native player to trigger a destroy of all listeners
// emitter.off("", () => {});
