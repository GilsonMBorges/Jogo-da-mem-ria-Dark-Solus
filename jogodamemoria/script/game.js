let game = {

    darkSouls: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],

    cards: null,

    lockMode: false,
    firstCard: null,
    secondCard: null,


    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;

        }
        return this.firstCard.icon === this.secondCard.icon;

    },

    clearCards: function () {

        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();

    },



    createCardsDarkSouls: function () {

        this.cards = [];

        this.darkSouls.forEach((souls) => {
            this.cards.push(this.createPairCarksDarkSouls(souls));
        })

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards
    },

    createPairCarksDarkSouls: function (souls) {

        return [{
            id: this.createIdDarkSouls(souls),
            icon: souls,
            flipped: false,
        }, {
            id: this.createIdDarkSouls(souls),
            icon: souls,
            flipped: false,
        }]

    },
    createIdDarkSouls: function (souls) {

        return souls + parseInt(Math.random() * 1000);
    },


    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }


    },

    checkGameOver(){

        return this.cards.filter(card =>!card.flipped).length==0;

    }

}