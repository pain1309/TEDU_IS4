import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { ConfigService } from '../shared/config.service';
import { News } from './news';
import { NewsService } from './news.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-index',
    templateUrl: './new-detail.component.html',
    styleUrls: ['./new-detail.component.scss']
})
export class NewDetailComponent implements OnInit {
    new: News;
    id?: number;
    data: any;
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private newsService: NewsService,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.newsService.fetchNewDetail(this.authService.authorizationHeaderValue, +this.activatedRoute.snapshot.paramMap.get('id'))
            .subscribe(result => {
                this.new = result;
                this.data = this.sanitizer.bypassSecurityTrustHtml(this.new.content);
            }, error => console.error(error));
    }
}
