import AudioController from './AudioController.js'

export default class MixOrMatch {
   constructor(totalTime, cards) {
      this.cardsArray = cards;
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById('time-remaining');
      this.ticker = document.getElementById('flips');
      this.audioController = new AudioController();
   }
   startGame() {
      this.cardToCheck = null;
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
      this.matchedCards = [];
      this.busy = true;

      setTimeout(() => {
         this.audioController.startMusic();
         this.shuffleCards();
         this.countDown = this.startCountDown();
         this.busy = false;
      }, 500);

      this.hideCards();
      this.timer.innerText = this.timeRemaining;
      this.ticker.innerText = this.totalClicks
   }
   hideCards() {
      this.cardsArray.forEach(card => {
         card.classList.remove('visible');
         card.classList.remove('matched');
      });
   }
   flipCard(card) {
      if (this.canFlipCard(card)) {
         this.audioController.flip();
         this.totalClicks++;
         this.ticker.innerText = this.totalClicks;
         card.classList.add('visible');

         if (this.cardToCheck)
            this.checkForCardMatched(card);
         else
            this.cardToCheck = card;
      }
   }
   checkForCardMatched(card) {
      if (this.getCardType(card) === this.getCardType(this.cardToCheck))
         this.cardMatch(card, this.cardToCheck);
      else
         this.cardMisMatch(card, this.cardToCheck);

      this.cardToCheck = null;
   }
   cardMatch(card1, card2) {
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.audioController.match();
      if (this.matchedCards.length === this.cardsArray.length)
         this.victory();
   }
   cardMisMatch(card1, card2) {
      this.busy = true;
      setTimeout(()=>{
         card1.classList.remove('visible');
         card2.classList.remove('visible');
         this.busy = false;
      }, 1000)
   }
   getCardType(card) {
      return card.getElementsByClassName('card-value')[0].src;
   }
   startCountDown() {
      return setInterval(() => {
         this.timeRemaining--;
         this.timer.innerText = this.timeRemaining;
         if (this.timeRemaining === 0) {
            this.gameOver();
         }
      }, 1000);
   }
   gameOver() {
      clearInterval(this.countDown);
      this.audioController.gameOver();
      document.getElementById('game-over-text').classList.add('visible');
   }
   victory() {
      clearInterval(this.countDown);
      this.audioController.victory();
      document.getElementById('victory-text').classList.add('visible');
      this.hideCards();
   }
   shuffleCards() {
      for (let i = this.cardsArray.length - 1; i > 0; i--) {
         let randomIndex = Math.floor(Math.random() * (i + 1));
         this.cardsArray[randomIndex].style.order = i;
         this.cardsArray[i].style.order = randomIndex;
      }
   }
   canFlipCard(card) {
       return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
   }
}