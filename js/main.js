const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
	const isOpen = mainNav.classList.toggle('open');
	menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
	link.addEventListener('click', () => {
		mainNav.classList.remove('open');
		menuToggle.setAttribute('aria-expanded', 'false');
	});
});

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const filterButtons = [...document.querySelectorAll('.filter-tabs button')];
filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		filterButtons.forEach((item) => item.classList.remove('active'));
		button.classList.add('active');
		const filter = button.dataset.filter;
		galleryItems.forEach((item) => {
			item.hidden = filter !== 'all' && item.dataset.category !== filter;
		});
	});
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxText = lightbox.querySelector('p');
const closeLightbox = () => {
	lightbox.classList.remove('open');
	lightbox.setAttribute('aria-hidden', 'true');
};

galleryItems.forEach((item) => {
	item.addEventListener('click', () => {
		lightboxImage.src = item.dataset.full;
		lightboxImage.alt = item.querySelector('img').alt;
		lightboxText.textContent = item.querySelector('img').alt;
		lightbox.classList.add('open');
		lightbox.setAttribute('aria-hidden', 'false');
	});
});
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
	if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') closeLightbox();
});

document.querySelector('#appointment-form').addEventListener('submit', (event) => {
	event.preventDefault();
	const status = event.currentTarget.querySelector('.form-status');
	status.textContent = 'Thank you. We will be in touch within one working day.';
	event.currentTarget.reset();
});
