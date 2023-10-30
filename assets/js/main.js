/**
 * Template Name: Tempo
 * Updated: Jul 27 2023 with Bootstrap v5.3.1
 * Template URL: https://bootstrapmade.com/tempo-free-onepage-bootstrap-theme/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
  //
  /**
   * Back to top button
   */
  // let backtotop = select(".back-to-top");
  // if (backtotop) {
  //   const toggleBacktotop = () => {
  //     if (window.scrollY > 100) {
  //       backtotop.classList.add("active");
  //     } else {
  //       backtotop.classList.remove("active");
  //     }
  //   };
  //   window.addEventListener("load", toggleBacktotop);
  //   onscroll(document, toggleBacktotop);
  // }

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });
})();

/**
 * Chatbox Script
 */
// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");
// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");
// let userMessage = null; // Variable to store user's message
// const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
// const inputInitHeight = chatInput.scrollHeight;
// const createChatLi = (message, className) => {
//   // Create a chat <li> element with passed message and className
//   const chatLi = document.createElement("li");
//   chatLi.classList.add("chat", `${className}`);
//   let chatContent =
//     className === "outgoing"
//       ? `<p></p>`
//       : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//   chatLi.innerHTML = chatContent;
//   chatLi.querySelector("p").textContent = message;
//   return chatLi; // return chat <li> element
// };
// const generateResponse = (chatElement) => {
//   const API_URL = "https://api.openai.com/v1/chat/completions";
//   const messageElement = chatElement.querySelector("p");
//   // Define the properties and message for the API request
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: userMessage }],
//     }),
//   };
//   // Send POST request to API, get response and set the reponse as paragraph text
//   fetch(API_URL, requestOptions)
//     .then((res) => res.json())
//     .then((data) => {
//       messageElement.textContent = data.choices[0].message.content.trim();
//     })
//     .catch(() => {
//       messageElement.classList.add("error");
//       messageElement.textContent =
//         "Oops! Something went wrong. Please try again.";
//     })
//     .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// };
// const handleChat = () => {
//   userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
//   if (!userMessage) return;
//   // Clear the input textarea and set its height to default
//   chatInput.value = "";
//   chatInput.style.height = `${inputInitHeight}px`;
//   // Append the user's message to the chatbox
//   chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//   chatbox.scrollTo(0, chatbox.scrollHeight);

//   setTimeout(() => {
//     // Display "Thinking..." message while waiting for the response
//     const incomingChatLi = createChatLi("Thinking...", "incoming");
//     chatbox.appendChild(incomingChatLi);
//     chatbox.scrollTo(0, chatbox.scrollHeight);
//     generateResponse(incomingChatLi);
//   }, 600);
// };
// chatInput.addEventListener("input", () => {
//   // Adjust the height of the input textarea based on its content
//   chatInput.style.height = `${inputInitHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });
// chatInput.addEventListener("keydown", (e) => {
//   // If Enter key is pressed without Shift key and the window
//   // width is greater than 800px, handle the chat
//   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//     e.preventDefault();
//     handleChat();
//   }
// });
// sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () =>
//   document.body.classList.remove("show-chatbot")
// );
// chatbotToggler.addEventListener("click", () =>
//   document.body.classList.toggle("show-chatbot")
// );

/**
 * WhatsAppChatbox Script
 */

document
  .getElementById("whats-chat")
  .addEventListener("mouseover", showchatbox);
document
  .getElementById("chat-top-right")
  .addEventListener("click", closechatbox);
document.getElementById("send-btn").addEventListener("click", sendmsg);
window.addEventListener("load", showchatboxtime);
function showchatbox() {
  document.getElementById("chat-box").style.right = "8%";
}
function closechatbox() {
  document.getElementById("chat-box").style.right = "-500px";
}
function showchatboxtime() {
  setTimeout(launchbox, 5000);
}
function launchbox() {
  document.getElementById("chat-box").style.right = "8%";
}
function sendmsg() {
  var msg = document.getElementById("whats-in").value;
  var relmsg = msg.replace(/ /g, "%20");
  window.open(
    "https://api.whatsapp.com/send?phone=254 7227 14512&text=" + relmsg,
    "_blank"
  );
}
