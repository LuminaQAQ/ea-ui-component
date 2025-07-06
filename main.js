// import { EaIcon } from "./dist/components/ea-icon.js";
// EaIcon.iconURL = "./dist/assets/style.css"

import "./src/components/index.js"
// import "./dist/components/index.js"
if (process.env.NODE_ENV === "development") {
    // await import("./src/components/index.js")
    // await import("./dist/components/index.js")
}


const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration));

customElements.whenDefined('ea-button').then(() => {
    // const testbtn = document.querySelector('ea-button');
    // testbtn?.addEventListener("update", async (e) => {
    //     console.log(e.detail);
    // });

    // testbtn?.addEventListener("click", async () => {
    //     testbtn.disabled = testbtn.disabled ? false : true;

    //     // testbtn?.setAttribute('disabled', true);
    // });

    // testbtn?.addEventListener("beforeMount", async () => {
    //     console.log('mounted', 'outside');

    //     await sleep(1000);
    // });

    // testbtn?.addEventListener("mounted", async () => {
    //     console.log('mounted', 'outside');

    //     await sleep(1000);
    // });

    // setTimeout(() => {
    //     testbtn?.remove();
    // }, 2000);

    // testbtn?.addEventListener("beforeUnmount", async () => {
    //     console.log('beforeUnmount', testbtn);

    //     await sleep(1000);
    // });

    // testbtn?.addEventListener("unmounted", async () => {
    //     console.log('unmounted', testbtn);
    // });
});