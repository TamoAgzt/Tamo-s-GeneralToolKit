import { Component } from '@angular/core';
import { newsArticle, newsArticles } from '../../assets/news';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  articles: newsArticle[] = [...newsArticles]; // Clone the array to preserve original data
  usedArticles: newsArticle[] = [];
  selectedInterval: any; // Interval timer reference

  constructor() {
    // Start the periodic selection
    this.startPeriodicSelection(150000); // Change the interval duration as needed
  }

  startPeriodicSelection(interval: number) {
    this.selectedInterval = setInterval(() => {
      if (this.articles.length === 0) {
        // All articles have been used, stop the periodic selection
        clearInterval(this.selectedInterval);
      } else {
        this.selectRandomArticle();
      }
    }, interval);
  }

  selectRandomArticle() {
    if (this.articles.length === 0) {
      return; // All articles have been used, exit early
    }

    // Get a random index within the current list of articles
    const randomIndex = Math.floor(Math.random() * this.articles.length);

    // Select the article at the random index
    const selectedArticle = this.articles[randomIndex];

    // Remove the selected article from the list
    this.articles.splice(randomIndex, 1);

    // Mark the article as used and add it to the used articles list
    this.usedArticles.push(selectedArticle);

    console.log('Selected Article:', selectedArticle);
  }

  get reversedUsedArticles(): newsArticle[] {
    return this.usedArticles.slice().reverse();
  }
}
