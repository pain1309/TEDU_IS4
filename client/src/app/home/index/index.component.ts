import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from '../home.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { UserInfo } from '../user';
declare let jsPDF;
import 'jspdf-autotable';
import alertifyjs from 'alertifyjs';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    isAuthenticated: boolean = false;
    countNews: number;
    users: UserInfo[];

    constructor(
        private homeService: HomeService,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
        if (this.isAuthenticated) {
            this.homeService.fetchDataUser(this.authService.authorizationHeaderValue)
                .subscribe(result => {
                    this.users = result;
                    console.log(this.users);
                });
        }
    }
    headRows() {
        return [{ id: 'ID', name: 'Name', email: 'Email', phone: 'PhoneNumber' }];
    }

    bodyRows(rowCount) {
        rowCount = rowCount || 10;
        let body = [];
        this.users.forEach(element => {
            body.push({
                id: element.id,
                name: element.userName,
                email: element.email,
                city: element.phoneNumber
            });
        });
        return body;
    }
    public SavePDF(): void {
        var doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('With content', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

        doc.autoTable({
            head: this.headRows(),
            body: this.users != null ? this.bodyRows(this.users.length) : null,
            startY: 50,
            showHead: 'firstPage'
        });

        doc.save('table.pdf');
    }

    public crawlData(): void {
        this.homeService.crawlData(this.authService.authorizationHeaderValue).subscribe(result => {
            this.countNews = result.length;
            this.alertifyService.success('Have ' + this.countNews + ' news have been crawled');
        });
    }
}
