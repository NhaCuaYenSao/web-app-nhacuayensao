self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("ngrok")) {
    event.respondWith(
      fetch(event.request).then((response) => {
        // Nếu là trang confirm của ngrok, tự động chấp nhận
        if (response.url.includes("ngrok-skip-browser-warning")) {
          return fetch(event.request.url);
        }
        return response;
      })
    );
  }
});
