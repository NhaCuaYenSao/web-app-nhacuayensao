const formatPayOSUrl = (url) => {
  // Remove h5.zdn.vn prefix if exists
  const cleanUrl = url.replace("https://h5.zdn.vn", "");
  // Add colon after https if missing
  return cleanUrl.replace("https//", "https://");
};

export const redirectToDeviceBrowser = async ({
  extraPath = "",
  isServerEndPoint = false,
}) => {
  const endpoint = import.meta.env.VITE_API_ENDPOINT;

  const url = `${extraPath}`;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // Try safari - 15, 17, 18
    const iosUrl = `x-safari-${url}`;
    window.location.href = iosUrl;
    // Try safari old way
    await new Promise((r) => setTimeout(r, 1000));
    const iosOldUrl = `com-apple-mobilesafari-tab:${url}`;
    window.location.href = iosOldUrl;
    // Try google chrome
    await new Promise((r) => setTimeout(r, 1000));
    const chromeUrl = `googlechrome://${url
      ?.replace("https://", "")
      ?.replace("http://", "")}`;
    window.location.href = chromeUrl;
    // try fireforx
    await new Promise((r) => setTimeout(r, 1000));
    const firefoxUrl = ` firefox://open-url?url=${url}`;
    window.location.href = firefoxUrl;
    // Try safari with search
    await new Promise((r) => setTimeout(r, 1000));
    const iosSearchUrl = `x-web-search://?cicd.aitracuuluat.vn`;
    window.location.href = iosSearchUrl;
    return false;
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    // try chrome
    const androidIntent = `intent://${url.replace(
      "https://",
      ""
    )}#Intent;scheme=https;package=com.android.chrome;end;`;
    window.location.href = androidIntent;
    // try chrome
    await new Promise((r) => setTimeout(r, 1000));
    const chromeUrl = `googlechrome://navigate?url=${url}`;
    window.location.href = chromeUrl;
    // try fireforx
    await new Promise((r) => setTimeout(r, 1000));
    const firefoxUrl = ` firefox://open-url?url=${url}`;
    window.location.href = firefoxUrl;

    return false;
  }
  window.location.href = url;
  return true;
};
