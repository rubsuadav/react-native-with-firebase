import * as ImagePicker from "expo-image-picker";
import Swal from "sweetalert2";
import { getDownloadURL, listAll, ref, uploadString } from "firebase/storage";
import { GiftedChat } from "react-native-gifted-chat";

//local imports
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../firebaseConfig";

export async function pickVideo({ onSend }) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: [4, 3],
    videoQuality: ImagePicker.UIImagePickerControllerQualityType.VGA640x480,
  });

  if (!result.canceled) {
    const videoURI = result.assets[0].uri;
    const index = videoURI.indexOf("base64,") + "base64,".length;

    const base64Video = videoURI.substring(index);
    const decodedBytes = atob(base64Video);

    const videoSize = decodedBytes.length;
    const videoSizeInKB = Math.round(videoSize / 1024);
    const videoSizeInMB = videoSizeInKB / 1000;

    if (videoSizeInMB >= 200) {
      return Swal.fire({
        title: "El video es demasiado grande",
        text: "El video debe pesar menos de 200MB",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    const swal = await Swal.fire({
      title: "Quieres subir el video?",
      showDenyButton: true,
    });
    switch (swal.isConfirmed) {
      case true:
        onSend([
          {
            _id: String(Date.now()),
            text: "",
            createdAt: new Date(),
            user: {
              _id: FIREBASE_AUTH.currentUser.email,
            },
            video: result.uri,
          },
        ]);
        break;
      case false:
        break;
      default:
        break;
    }
  }
}

export async function sendVideos(message, { setMessages }) {
  const date = new Date();
  const hourMessage = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()} - ${date.getHours()}`;
  const videoName = `${hourMessage}-${message.user._id}`;
  const storageRef = ref(FIREBASE_STORAGE, `videos/${videoName}`);
  const existingVideos = await listAll(ref(FIREBASE_STORAGE, "videos/"));
  const videoExists = existingVideos.items.some(
    (itemRef) => itemRef.name === videoName
  );
  if (videoExists) {
    await downloadVideoFromStorage(storageRef, { setMessages });
  }
  await uploadString(storageRef, message.video, "data_url");
  const videoUrl = await downloadVideoFromStorage(storageRef, { setMessages });
  return {
    ...message,
    video: videoUrl,
  };
}

export async function downloadVideoFromStorage(storageRef, { setMessages }) {
  const videoUrl = await getDownloadURL(storageRef);
  const videoMessage = {
    _id: Date.now(),
    createdAt: new Date(),
    user: {
      _id: FIREBASE_AUTH.currentUser.email,
      avatar: "https://i.pravatar.cc/30",
    },
    video: videoUrl,
  };
  setMessages((previousMessages) =>
    GiftedChat.append(previousMessages, [videoMessage])
  );
  return videoUrl;
}
