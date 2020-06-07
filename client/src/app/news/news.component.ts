import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { ConfigService } from '../shared/config.service';
import { News } from './news';
import { NewsService } from './news.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    category: string;
    news: News[];
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private newsService: NewsService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { 
        // override the route reuse strategy
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        }
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
            // trick the Router into believing it's last link wasn't previously loaded
            this.router.navigated = false;
            // if you need to scroll back to top, here is the right place
            window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        switch(this.activatedRoute.snapshot.paramMap.get('category')) {
            case 'tin-moi-nhat':
                this.category = 'Tin mới nhất';
                break;
            case 'thoi-su':
                this.category = 'Thời sự';
                break;
            case 'the-gioi':
                this.category = 'Thế giới';
                break;
        }
        this.newsService.fetchNews(this.authService.authorizationHeaderValue, this.activatedRoute.snapshot.paramMap.get('category'))
            .subscribe(result => {
                this.news = result;
            }, error => console.error(error));
    }
}
