
var navPos = $('nav').position().top;
var lastPos = 0;
var isMobile;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

var app = new Vue({
    el: '#app',
    data(){
        return {
            nav: {
                open: false,
                curr: "home",
                type: "desk",
                class: "",
            },
            loading: false,
            audioPath: "./audios/",
            lang: "en",
            opened: false,
            playing: false,
            pause: false,
            timer: 0,
            length: 0,
            player: "",
            playPromise: null,
            projects: [
                {
                    name: 'mod',
                    title: 'Math on Demand',
                    tag: 'MATH ASK AND QUESTIONS PLATFORM.',
                    class: "class",
                    detail: 'Math on demand is a platform that allows students to ask complicated math questions and get answers from professors based on the tag specified of the question.',
                    link: 'https://mod.um6p.ma'
                },
                {
                    name: 'adsify',
                    title: 'Adsify',
                    tag: 'FACEBOOK ADS TRACKER.',
                    detail: 'Adsify is a platform that lets entrepreneurs to spy on their competitors ads on facebook and save the deleted ads, they can add multiple pages and track their analytics.',
                },
                {
                    name: 'send',
                    title: 'Emails Sender',
                    tag: 'CUSTOM EMAILS SENDER PLATFORM.',
                    class: "class",
                    detail: 'Emails sender is a private application that allows the client to send an email template to a custom audience, the application is capable to send 100 email per second',
                },
                {
                    name: 'track',
                    title: 'Emails Tracker',
                    tag: 'CUSTOM EMAILS TRACKER PLATFORM.',
                    detail: 'Emails tracker is a private application that allows the client to track click/open event for the emails sent to their customers.',
                },
                {
                    name: 'amines',
                    title: 'Amines Design',
                    tag: 'ECOMMERCE WEBSITE',
                    detail: 'Amines design is tapestry website that showcase their services and products using WooCommerce',
                    link: 'https://aminesdesign.ma'
                },
            ],
            project: {
                open: false,
                title: "",
                tag: "",
                class: "",
                detail: "",
                link: "#",
            },
            carousel: {
                slideWidth: 700,
                threshold: this.slideWidth / 3,
                dragStart: 0,
                dragEnd: 0,
            },
            messageForm: "",
        }
    },
    created(){
        if (isMobile){
            this.nav.type = "fixed";
        } else {
            this.nav.type = "desk";
        }

    },
    methods: {
        navLink(e){
            this.nav.open = false;
            let anchor = e.currentTarget.getAttribute('dest');
            this.nav.curr = anchor;
            document.getElementById(anchor).scrollIntoView({behavior: "smooth"});
        },
        openNav(){
            this.nav.open = !this.nav.open;
        },
        handleScroll(){
            var pos = document.documentElement.scrollTop;
            var pos2 = pos + 50;
        
            if (!isMobile) {
                if (pos >= navPos + this.$refs.nav.clientHeight && lastPos < pos) {
                    this.nav.class = "fixed"
                }
                if (pos < navPos && lastPos > pos) {
                    this.nav.class = ""
                }
                lastPos = pos;
            }
        
            if (pos2 > this.$refs.home.offsetTop) {
                this.nav.curr = "home";
            }
            if (pos2 > this.$refs.about.offsetTop) {
                this.nav.curr = "about";
            }
            if (pos2 > this.$refs.portfolio.offsetTop) {
                this.nav.curr = "portfolio";
            }
            if (
                pos2 > this.$refs.contact.offsetTop ||
                pos + window.innerHeight === document.body.clientHeight
            ) {
                this.nav.curr = "contact";
            }
        },
        onScrollInit(items){
            var offset = window.innerHeight / 1.6;

            for (let elem of items) {
                animationClass = elem.getAttribute('data-animation');
                animationDelay = elem.getAttribute('data-delay');
                
                elem.style.webkitAnimationDelay = animationDelay;
                elem.style.animationDelay = animationDelay;
                elem.style.mozAnimationDelay = animationDelay;
                
                elem.classList.add('animated');
                elem.classList.add(animationClass);
            }
        },
        submitContact(e){
            e.preventDefault();

            this.loading = true
            let name = this.$refs.cName.textContent;
            let email = this.$refs.cEmail.textContent;
            let verification = this.verifyContent(email, name);

            document.getElementById('alert').classList.remove('error');
            document.getElementById('alert').classList.remove('expand');
            document.getElementById('alert').classList.remove('success');

            if (!verification)
                axios.post('https://formspree.io/mwkrojjb', {message: name + "," + email})
                .then(res => {
                    document.getElementById('alert').classList.add('expand');
                    document.getElementById('alert').classList.add('success');
                    this.messageForm = "Your message was sent successfully. Thanks!"
                    this.$refs.cName.textContent = "";
                    this.$refs.cEmail.textContent = "";
                    this.loading = false;
                })
            else {
                this.loading = false;
                document.getElementById('alert').classList.add('expand');
                document.getElementById('alert').classList.add('error');
                this.messageForm = verification;
            }
        },
        verifyContent(email, name){
            if (!name.match(/^[a-zA-Z]{3,20}$/i))
                return "Full name is not formed properly."
            if (!email.match(/[a-zA-Z0-9-_.]{1,50}@[a-zA-Z0-9-_.]{1,50}\.[a-z0-9]{2,10}$/i))
                return "Email is not formed properly.";
            return null;
        },
        closeSuccess(){
            document.getElementById('alert').classList.remove('expand');
            document.getElementById('alert').classList.remove('success');
            document.getElementById('alert').classList.remove('error');
            this.messageForm = "";
        },
        playAudio(){
            if (!this.playing){
                this.player.src = this.audioPath + this.lang + ".mp3";
                this.player.play();
                this.playing = true;
                this.pause = false;
                this.opened = true;
            }
        },
        pauseAudio() {
            if (!this.pause && this.playing){
                this.player.pause();
                this.playing = false;
                this.pause = true;
            } else if (this.pause){
                this.player.play();
                this.playing = true;
                this.pause = false;
            }
        },
        restartAudio(){
            this.player.pause();
            this.player.currentTime = 0;
            this.player.play();
            this.playing = true;
            this.pause = false;
        },
        forwardAudio(){
            this.player.currentTime = this.player.currentTime + 5;
        },
        cancelAudio(){
            this.player.pause();
            this.player.currentTime = 0;
            this.playing = false;
            this.opened = false;
            this.pause = false;
            this.timer = 0;
        },
        changeLanguage(lang){
            this.lang = lang;
            this.cancelAudio()
        },
        showModal(name){
            let project = this.projects.filter(p => p.name === name)[0];
            this.project.title = project.title;
            this.project.detail = project.detail;
            this.project.tag = project.tag;
            if (project.link)
                this.project.link = project.link;
            this.project.class = project.class;
            this.project.open = true;
            let slides = this.$el.getElementsByClassName('slide');
            let i = 0;
            for (let elem of slides) {
                elem.style.background = "url('images/slides/" + name + '-' + i + ".jpg') center center/cover";
                elem.style.backgroundSize = 'cover';
                i++;
            }
        },
        closeModal(){
            this.project.title = "";
            this.project.detail = "";
            this.project.tag = "";
            this.project.link = "#";
            this.project.class = "";
            this.project.open = false;
        },
        nameChange(e){
            let len = this.$refs.cName.textContent.length;
            console.log(len)
                if (this.$refs.cName.textContent.includes('\n'))
            {
                let len = this.$refs.cName.textContent.length;
                let content = this.$refs.cName.textContent;
                content[len - 1] = "";
                console.log(len)
                console.log(content.length)
                // this.$refs.cName.textContent
            }
            console.log()
        },
        setDimensions(){
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.carousel.slideWidth = window.innerWidth;
            }
            this.$el.getElementsByClassName('carousel-wrap')[0].style.width = this.carousel.slideWidth;
            this.$el.getElementsByClassName('slide')[0].style.width = this.carousel.slideWidth;
            this.$el.getElementsByClassName('slide')[1].style.width = this.carousel.slideWidth;
            this.$el.getElementsByClassName('slide')[2].style.width = this.carousel.slideWidth;
            document.getElementById('modal').style.maxWidth = this.carousel.slideWidth + "px";
            document.getElementById('carousel').style.left = this.carousel.slideWidth * -1;
        },
        dragPos(){
            return this.carousel.dragEnd - this.carousel.dragStart;
        },
        shiftSlide(direction){
            let carousel = document.getElementById('carousel')
            if (carousel.className.includes('transition')) return;
            this.carousel.dragEnd = this.carousel.dragStart;
            document.removeEventListener('mouseup', null);
            carousel.removeEventListener('mousemove', null);
            carousel.classList.add('transition')
            carousel.style.transform = 'translateX(' + direction * this.carousel.slideWidth + 'px)';
            setTimeout(function() {
                if (direction === 1)
                    $('.slide:first').before($('.slide:last'));
                else if (direction === -1)
                    $('.slide:last').after($('.slide:first'));
                carousel.classList.remove('transition');
                carousel.style.transform = 'translateX(0px)';
            }, 700);
        }
    },
    computed: {
        isOpen(){
            return this.nav.open;
        },
        currNav(){
            return this.nav.curr;
        },
        navType(){
            return this.nav.type + " " + this.nav.class;
        },
        isLoading(){
            return this.loading;
        },
        audioTime(){
            return this.timer;
        },
        isPlaying(){
            return this.playing;
        },
        isOpened(){
            return this.opened;
        },
        isPaused(){
            return this.pause;
        },
        currLanguage(){
            return this.lang;
        },
        getProject(){
            return this.project;
        },
        openModal(){
            return this.project.open;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        let scrollinit = this.onScrollInit;
        let waypoints = this.$el.getElementsByClassName('waypoint');
        setTimeout(function() {
            scrollinit(waypoints);
        }, 10);

        // this.player = document.getElementById("player")
        // this.player.addEventListener("timeupdate", e => {
        //     this.timer = e.target.currentTime;
        //     this.length = e.target.duration;
        //     if (this.timer >= this.length)
        //     {
        //         this.playing = false;
        //         this.timer = "x"
        //     }
        // });
        this.setDimensions();
        document.getElementById('carousel').addEventListener('mousedown', () => {
            if (document.getElementById('carousel').className.includes('transition')) return;
            this.carousel.dragStart = event.pageX;
            document.addEventListener('mouseup', () => {
                if (this.dragPos() > this.carousel.threshold)
                    return this.shiftSlide(1);
                if (this.dragPos() < -this.carousel.threshold)
                    return this.shiftSlide(-1);
                this.shiftSlide(0);
            })
            document.getElementById('carousel').addEventListener('mousemove', () => {
                this.carousel.dragEnd = event.pageX;
                document.getElementById('carousel').style.transform = 'translateX(' + this.dragPos() + 'px)'
            })
        })
    },
    filters: {
        timeFilter(time){
            if (time === "x")
                return "Ended"
            let minutes = parseInt(time / 60);
            let seconds = parseInt(time % 60);
            if (seconds < 10)
                seconds = "0" + seconds
            return minutes + ":" + seconds;
        }
    }
});