import axios from "axios";

export async function sendBulkNotification(ids, title, body) {
  let response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `key=AAAADk1G134:APA91bE8f01fVRakH3RUgnRRv88NT09BvgqN3CH2oQacyIt6p-YFeZofNwWYxiiErhkEEELHPaQVXNMlMoMe3RMqR0dR_3PasL4CpfevxKKL0P4_i4UT0OoKPoc5_uO5pXZVvvV6bvxP`,
    },
    body: JSON.stringify({
      registration_ids: ids,
      priority: "high",
      data: {
        title,
        body,
      },
    }),
  });

  if (response.status == 200) {
    return true;
  } else {
    return false;
  }
}

// export async function sendNotification(ids, title, body) {
//   let response = await fetch("https://fcm.googleapis.com/fcm/send", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `key=AAAADk1G134:APA91bE8f01fVRakH3RUgnRRv88NT09BvgqN3CH2oQacyIt6p-YFeZofNwWYxiiErhkEEELHPaQVXNMlMoMe3RMqR0dR_3PasL4CpfevxKKL0P4_i4UT0OoKPoc5_uO5pXZVvvV6bvxP`,
//     },
//     body: JSON.stringify({
//       registration_ids: [ids],
//       priority: "high",
//       data: {
//         title,
//         body,
//       },
//     }),
//   });
// }
