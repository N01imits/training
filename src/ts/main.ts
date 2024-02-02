window.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.operations__tab');
	const tabsContainer = document.querySelector('.operations__tab-container');
	const tabsContent = document.querySelectorAll('.operations__content');
	const modal = document.querySelector('.modal');
	const overlay = document.querySelector('.overlay');
	const btnCloseModal = document.querySelector('.btn--close-modal');
	const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

	const openModal = (e: Event) => {
		e.preventDefault();
		modal?.classList.remove('hidden');
		overlay?.classList.remove('hidden');
	};

	const closeModal = () => {
		modal?.classList.add('hidden');
		overlay?.classList.add('hidden');
	};

	btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

	btnCloseModal?.addEventListener('click', closeModal);
	overlay?.addEventListener('click', closeModal);

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
			closeModal();
		}
	});

	tabsContainer?.addEventListener('click', function (e) {
		const target = e.target as HTMLElement;
		const clicked: HTMLElement | null = target.closest('.operations__tab');

		// Guard clause
		if (!clicked) return;

		// Remove active classes
		tabs.forEach(t => t.classList.remove('operations__tab--active'));
		tabsContent.forEach(c => c.classList.remove('operations__content--active'));

		// Activate tab
		clicked.classList.add('operations__tab--active');

		// Activate content area

		document
			?.querySelector(`.operations__content--${clicked.dataset.tab}`)
			?.classList.add('operations__content--active');
	});

	// accordion
	const isAccordionOpen = (accordion: HTMLElement | null) => {
		return accordion?.classList.contains('active');
	};

	const openAccordion = (accordion: HTMLElement) => {
		const accordionContent = accordion.querySelector(
			'.accordion__content',
		) as HTMLElement;

		accordionContent.style.height = `${getContentHeight(accordion)}px`;
		accordion.classList.add('active');
	};

	const closeAccordion = (accordion: HTMLElement) => {
		const accordionHeaderButton = accordion.querySelector(
			'.accordion__button',
		) as HTMLElement;
		const accordionContent = accordion.querySelector(
			'.accordion__content',
		) as HTMLElement;

		accordion.classList.remove('active');
		accordionContent.style.height = '0';
		accordionHeaderButton.focus();
	};

	const getContentHeight = (accordion: HTMLElement) => {
		const accordionInner = accordion.querySelector(
			'.accordion__inner',
		) as HTMLElement;
		return accordionInner.getBoundingClientRect().height;
	};

	const accordionContainer = document.querySelector('.accordion');

	accordionContainer?.addEventListener('click', (event: Event) => {
		const target = event.target as HTMLElement;
		const accordionHeader = target.closest('.accordion__header');
		if (!accordionHeader) return;

		const accordion = accordionHeader.parentElement as HTMLElement;

		isAccordionOpen(accordion)
			? closeAccordion(accordion)
			: openAccordion(accordion);
	});

	document.addEventListener('keydown', event => {
		const target = event.target as HTMLElement;
		const accordion = target.closest('.accordion__item') as HTMLElement;

		if (event.key !== 'Escape') return;
		if (!accordion) return;

		if (isAccordionOpen(accordion)) {
			closeAccordion(accordion);
		}
	});
});
