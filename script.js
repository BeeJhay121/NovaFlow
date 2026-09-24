/* =========================================================
   NOVAFLOW — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileNav = document.getElementById("mobileNav");

    const commandButton = document.getElementById("commandButton");
    const commandOverlay = document.getElementById("commandOverlay");
    const commandSearch = document.getElementById("commandSearch");

    const faqItems = document.querySelectorAll(".faq-item");
    const navLinks = document.querySelectorAll(".nav-links a");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
    const commandLinks = document.querySelectorAll(".command-links a");

    const sections = document.querySelectorAll("main section[id]");


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (mobileMenuButton && mobileNav) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileMenuButton.textContent = isOpen ? "✕" : "☰";

        });


        /* Close mobile menu after clicking a link */

        mobileNavLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.textContent = "☰";

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    const allAnchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    allAnchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".site-header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }


        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");


            /* Close all other FAQ items */

            faqItems.forEach((otherItem) => {

                if (otherItem !== item) {

                    otherItem.classList.remove("open");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }

                }

            });


            /* Toggle selected FAQ */

            if (isOpen) {

                item.classList.remove("open");

                answer.style.maxHeight = null;

            } else {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    /* =====================================================
       COMMAND MENU
       ===================================================== */

    function openCommandMenu() {

        if (!commandOverlay) {
            return;
        }

        commandOverlay.classList.add("open");

        document.body.classList.add("command-open");


        /* Focus search box */

        if (commandSearch) {

            setTimeout(() => {
                commandSearch.focus();
            }, 100);

        }

    }


    function closeCommandMenu() {

        if (!commandOverlay) {
            return;
        }

        commandOverlay.classList.remove("open");

        document.body.classList.remove("command-open");

        if (commandSearch) {
            commandSearch.value = "";
            filterCommandLinks("");
        }

    }


    if (commandButton) {

        commandButton.addEventListener(
            "click",
            openCommandMenu
        );

    }


    /* Close when clicking outside the menu */

    if (commandOverlay) {

        commandOverlay.addEventListener("click", (event) => {

            if (event.target === commandOverlay) {
                closeCommandMenu();
            }

        });

    }


    /* =====================================================
       COMMAND MENU SEARCH
       ===================================================== */

    function filterCommandLinks(searchTerm) {

        const search = searchTerm
            .trim()
            .toLowerCase();


        commandLinks.forEach((link) => {

            const text = link.textContent
                .trim()
                .toLowerCase();


            if (text.includes(search)) {

                link.style.display = "flex";

            } else {

                link.style.display = "none";

            }

        });

    }


    if (commandSearch) {

        commandSearch.addEventListener(
            "input",
            () => {

                filterCommandLinks(
                    commandSearch.value
                );

            }
        );

    }


    /* Close command menu after selecting a link */

    commandLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeCommandMenu();

        });

    });


    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        /* Open command menu with Ctrl + K / Cmd + K */

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandMenu();

        }


        /* Close command menu with Escape */

        if (event.key === "Escape") {

            closeCommandMenu();


            /* Also close mobile menu */

            if (
                mobileNav &&
                mobileNav.classList.contains("open")
            ) {

                mobileNav.classList.remove("open");

                if (mobileMenuButton) {

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    mobileMenuButton.textContent = "☰";

                }

            }

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.25;


        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            const sectionId = section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = sectionId;

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href = link.getAttribute("href");


            if (
                currentSection &&
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".site-header");


    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".feature-card, " +
        ".solution-card, " +
        ".pricing-card, " +
        ".testimonial-card, " +
        ".stat-item, " +
        ".product-content, " +
        ".product-mockup, " +
        ".section-header"
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       BUTTON PRESS FEEDBACK
       ===================================================== */

    const buttons = document.querySelectorAll(
        ".btn, .command-btn, .mobile-menu-btn"
    );


    buttons.forEach((button) => {

        button.addEventListener("mousedown", () => {

            button.classList.add("pressed");

        });


        button.addEventListener("mouseup", () => {

            button.classList.remove("pressed");

        });


        button.addEventListener("mouseleave", () => {

            button.classList.remove("pressed");

        });

    });


    /* =====================================================
       RESIZE HANDLING
       ===================================================== */

    window.addEventListener("resize", () => {

        /*
         * If the screen becomes desktop size,
         * automatically close the mobile menu.
         */

        if (
            window.innerWidth > 768 &&
            mobileNav &&
            mobileNav.classList.contains("open")
        ) {

            mobileNav.classList.remove("open");

            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.textContent = "☰";

            }

        }


        /*
         * Recalculate an open FAQ height
         * after resizing the browser.
         */

        const openFaq =
            document.querySelector(
                ".faq-item.open"
            );


        if (openFaq) {

            const answer =
                openFaq.querySelector(
                    ".faq-answer"
                );


            if (answer) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }

    });


    /* =====================================================
       PREVENT EMPTY "#" LINKS FROM JUMPING
       ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

        });

    });


    /* =====================================================
       HERO ENTRANCE ANIMATION
       ===================================================== */

    const heroElements = [
        document.querySelector(".hero-badge"),
        document.querySelector(".hero-title"),
        document.querySelector(".hero-description"),
        document.querySelector(".hero-actions"),
        document.querySelector(".hero-note"),
        document.querySelector(".dashboard-wrapper")
    ];


    heroElements.forEach((element, index) => {

        if (!element) {
            return;
        }


        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";


        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";


        setTimeout(() => {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        }, 150 + index * 100);

    });


    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    /* FAQ buttons */

    faqItems.forEach((item) => {

        const question =
            item.querySelector(".faq-question");


        if (!question) {
            return;
        }


        question.setAttribute(
            "aria-expanded",
            "false"
        );


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("open");


            question.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    });


    /* =====================================================
       INITIALIZE
       ===================================================== */

    console.log(
        "NovaFlow JavaScript loaded successfully."
    );

});