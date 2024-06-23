<template>
    <header>
        <div class="hero">
            <div class="content">
                <h1>
                    Step up your Design,<br />
                    <div>With me</div>
                    I'm Zouheir
                </h1>
                <p>.</p>
                <a
                    href="https://calendly.com/zouheirlen/15min"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Work with me
                </a>
            </div>
        </div>
        <div class="sticker">
            <div class="content">
                <div class="panel">
                    <TransitionGroup name="flip-list">
                        <div
                            v-for="project in shownProjects"
                            :key="project.key"
                            class="panel__row"
                            @click="selectedItemHandler(project.key)"
                        >
                            <div
                                class="card"
                                :class="project.flyClass"
                            >
                                <div class="card__column">
                                    <div class="card__avatar">
                                        <LetterIcon :letter="project.letter" />
                                    </div>
                                </div>
                                <div class="card__content">
                                    <div class="card__details">
                                        <div class="text">{{ project.title }}</div>
                                        <div class="code__icon">
                                            <div class="shadow"></div>
                                            <VueIcon
                                                v-if="project.tech === 'Vue'"
                                                class="vue__icon"
                                            />
                                            <ReactIcon
                                                v-else
                                                class="react__icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionGroup>
                    <Transition name="slide">
                        <div
                            v-if="selectedItem !== null"
                            class="panel__row panel__row--selected"
                        >
                            <div class="card card--selected">
                                <div>
                                    <XMarkIcon
                                        class="close--icon"
                                        @click="selectedItem = null"
                                    />
                                </div>
                                <div class="card__content">
                                    <div class="card__details">
                                        <div class="details__header">
                                            <span class="role">{{ selectedProject?.header }}</span>
                                            <span class="date">{{ selectedProject?.year }}</span>
                                        </div>
                                        <div class="details__image">
                                            <img
                                                :src="selectedProject?.image"
                                                :alt="selectedProject?.title"
                                            />
                                        </div>
                                        <div class="details__description">
                                            {{ selectedProject?.content }}
                                        </div>
                                        <div class="details__links">
                                            <a
                                                v-for="link in selectedProject?.links"
                                                class="details--cta"
                                                :href="link.url"
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                {{ link.title }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="scroller">
            <div class="content">
                <div class="panel">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="ring ring--under">
            <img
                src="https://i.ibb.co/267wf2d/portal-ring.png"
                alt=""
            />
        </div>
        <div class="ring ring--over">
            <img
                src="https://i.ibb.co/267wf2d/portal-ring.png"
                alt=""
            />
        </div>
    </header>
    <main>
        <section>
            <h2>Connect with me</h2>
            <div class="connect">
                <div class="socials">
                    <a
                        href="https://github.com/zlayine"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="social__link"
                    >
                        <GithubIcon class="social__icon" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/zouheir-layine"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="social__link"
                    >
                        <LinkedInIcon class="social__icon" />
                    </a>
                    <a
                        href="mailto:zouheirlen@gmail.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="social__link"
                    >
                        <AtSymbolIcon class="social__icon" />
                    </a>
                    <a
                        href="https://twitter.com/zlayinee"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="social__link"
                    >
                        <XIcon class="social__icon" />
                    </a>
                    <a
                        :href="Resume"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="social__link"
                    >
                        <DocumentTextIcon class="social__icon" />
                    </a>
                </div>
                <a
                    class="cta"
                    href="https://calendly.com/zouheirlen/15min"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Work with me
                </a>
            </div>
        </section>
    </main>
    <footer>
        <span>
            ZLAYINE &copy; 2024 • Inspired by

            <a
                href="https://twitter.com/jh3yy"
                target="_blank"
                rel="noreferrer noopener"
                class="normal__link"
            >
                @jh3yy
            </a>
        </span>
    </footer>
</template>

<script setup>
import { computed, ref } from 'vue';
import ReactIcon from './ReactIcon.vue';
import VueIcon from './VueIcon.vue';
import GithubIcon from './GithubIcon.vue';
import XIcon from './XIcon.vue';
import LinkedInIcon from './LinkedInIcon.vue';
import LetterIcon from './LetterIcon.vue';
import { useEventListener } from '@vueuse/core';
import { XMarkIcon, DocumentTextIcon, AtSymbolIcon } from '@heroicons/vue/24/outline';
import Resume from '../assets/resumeZouheirLayine.pdf';

const selectedItem = ref(null);

const selectedProject = computed(() => {
    return projects.find((project) => project.key === selectedItem.value);
});

useEventListener('scroll', () => {
    checkedPosition();
});

const checkedPosition = () => {
    const panel = document.querySelector('.panel');
    if (!panel) {
        return false;
    }

    const panelRect = panel.getBoundingClientRect();
    const panelTop = panelRect.top;

    if (panelTop >= 220) {
        if (selectedItem.value) {
            selectedItem.value = null;
        }

        return false;
    }

    return true;
};

const selectedItemHandler = (item) => {
    if (!checkedPosition()) {
        window.scrollTo({
            top: 1950,
            behavior: 'smooth',
        });
    }
    if (selectedItem.value === item) {
        selectedItem.value = null;
    } else {
        selectedItem.value = item;
    }
};

const projects = [
    {
        key: 'enjin',
        title: 'Enjin.io',
        letter: 'E',
        header: 'Software Engineer',
        year: '2021..now',
        tech: 'Vue',
        links: [
            { title: 'NFT.IO', url: 'https://nft.io' },
            { title: 'Platform', url: 'https://platform.enjin.io' },
        ],
        image: 'https://i.ibb.co/Tm4qnYs/nftio.jpg',
        content:
            "NFT.io is the world's leading next-generation web3 marketplace for NFTs and crypto collectibles. Explore, create, buy, sell, and distribute NFTs and FTs",
        flyClass: 'card--one card--left',
    },
    {
        key: 'evaflor',
        title: 'Evaflor',
        letter: 'E',
        header: 'Frontend Developer',
        year: '2023',
        tech: 'React',
        links: [{ title: 'Evaflor', url: 'https://evaflor.com' }],
        image: 'https://i.ibb.co/5WXyNcH/image.gif',
        content: "Evaflor's web3 app is a decentralized platform for buying, earning parfumes with web3 tokens.",
        flyClass: 'card--three card--right',
    },
    {
        key: 'troof',
        title: 'Troof.io',
        letter: 'T',
        header: 'Frontend Developer',
        year: '2023',
        tech: 'React',
        links: [
            { title: 'Troof App', url: 'https://troof.io' },
            { title: 'Troof Co', url: 'https://co.troof.io' },
        ],
        image: 'https://i.ibb.co/ZHjgTfq/Screen-Shot-2024-06-18-at-23-48-45.png',
        content:
            'Troof is a participatory authentication system that enables businesses to protect their brands and their customers from counterfeiting, and to communicate information about their products to consumers',
        flyClass: 'card--two card--left',
    },
    {
        key: 'leet',
        title: 'LEET / 1337',
        letter: 'L',
        header: 'Fullstack Developer',
        year: '2021',
        tech: 'Vue',
        image: 'https://i.ibb.co/94D985z/rate-2.png',
        content:
            '1337 is the first to provide IT training in Morocco. Developped a platform for students to improve their restaurant quality and a voting system for various events.',
        flyClass: 'card--six card--right',
    },
    {
        key: 'um6p',
        title: 'UM6P',
        letter: 'U',
        header: 'Frontend Developer',
        year: '2020',
        tech: 'React',
        image: 'https://i.ibb.co/LQddkxg/mod-0.jpg',
        content:
            'UM6P is a university website. we have developed a platform for students to post their math problems and get help from other students.',
        flyClass: 'card--five card--left',
    },
    {
        key: 'adsify',
        title: 'Adsify',
        letter: 'A',
        header: 'Fullstack Developer',
        year: '2019',
        tech: 'Vue',
        image: 'https://i.ibb.co/NTGZkBQ/adsify-1.jpg',
        content:
            'Adsify is an advertising spying platform. it allows you to spy on your competitors and see their ads on any social media',
        flyClass: 'card--four card--right',
    },
];

const shownProjects = computed(() =>
    projects.filter((project) => (selectedItem.value && project.key === selectedItem.value) || !selectedItem.value)
);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    const cardStartValues = [
        { x: -window.innerWidth * 0.45, y: -10, r: -8, h: 160, w: 320 },
        { x: window.innerWidth * 0.45, y: -50, r: 15, h: 300, w: 220 },
        { x: -window.innerWidth * 0.45, y: -30, r: 6, h: 300, w: 330 },
        { x: window.innerWidth * 0.45, y: -30, r: -5, h: 400, w: 305 },
        { x: -window.innerWidth * 0.45, y: -45, r: -20, h: 525, w: 160 },
        { x: window.innerWidth * 0.45, y: 10, r: 10, h: 160, w: 320 },
    ];

    const endValues = { x: 0, y: 0, r: 0, h: 100, w: 600 };

    const calc = (start, end, factor) => {
        return start + (end - start) * factor;
    };

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const maxHeight = window.innerHeight;
        const factor = scrollTop / maxHeight;

        // animate card positions
        cards.forEach((card, index) => {
            const startValue = cardStartValues[index];

            const newX = calc(startValue.x, endValues.x, factor);
            const newY = calc(startValue.y, endValues.y, factor);
            const newR = calc(startValue.r, endValues.r, factor);
            const newH = calc(startValue.h, endValues.h, factor);
            const newW = calc(startValue.w, endValues.w, factor);

            if (startValue.x > 0) {
                card.style.setProperty('--x', `${newX >= endValues.x ? newX : endValues.x}px`);
            } else {
                card.style.setProperty('--x', `${newX <= endValues.x ? newX : endValues.x}px`);
            }

            if (startValue.y > 0) {
                card.style.setProperty('--y', `${newY >= endValues.y ? newY : endValues.y}%`);
            } else {
                card.style.setProperty('--y', `${newY <= endValues.y ? newY : endValues.y}%`);
            }

            if (startValue.r > 0) {
                card.style.setProperty('--r', `${newR >= endValues.r ? newR : endValues.r}deg`);
            } else {
                card.style.setProperty('--r', `${newR <= endValues.r ? newR : endValues.r}deg`);
            }

            card.style.setProperty('--h', `${newH >= endValues.h ? newH : endValues.h}%`);
            card.style.setProperty('--w', `${newW <= endValues.w ? newW : endValues.w}px`);
        });

        // animate card details

        // animate card detail tech
        if (factor >= 1) {
            const codeIcons = document.querySelectorAll('.code__icon');

            codeIcons.forEach((icon) => {
                icon.classList.add('code__icon--visible');
            });
        } else {
            const codeIcons = document.querySelectorAll('.code__icon');

            codeIcons.forEach((icon) => {
                icon.classList.remove('code__icon--visible');
            });
        }
    };

    window.addEventListener('scroll', handleScroll);
});
</script>
