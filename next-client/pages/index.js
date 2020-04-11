import Head from "next/head";
import React, { useState, useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // if (
    //   typeof window !== "undefined" &&
    //   typeof window.navigator !== "undefined"
    // ) {
    //   console.log("Navigator!");
    // }

    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    let a = new Date();
    a = a.getTime();
    console.log(a);

    setTimeout(sendNotification, 3000);
    console.log(sendNotification);
    // if ("serviceWorker" in navigator) {
    //   console.log("serviceWorker");
    //   // sendNotification().catch((err) => console.error(err));
    // }
  });

  async function sendNotification() {
    const publicVapidKey =
      "BI0swpUwvrReSLQh5a4oMPrTs7w1JTBaMAuTc5Cp-kVGf5YWHQNV2hPbx-oLc-pmuZmd2A5w0doO2qVlDdKPiBs";

    // Register service worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/",
    });
    console.log("Service worker registerd...");

    // Regiter Push
    console.log("Registering Push...");
    const subsciption = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Push registered...");

    // Send Push Notification
    console.log("Sending Push...");
    await fetch("http://localhost:4000/subscribe", {
      method: "POST",
      body: JSON.stringify(subsciption),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("Push sent...");
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <div className="container">
      <Head>
        <title>Next PWA App</title>
      </Head>
      <div className="content">
        <h1>Hola! Next PWA App</h1>
        <img src="/pexels-photo-699122.jpeg" alt="hello-img" width="100%"></img>
        <p>
          This web is developed for testing <b>Push Notification</b> by using{" "}
          <b>Web Push</b> to make a Push notification service. <br />
          <br />
          - This project is not using next-offline yet, Just use service worker
          file in public folder.
          <br />
          <br />- use{" "}
          <a href="https://developers.google.com/web/tools/workbox">
            Workbox
          </a>,{" "}
          <a href="https://developers.google.com/web/tools/workbox/modules/workbox-sw">
            Workbox SW
          </a>{" "}
          and{" "}
          <a href="https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#generatesw_plugin">
            Workbox webpack Plugins
          </a>{" "}
          to config in{" "}
          <a href="https://github.com/hanford/next-offline">Next-offline</a>
          <br />
          this is{" "}
          <a href="https://github.com/hanford/next-offline/blob/master/packages/now2-example/next.config.js">
            Example
          </a>
          <br />
          <br />- Request permission to allow notification, The instances in
          Google Developer{" "}
          <a href="https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications">
            Introduction to Push Notifications
          </a>
          ,{" "}
          <a href="https://developers.google.com/web/fundamentals/codelabs/push-notifications">
            Adding Push Notifications to a Web App
          </a>{" "}
          or{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission">
            Notification.requestPermission()
          </a>
          <br />
          <br />- Push notification data can sent in fetch function and get it
          in Service Worker file.
          <br />
          <br />- Not cache files yet.
          <br />
          <br />- Didn't show notification with set specific time and when
          closed browser yet. (Set time can do now But now work with specific
          time and didn't work when I closed browser) <br />
          <br />
          <b>may be this help:</b>
          <br />-{" "}
          <a href="https://stackoverflow.com/questions/27221203/send-desktop-notifications-in-chrome-or-firefox-from-a-closed-web-app">
            Send desktop notifications in Chrome or Firefox from a closed web
            app?
          </a>
          <br />-{" "}
          <a href="https://www.google.com/search?sxsrf=ALeKk00V8YpE-SouR6nHObOWpuiuvifMRA%3A1586641310546&ei=njmSXsLvIIay9QPb7p7IDQ&q=send+notification+when+web+is+closed&oq=send+notification+when+web+is+closed&gs_lcp=CgZwc3ktYWIQAzIECCMQJ0oJCBcSBTEyLTkwSggIGBIEMTItMlAAWABg2wZoAHAAeACAAVeIAawBkgEBMpgBAKoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwjCts29q-HoAhUGWX0KHVu3B9kQ4dUDCAw&uact=5">
            send notification when web is closed
          </a>
          <br />-{" "}
          <a href="https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web">
            Push Notifications on the Open Web
          </a>
          <br />-{" "}
          <a href="https://developers.google.com/web/fundamentals/push-notifications">
            Web Push Notifications: Timely, Relevant, and Precise
          </a>
          <br />
          <br />- It's work with <b>Google Chrome</b> but still has problem with
          other Browsers.
        </p>
        <p>
          <b>Youtube Tutorial</b>
          <br />-{" "}
          <a href="https://www.youtube.com/watch?v=HlYFW2zaYQM">
            Push Notifications Using Node.js & Service Worker
          </a>{" "}
          <br />-{" "}
          <a href="https://www.youtube.com/watch?v=2zHqTjyfIY8&t=287s">
            Web Push Notifications - End to End implementation
          </a>{" "}
          <br />-{" "}
          <a href="https://www.youtube.com/watch?v=PL2DG9LJoVQ">
            Build a Simple PWA based on Basic JavaScript using Google's Workbox
          </a>{" "}
          <br />
        </p>
        <button onClick={sendNotification}>Send Push Notification</button>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .content {
          width: 70%;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
          align-items: center;
        }

        button {
          // align-items:
          margin: auto;
          // padding: 10px;
          // border-radius: 10px;
        }
        button:hover {
          cursor: pointer;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 10px;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

// Home.getInitialProps = (ctx) => {
//   console.log("get init props");

//   return { test: "test" };
// };

export default Home;
