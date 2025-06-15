// Initialize AOS (Animate On Scroll)
AOS.init({
	duration: 800,
	easing: "ease-in-out",
	once: true,
	mirror: false,
});

// Preloader
window.addEventListener("load", function () {
	document.getElementById("preloader").style.display = "none";
});

// Sticky Header
document.addEventListener("DOMContentLoaded", function () {
	const header = document.getElementById("header");

	window.addEventListener("scroll", function () {
		if (window.scrollY > 50) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}
	});

	// Mobile Menu Toggle
	const menuToggle = document.querySelector(".mobile-menu-toggle");
	const navMenu = document.querySelector(".nav-menu");

	menuToggle.addEventListener("click", function () {
		menuToggle.classList.toggle("active");
		navMenu.classList.toggle("active");
	});

	// Close mobile menu when clicking a nav link
	const navLinks = document.querySelectorAll(".nav-link");
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			menuToggle.classList.remove("active");
			navMenu.classList.remove("active");
		});
	});

	// Parallax effect for hero section
	window.addEventListener("scroll", function () {
		const parallaxBg = document.querySelector(".parallax-bg");
		let scrollPosition = window.pageYOffset;
		parallaxBg.style.transform = "translateY(" + scrollPosition * 0.5 + "px)";
	});

	// Form submission
	const contactForm = document.getElementById("contactForm");
	if (contactForm) {
		const formStatus = document.querySelector(".form-status");

		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Reset previous errors
			document
				.querySelectorAll(".error-message")
				.forEach((el) => (el.textContent = ""));
			document
				.querySelectorAll("input, textarea")
				.forEach((el) => el.classList.remove("error"));
			formStatus.textContent = "";
			formStatus.className = "form-status";

			// Get form values
			const name = document.getElementById("name").value.trim();
			const email = document.getElementById("email").value.trim();
			const subject = document.getElementById("subject").value.trim();
			const message = document.getElementById("message").value.trim();

			// Validate form
			let isValid = true;

			// Name validation
			if (name === "") {
				showError("name", "Name is required");
				isValid = false;
			}

			// Email validation
			if (email === "") {
				showError("email", "Email is required");
				isValid = false;
			} else if (!isValidEmail(email)) {
				showError("email", "Please enter a valid email address");
				isValid = false;
			}

			// Subject validation
			if (subject === "") {
				showError("subject", "Subject is required");
				isValid = false;
			}

			// Message validation
			if (message === "") {
				showError("message", "Message is required");
				isValid = false;
			}

			if (isValid) {
				// Here you would normally send the data to a server
				// For demo purposes, simulate successful submission
				formStatus.textContent =
					"Thank you for your message! We will get back to you shortly.";
				formStatus.classList.add("success");
				contactForm.reset();

				// Hide success message after 5 seconds
				setTimeout(() => {
					formStatus.textContent = "";
					formStatus.className = "form-status";
				}, 5000);
			}
		});

		// Helper functions
		function showError(fieldId, message) {
			const field = document.getElementById(fieldId);
			const errorElement = field.nextElementSibling;

			field.classList.add("error");
			errorElement.textContent = message;
		}

		function isValidEmail(email) {
			const re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				const headerHeight = header.offsetHeight;
				const targetPosition = targetElement.offsetTop - headerHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	// Active menu item on scroll
	const sections = document.querySelectorAll("section");

	window.addEventListener("scroll", function () {
		let current = "";

		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			const headerHeight = header.offsetHeight;

			if (window.scrollY >= sectionTop - headerHeight - 100) {
				current = section.getAttribute("id");
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href") === "#" + current) {
				link.classList.add("active");
			}
		});

		// Scroll to top button visibility
		const scrollTop = document.querySelector(".scroll-top");
		if (window.scrollY > 300) {
			scrollTop.classList.add("active");
		} else {
			scrollTop.classList.remove("active");
		}
	});

	// Scroll to top functionality
	const scrollTopBtn = document.querySelector(".scroll-top");
	if (scrollTopBtn) {
		scrollTopBtn.addEventListener("click", function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		});
	}

	// Testimonial Slider
	const testimonialItems = document.querySelectorAll(".testimonial-item");
	const dots = document.querySelectorAll(".testimonial-dots .dot");
	const prevArrow = document.querySelector(".testimonial-arrows .prev");
	const nextArrow = document.querySelector(".testimonial-arrows .next");

	if (testimonialItems.length > 0) {
		let currentSlide = 0;

		// Function to change slide
		function changeSlide(index) {
			// Remove active class from all slides and dots
			testimonialItems.forEach((item) => item.classList.remove("active"));
			dots.forEach((dot) => dot.classList.remove("active"));

			// Add active class to current slide and dot
			currentSlide =
				(index + testimonialItems.length) % testimonialItems.length;
			testimonialItems[currentSlide].classList.add("active");
			dots[currentSlide].classList.add("active");
		}

		// Event listeners for dots
		dots.forEach((dot, index) => {
			dot.addEventListener("click", () => {
				changeSlide(index);
			});
		});

		// Event listeners for arrows
		if (prevArrow && nextArrow) {
			prevArrow.addEventListener("click", () => {
				changeSlide(currentSlide - 1);
			});

			nextArrow.addEventListener("click", () => {
				changeSlide(currentSlide + 1);
			});
		}

		// Auto slide change every 5 seconds
		setInterval(() => {
			changeSlide(currentSlide + 1);
		}, 5000);
	}
});
