document.addEventListener('DOMContentLoaded', () => {
    const themeKey = 'kennis-hub-theme';
    const scamScoreKey = 'kennis-hub-scam-score';
    const languageProgressKey = 'kennis-hub-language-progress';

    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
    updateThemeButton();

    document.querySelector('#theme-toggle').addEventListener('click', () => {
        const isDark = document.documentElement.dataset.theme === 'dark';
        if (isDark) delete document.documentElement.dataset.theme;
        else document.documentElement.dataset.theme = 'dark';
        localStorage.setItem(themeKey, isDark ? 'light' : 'dark');
        updateThemeButton();
    });

    function updateThemeButton() {
        const button = document.querySelector('#theme-toggle');
        const isDark = document.documentElement.dataset.theme === 'dark';
        button.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
        button.setAttribute('aria-label', isDark ? 'Lichte modus inschakelen' : 'Donkere modus inschakelen');
        button.title = isDark ? 'Lichte modus' : 'Donkere modus';
    }

    const mainTabs = [...document.querySelectorAll('.main-tab')];
    mainTabs.forEach(tab => tab.addEventListener('click', () => {
        mainTabs.forEach(item => {
            const selected = item === tab;
            item.classList.toggle('active', selected);
            item.setAttribute('aria-selected', String(selected));
        });
        document.querySelectorAll('.academy-view').forEach(view => {
            view.hidden = view.id !== `view-${tab.dataset.view}`;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        localStorage.setItem('kennis-hub-active-view', tab.dataset.view);
    }));

    const savedView = localStorage.getItem('kennis-hub-active-view');
    if (savedView === 'language') document.querySelector('#tab-language').click();

    initScamAcademy();
    initLanguageAcademy();
    initChat();

    function createElement(tagName, className, text) {
        const node = document.createElement(tagName);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function initChat() {
        const bubble = document.querySelector('#chat-bubble');
        const panel = document.querySelector('#chat-panel');
        const closeButton = document.querySelector('#chat-close');
        const status = document.querySelector('#chat-status');
        const messages = document.querySelector('#chat-messages');
        const form = document.querySelector('#chat-form');
        const nameInput = document.querySelector('#chat-name');
        const textInput = document.querySelector('#chat-text');
        const sendButton = document.querySelector('#chat-send');
        const savedName = localStorage.getItem('kennis-hub-chat-name');
        if (savedName) nameInput.value = savedName;

        bubble.addEventListener('click', () => {
            const isOpen = !panel.hidden;
            panel.hidden = isOpen;
            bubble.setAttribute('aria-expanded', String(!isOpen));
            bubble.setAttribute('aria-label', isOpen ? 'Open publieke chat' : 'Sluit publieke chat');
            if (!isOpen) {
                nameInput.focus();
                messages.scrollTop = messages.scrollHeight;
            }
        });
        closeButton.addEventListener('click', () => {
            panel.hidden = true;
            bubble.setAttribute('aria-expanded', 'false');
            bubble.setAttribute('aria-label', 'Open publieke chat');
            bubble.focus();
        });

        nameInput.addEventListener('input', () => {
            const name = nameInput.value.trim().slice(0, 24);
            if (name) localStorage.setItem('kennis-hub-chat-name', name);
            updateSendState();
        });
        textInput.addEventListener('input', updateSendState);

        if (!window.firebase || !window.KENNIS_HUB_FIREBASE_CONFIG?.enabled) {
            status.textContent = 'Chat is tijdelijk niet beschikbaar.';
            sendButton.disabled = true;
            return;
        }

        let database;
        let currentUser;
        try {
            if (!firebase.apps.length) firebase.initializeApp(window.KENNIS_HUB_FIREBASE_CONFIG);
            database = firebase.database();
        } catch {
            status.textContent = 'Chat kon niet worden gestart.';
            sendButton.disabled = true;
            return;
        }

        firebase.auth().signInAnonymously()
            .then(result => {
                currentUser = result.user;
                status.textContent = 'Verbonden. Deel geen persoonlijke gegevens.';
                updateSendState();

                database.ref('public-chat/messages')
                    .limitToLast(50)
                    .on('value', snapshot => {
                        messages.replaceChildren();
                        const entries = [];
                        snapshot.forEach(child => {
                            entries.push({ id: child.key, ...child.val() });
                        });
                        entries
                            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
                            .forEach(message => addChatMessage(message));
                        messages.scrollTop = messages.scrollHeight;
                    }, () => {
                        status.textContent = 'Berichten konden niet worden geladen.';
                    });
            })
            .catch(() => {
                status.textContent = 'Verbinden met de chat is niet gelukt.';
                sendButton.disabled = true;
            });

        function updateSendState() {
            sendButton.disabled = !currentUser
                || nameInput.value.trim().length === 0
                || nameInput.value.trim().length > 24
                || textInput.value.trim().length === 0
                || textInput.value.trim().length > 240;
        }

        function addChatMessage(message) {
            const item = createElement('article', 'chat-message');

            const meta = createElement('div', 'chat-message-meta');
            const safeName = typeof message.name === 'string'
                ? message.name.slice(0, 24)
                : 'Anonieme bezoeker';
            meta.append(createElement('span', 'chat-message-name', safeName));

            if (Number.isFinite(message.timestamp)) {
                const date = new Date(message.timestamp);
                const time = date.toLocaleTimeString('nl-NL', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                meta.append(createElement('time', '', time));
            }

            item.append(
                meta,
                createElement(
                    'p',
                    'chat-message-text',
                    typeof message.text === 'string' ? message.text.slice(0, 240) : ''
                )
            );
            messages.append(item);
        }

        form.addEventListener('submit', event => {
            event.preventDefault();
            const name = nameInput.value.trim();
            const text = textInput.value.trim();
            if (!currentUser || !name || name.length > 24 || !text || text.length > 240) return;

            sendButton.disabled = true;
            database.ref('public-chat/messages').push({
                name,
                text,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
                textInput.value = '';
                localStorage.setItem('kennis-hub-chat-name', name);
                updateSendState();
                textInput.focus();
            }).catch(() => {
                status.textContent = 'Bericht kon niet worden verstuurd.';
                sendButton.disabled = false;
            });
        });
    }

    function initScamAcademy() {
        const grid = document.querySelector('#scam-grid');
        const search = document.querySelector('#scam-search');
        const category = document.querySelector('#scam-category');
        const count = document.querySelector('#scam-count');
        const modal = document.querySelector('#reading-modal');
        const modalContent = document.querySelector('#modal-content');
        const closeModal = document.querySelector('#modal-close');

        [...new Set(SCAM_MODULES.map(module => module.category))]
            .sort((a, b) => a.localeCompare(b, 'nl'))
            .forEach(name => {
                const option = createElement('option', '', name);
                option.value = name;
                category.append(option);
            });

        function renderScamModules() {
            const query = search.value.trim().toLocaleLowerCase('nl');
            const selected = category.value;
            const modules = SCAM_MODULES.filter(module => {
                const text = [
                    module.title,
                    module.category,
                    module.summary,
                    ...module.howItWorks,
                    ...module.redFlags,
                    module.realExample,
                    ...module.prevention
                ].join(' ').toLocaleLowerCase('nl');
                return (!selected || module.category === selected) && (!query || text.includes(query));
            });

            grid.replaceChildren();
            modules.forEach(module => grid.append(createScamCard(module)));
            count.textContent = `${modules.length} ${modules.length === 1 ? 'onderwerp' : 'onderwerpen'}`;
        }

        function createScamCard(module) {
            const card = createElement('article', 'scam-card');
            const top = createElement('div', 'scam-card-top');
            top.append(
                createElement('span', 'scam-card-icon', module.icon),
                createElement('span', 'scam-card-category', module.category)
            );
            top.querySelector('span').setAttribute('aria-hidden', 'true');
            const title = createElement('h3', '', module.title);
            const summary = createElement('p', '', module.summary);
            const button = createElement('button', 'card-read', 'Lees volledige uitleg');
            button.type = 'button';
            button.setAttribute('aria-label', `Lees volledige uitleg over ${module.title}`);
            button.addEventListener('click', () => openScamModule(module));
            card.append(top, title, summary, button);
            return card;
        }

        function openScamModule(module) {
            modalContent.replaceChildren();
            const heading = createElement('header', 'modal-heading');
            heading.append(
                createElement('p', 'eyebrow', module.category),
                createElement('h2', '', module.title),
                createElement('p', '', module.summary)
            );
            heading.querySelector('h2').id = 'modal-title';
            modalContent.append(heading);

            const how = createElement('section', 'modal-section');
            how.append(createElement('h3', '', 'Hoe werkt deze oplichting?'));
            module.howItWorks.forEach(paragraph => how.append(createElement('p', '', paragraph)));
            modalContent.append(how);

            const flags = createElement('section', 'modal-section');
            flags.append(createElement('h3', '', 'Vijf duidelijke waarschuwingssignalen'));
            flags.append(createScamList(module.redFlags));
            modalContent.append(flags);

            const example = createElement('section', 'modal-example');
            example.append(createElement('h3', '', 'Realistisch voorbeeld'));
            const quote = createElement('blockquote', '', module.realExample);
            example.append(quote);
            modalContent.append(example);

            const prevention = createElement('section', 'modal-section');
            prevention.append(createElement('h3', '', 'Zo beschermt u uzelf'));
            prevention.append(createScamList(module.prevention));
            modalContent.append(prevention);

            modal.showModal();
            closeModal.focus();
        }

        function createScamList(items) {
            const list = createElement('ul');
            items.forEach(item => list.append(createElement('li', '', item)));
            return list;
        }

        search.addEventListener('input', renderScamModules);
        category.addEventListener('change', renderScamModules);
        closeModal.addEventListener('click', () => modal.close());
        modal.addEventListener('click', event => {
            if (event.target === modal) modal.close();
        });
        renderScamModules();

        const emergencySteps = document.querySelector('#emergency-steps');
        const emergencyResources = document.querySelector('#emergency-resources');
        emergencySteps.replaceChildren();
        EMERGENCY_GUIDE.steps.forEach((step, index) => {
            const item = createElement('li');
            item.append(
                createElement('span', 'step-number', String(index + 1).padStart(2, '0')),
                createElement('div')
            );
            item.lastElementChild.append(
                createElement('h3', '', step.title),
                createElement('p', '', step.details)
            );
            emergencySteps.append(item);
        });

        emergencyResources.replaceChildren();
        EMERGENCY_GUIDE.resources.forEach(resource => {
            const card = createElement('article', 'resource-card');
            card.append(
                createElement('h3', '', resource.name),
                createElement('p', '', resource.detail)
            );
            const link = createElement('a', '', 'Naar de officiële website ↗');
            link.href = resource.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            card.append(link);
            if (resource.name.startsWith('Card Stop')) {
                const call = createElement('a', '', 'Bel 078 170 170');
                call.href = 'tel:+3278170170';
                card.append(document.createElement('br'), call);
            }
            emergencyResources.append(card);
        });

        let scamQuestionIndex = 0;
        let scamScore = 0;
        let scamCompleted = false;
        try {
            const storedScam = JSON.parse(localStorage.getItem(scamScoreKey) || '{}');
            scamCompleted = storedScam.index >= QUIZ_QUESTIONS.length;
            scamQuestionIndex = Number.isInteger(storedScam.index) && !scamCompleted
                ? storedScam.index
                : 0;
            scamScore = Number.isFinite(storedScam.score)
                ? Math.min(storedScam.score, QUIZ_QUESTIONS.length)
                : 0;
        } catch {
            scamQuestionIndex = 0;
            scamScore = 0;
        }
        const quiz = document.querySelector('#scam-quiz-content');
        if (scamCompleted) renderScamResult();
        else renderScamQuestion();

        function renderScamQuestion() {
            quiz.replaceChildren();
            const question = QUIZ_QUESTIONS[scamQuestionIndex];
            const progress = createElement('div', 'quiz-progress');
            progress.append(
                createElement('span', '', `Vraag ${scamQuestionIndex + 1} van ${QUIZ_QUESTIONS.length}`),
                createElement('span', '', `Score ${scamScore}`)
            );
            const track = createElement('div', 'progress-track');
            track.setAttribute('role', 'progressbar');
            track.setAttribute('aria-valuemin', '0');
            track.setAttribute('aria-valuemax', String(QUIZ_QUESTIONS.length));
            track.setAttribute('aria-valuenow', String(scamQuestionIndex + 1));
            const fill = createElement('span');
            fill.style.width = `${((scamQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;
            track.append(fill);
            progress.append(track);

            const scenario = createElement('p', 'quiz-scenario', question.scenario);
            const choices = createElement('div', 'quiz-choices');
            question.answers.forEach((answer, index) => {
                const button = createElement('button', 'quiz-answer', answer);
                button.type = 'button';
                button.addEventListener('click', () => submitScamAnswer(index, choices));
                choices.append(button);
            });
            quiz.append(progress, scenario, choices);
            document.querySelector('#scam-progress-score').textContent = `${scamScore} / ${QUIZ_QUESTIONS.length}`;
        }

        function submitScamAnswer(answerIndex, choices) {
            const question = QUIZ_QUESTIONS[scamQuestionIndex];
            const correct = answerIndex === question.correct;
            if (correct) scamScore += 1;
            localStorage.setItem(scamScoreKey, JSON.stringify({
                index: scamQuestionIndex,
                score: scamScore
            }));
            choices.querySelectorAll('button').forEach((button, index) => {
                button.disabled = true;
                if (index === question.correct) button.classList.add('correct');
                else if (index === answerIndex) button.classList.add('incorrect');
            });

            const feedback = createElement('div', `quiz-feedback ${correct ? 'correct' : 'incorrect'}`);
            feedback.setAttribute('role', 'status');
            feedback.append(
                createElement('strong', '', correct ? 'Goed gezien!' : 'Niet helemaal.')
            );
            feedback.append(
                createElement('p', '', question.explanation),
                createElement('p', '', `Veiligste antwoord: ${question.answers[question.correct]}`)
            );
            quiz.append(feedback);

            const next = createElement(
                'button',
                'quiz-next',
                scamQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Bekijk resultaat' : 'Volgende situatie'
            );
            next.type = 'button';
            next.addEventListener('click', () => {
                scamQuestionIndex += 1;
                if (scamQuestionIndex < QUIZ_QUESTIONS.length) {
                    localStorage.setItem(scamScoreKey, JSON.stringify({
                        index: scamQuestionIndex,
                        score: scamScore
                    }));
                    renderScamQuestion();
                } else {
                    localStorage.setItem(scamScoreKey, JSON.stringify({
                        index: QUIZ_QUESTIONS.length,
                        score: scamScore
                    }));
                    renderScamResult();
                }
            });
            quiz.append(next);
            document.querySelector('#scam-progress-score').textContent = `${scamScore} / ${QUIZ_QUESTIONS.length}`;
        }

        function renderScamResult() {
            quiz.replaceChildren();
            quiz.append(
                createElement('h3', '', `${scamScore} van de ${QUIZ_QUESTIONS.length} goed`),
                createElement('p', '', 'Herkenning wordt sterker door kalm te blijven, onverwachte aanvragen te controleren en accountcodes nooit te delen.')
            );
            const restart = createElement('button', 'quiz-next', 'Opnieuw oefenen');
            restart.type = 'button';
            restart.addEventListener('click', () => {
                scamQuestionIndex = 0;
                scamScore = 0;
                localStorage.setItem(scamScoreKey, JSON.stringify({
                    index: 0,
                    score: 0
                }));
                renderScamQuestion();
            });
            quiz.append(restart);
        }
    }

    function initLanguageAcademy() {
        const languageGrid = document.querySelector('#language-grid');
        const languageHome = document.querySelector('#language-home');
        const dashboard = document.querySelector('#language-dashboard');
        const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
        let activeLesson = null;
        let flashcards = [];
        let flashcardIndex = 0;
        let flashcardShowingAnswer = false;
        let languageQuizQuestions = [];
        let languageQuizIndex = 0;
        let languageQuizScore = 0;

        const languageCards = [
            ['english', '🇬🇧', 'Engels', 'Alledaagse gesprekken, vragen en reizen.'],
            ['chinese', '🇨🇳', 'Mandarijn', 'Hanzi, Pinyin, tonen en basiszinnen.'],
            ['korean', '🇰🇷', 'Koreaans', 'Hangul, romanisatie en beleefde taal.'],
            ['kinyarwanda', '🇷🇼', 'Kinyarwanda', 'Basiswoorden, begroeting en dagelijks gebruik.']
        ];

        languageCards.forEach(([id, flag, name, description]) => {
            const card = createElement('article', 'language-card');
            card.append(
                createElement('span', 'language-icon', flag),
                createElement('h3', '', name),
                createElement('p', '', description)
            );
            const button = createElement('button', 'button primary', 'Start leren');
            button.type = 'button';
            button.addEventListener('click', () => openLanguageLesson(id));
            card.append(button);
            languageGrid.append(card);
        });

        document.querySelector('#back-to-languages').addEventListener('click', () => {
            dashboard.hidden = true;
            languageHome.hidden = false;
        });

        document.querySelectorAll('.language-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.language-tab').forEach(item => {
                    const selected = item === tab;
                    item.classList.toggle('active', selected);
                    item.setAttribute('aria-selected', String(selected));
                });
                document.querySelectorAll('.language-panel').forEach(panel => {
                    panel.hidden = panel.id !== tab.dataset.panel;
                });
            });
        });

        function openLanguageLesson(languageId) {
            activeLesson = LESSONS[languageId];
            languageHome.hidden = true;
            dashboard.hidden = false;
            document.querySelector('#language-eyebrow').textContent = `${activeLesson.flag} ${activeLesson.dutchName}`;
            document.querySelector('#language-dashboard-title').textContent = activeLesson.dutchName;

            const guide = document.querySelector('#language-guide');
            guide.replaceChildren();
            activeLesson.alphabetGuide.split('\n\n').forEach(paragraph => {
                guide.append(createElement('p', '', paragraph));
            });

            ['language-vocabulary-category', 'language-flashcard-category', 'language-quiz-category']
                .forEach(id => fillLanguageCategory(id));

            renderLanguageVocabulary('all');
            startFlashcards('all');
            startLanguageQuiz('all');

            document.querySelectorAll('.language-tab').forEach((tab, index) => {
                if (index === 0) tab.click();
            });
        }

        function fillLanguageCategory(selectId) {
            const select = document.querySelector(`#${selectId}`);
            select.replaceChildren();
            select.append(createElement('option', '', 'Alle thema’s'));
            select.options[0].value = 'all';
            activeLesson.categories.forEach(category => {
                const option = createElement('option', '', category.title);
                option.value = category.title;
                select.append(option);
            });
        }

        function languageCategoryItems(title) {
            if (title === 'all') return activeLesson.categories.flatMap(category => category.items);
            const category = activeLesson.categories.find(item => item.title === title);
            return category ? category.items : [];
        }

        document.querySelector('#language-vocabulary-category').addEventListener('change', event => {
            renderLanguageVocabulary(event.target.value);
        });
        document.querySelector('#language-flashcard-category').addEventListener('change', event => {
            startFlashcards(event.target.value);
        });
        document.querySelector('#language-quiz-category').addEventListener('change', event => {
            startLanguageQuiz(event.target.value);
        });

        function renderLanguageVocabulary(categoryTitle) {
            const grid = document.querySelector('#language-vocabulary');
            grid.replaceChildren();
            languageCategoryItems(categoryTitle).forEach(item => {
                const card = createElement('article', 'vocabulary-card');
                const heading = createElement('h4', '', item.target);
                const dutch = createElement('p', 'vocabulary-dutch', item.dutch);
                card.append(
                    heading,
                    dutch,
                    createElement('p', '', `Uitspraak: ${item.phonetic}`),
                    createElement('p', '', `Letterlijk: ${item.literal}`),
                    createElement('p', '', item.exampleSentence),
                    createElement('p', '', item.grammarNote)
                );
                if (speechSupported) {
                    const speak = createElement('button', 'button audio', '🔊 Luister');
                    speak.type = 'button';
                    speak.addEventListener('click', () => speakText(item.target));
                    card.append(speak);
                }
                grid.append(card);
            });
        }

        function speakText(text) {
            if (!speechSupported) return;
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = activeLesson.speechLang;
            const prefix = activeLesson.speechLang.split('-')[0].toLowerCase();
            const voice = window.speechSynthesis.getVoices().find(item => item.lang.toLowerCase().startsWith(prefix));
            if (voice) utterance.voice = voice;
            window.speechSynthesis.speak(utterance);
        }

        function startFlashcards(categoryTitle) {
            flashcards = languageCategoryItems(categoryTitle).slice();
            flashcardIndex = 0;
            flashcardShowingAnswer = false;
            renderFlashcard();
        }

        function renderFlashcard() {
            const count = document.querySelector('#flashcard-count');
            const content = document.querySelector('#flashcard-content');
            const flip = document.querySelector('#flip-card');
            content.replaceChildren();
            if (!flashcards.length) {
                count.textContent = 'Geen woorden beschikbaar';
                flip.disabled = true;
                return;
            }
            flip.disabled = false;
            const item = flashcards[flashcardIndex];
            count.textContent = `Kaart ${flashcardIndex + 1} van ${flashcards.length}`;
            if (flashcardShowingAnswer) {
                content.append(
                    createElement('h4', '', item.target),
                    createElement('p', '', `Uitspraak: ${item.phonetic}`),
                    createElement('p', '', `Letterlijk: ${item.literal}`),
                    createElement('p', '', item.exampleSentence),
                    createElement('p', '', item.grammarNote)
                );
            } else {
                content.append(
                    createElement('p', '', 'Vertaal naar het Nederlands'),
                    createElement('h4', '', item.dutch)
                );
            }
            flip.textContent = flashcardShowingAnswer ? 'Toon vraag' : 'Toon vertaling';
        }

        document.querySelector('#flip-card').addEventListener('click', () => {
            flashcardShowingAnswer = !flashcardShowingAnswer;
            renderFlashcard();
        });
        document.querySelector('#previous-card').addEventListener('click', () => {
            if (!flashcards.length) return;
            flashcardIndex = (flashcardIndex - 1 + flashcards.length) % flashcards.length;
            flashcardShowingAnswer = false;
            renderFlashcard();
        });
        document.querySelector('#next-card').addEventListener('click', () => {
            if (!flashcards.length) return;
            flashcardIndex = (flashcardIndex + 1) % flashcards.length;
            flashcardShowingAnswer = false;
            renderFlashcard();
        });
        document.querySelector('#speak-card').addEventListener('click', () => {
            if (flashcards.length) speakText(flashcards[flashcardIndex].target);
        });

        function shuffled(items) {
            const copy = items.slice();
            for (let index = copy.length - 1; index > 0; index -= 1) {
                const swap = Math.floor(Math.random() * (index + 1));
                [copy[index], copy[swap]] = [copy[swap], copy[index]];
            }
            return copy;
        }

        function startLanguageQuiz(categoryTitle) {
            const pool = shuffled(languageCategoryItems(categoryTitle));
            languageQuizQuestions = pool.slice(0, Math.min(10, pool.length)).map(item => {
                const distractors = shuffled(pool.filter(option =>
                    option !== item && option.target !== item.target
                )).slice(0, 3);
                return { item, options: shuffled([item, ...distractors]) };
            });
            languageQuizIndex = 0;
            languageQuizScore = 0;
            renderLanguageQuiz();
        }

        function renderLanguageQuiz() {
            const quiz = document.querySelector('#language-quiz');
            quiz.replaceChildren();
            const question = languageQuizQuestions[languageQuizIndex];
            if (!question) {
                quiz.append(createElement('p', '', 'Geen vragen beschikbaar.'));
                return;
            }
            const progress = createElement('p', 'language-progress', `Vraag ${languageQuizIndex + 1} van ${languageQuizQuestions.length} · Score ${languageQuizScore}`);
            const prompt = createElement('p', 'language-quiz-prompt', question.item.dutch);
            const answers = createElement('div', 'language-quiz-answers');
            question.options.forEach(option => {
                const button = createElement('button', 'language-quiz-answer', option.target);
                button.type = 'button';
                button.addEventListener('click', () => submitLanguageAnswer(option, question, answers));
                answers.append(button);
            });
            quiz.append(progress, prompt, answers);
        }

        function submitLanguageAnswer(selected, question, answers) {
            const correct = selected === question.item;
            if (correct) languageQuizScore += 1;
            answers.querySelectorAll('button').forEach((button, index) => {
                button.disabled = true;
                const option = question.options[index];
                if (option === question.item) button.classList.add('correct');
                else if (option === selected) button.classList.add('incorrect');
            });
            const feedback = createElement('div', `language-quiz-feedback ${correct ? 'correct' : 'incorrect'}`);
            feedback.append(
                createElement('strong', '', correct ? 'Goed gedaan!' : 'Nog eens oefenen'),
                createElement('p', '', `${question.item.target} betekent ${question.item.dutch}. Uitspraak: ${question.item.phonetic}.`),
                createElement('p', '', question.item.exampleSentence),
                createElement('p', '', question.item.grammarNote)
            );
            const next = createElement(
                'button',
                'button primary',
                languageQuizIndex === languageQuizQuestions.length - 1 ? 'Bekijk resultaat' : 'Volgende vraag'
            );
            next.type = 'button';
            next.addEventListener('click', () => {
                languageQuizIndex += 1;
                if (languageQuizIndex < languageQuizQuestions.length) renderLanguageQuiz();
                else renderLanguageResult();
            });
            feedback.append(next);
            document.querySelector('#language-quiz').append(feedback);
        }

        function renderLanguageResult() {
            const quiz = document.querySelector('#language-quiz');
            quiz.replaceChildren();
            quiz.append(
                createElement('h3', '', `Je hebt ${languageQuizScore} van de ${languageQuizQuestions.length} goed.`),
                createElement('p', '', 'Herhaal moeilijke woorden met de flashcards en luister meerdere keren naar de uitspraak.')
            );
            const restart = createElement('button', 'button primary', 'Opnieuw oefenen');
            restart.type = 'button';
            restart.addEventListener('click', () => startLanguageQuiz(document.querySelector('#language-quiz-category').value));
            quiz.append(restart);

            const progress = JSON.parse(localStorage.getItem(languageProgressKey) || '{}');
            progress[activeLesson.dutchName] = {
                score: languageQuizScore,
                total: languageQuizQuestions.length,
                completedAt: new Date().toISOString()
            };
            localStorage.setItem(languageProgressKey, JSON.stringify(progress));
        }
    }
});
