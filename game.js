Vue.config.devtools = true;

var cardsBack = '❓';

var vm = new Vue({
      el: '#root',
      data: function() {
        return {
          cards: ['🦀', '🦁', '🦂', '🦃',
                  '🦄', '🦅', '🦆', '🦇',
                  '🦈', '🦉', '🦊', '🦋',
                  '🦌', '🦍', '🦎', '🦏',
                  '🦐', '🦑', '🦒', '🦓',
                  '🦔', '🦕', '🦖',
          ],
          cardsDeck: [],
          showCards: {
            card0: cardsBack,
            card1: cardsBack,
            card2: cardsBack,
            card3: cardsBack,
            card4: cardsBack,
            card5: cardsBack,
            card6: cardsBack,
            card7: cardsBack,
            card8: cardsBack,
            card9: cardsBack,
            card10: cardsBack,
            card11: cardsBack,
            card12: cardsBack,
            card13: cardsBack,
            card14: cardsBack,
            card15: cardsBack,
          },
          flippedCardsCounter: 0,
          flippedCards: [],
          flippedCardsSymbols: [],
          twoCards: false,
          matchedCards: [],
          userScore: 0,
        }
      },

      created: function() {
        this.shuffleCards();
      },
      methods: {
        shuffleCards: function() {
            cardsInUse = _.shuffle(this.cards) .slice(0, 8);
            cardsInUse = [].concat(cardsInUse, cardsInUse);
            this.cardsDeck = _.shuffle(cardsInUse);
        },
        setupCards: function() {
          that = this;
          that.flippedCards.forEach(function(c){
            if (!that.matchedCards.includes(c)){
              that.showCards[c] = cardsBack;
            }
          })
          this.flippedCards = [];
          this.flippedCardsSymbols = [];
          this.flippedCardsCounter = 0;
          this.twoCards = false;
        },
        exposeCard: function(flippedCard) {
          var cardNumber = parseInt(flippedCard.split('card')[1]);
          this.showCards[flippedCard] = this.cardsDeck[cardNumber];
        },
        restartGame: function() {
          that = this;
          Object.keys(that.showCards).forEach(function(c){
            that.showCards[c] = cardsBack;
          });
          this.shuffleCards();
          this.flippedCards = [];
          this.flippedCardsSymbols = [];
          this.flippedCardsCounter = 0;
          this.twoCards = false;
          this.matchedCards = [];
          this.userScore = 0;
        },
        coverCard: function(flippedCard) {
          this.showCards[flippedCard] = cardsBack;
        },
        coverCards: function() {
          this.setupCards();
        },
        flipCard: function(event) {
          var flippedCard = event.currentTarget.id;
          if (!this.twoCards & !this.matchedCards.includes(flippedCard)) {
              if (this.flippedCards[0] != flippedCard) {
                this.exposeCard(flippedCard);
                this.flippedCardsCounter += 1;
                this.flippedCards.push(flippedCard);
                var cardValue = this.cardsDeck[parseInt(flippedCard.split(
                  'card')[1])];
                this.flippedCardsSymbols.push(cardValue);
                if (this.flippedCardsCounter >= 2) {
                  this.twoCards = true;
                  if (this.flippedCardsSymbols[0] == this.flippedCardsSymbols[1]) {
                    this.matchedCards = this.matchedCards.concat(this.flippedCards);
                    this.userScore += 1;
                    this.setupCards();
                  }
                }
              }
            else {
              this.coverCard(flippedCard);
              this.flippedCards = [];
              this.flippedCardsSymbols = [];
              this.flippedCardsCounter = 0;
            }
            }
          }
        },
      });
