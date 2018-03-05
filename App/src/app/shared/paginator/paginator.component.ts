import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

	pageList: number[] = [1];
	_currPage: number = 1;
	_pageCount: number = 1;

	@Input() set pageCount(value: number) {
		this._pageCount = value || 1;
		this.loadPageList();
	}
	@Input() set currentPage(value: number) {
		this._currPage = value || 1;
		this.loadPageList();
	}
	@Output() currentPageChanged: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit() {
		this.loadPageList();
	}


	changePage(page: number) {
		if (page < 1)
			return;

		if (page > 1 && page > this._pageCount)
			return;

		if (this._currPage == page)
			return;

		this._currPage = page;

		this.currentPageChanged.emit(this._currPage);
	}

	private loadPageList(): void {
		if (this._pageCount < 1)
			this._pageCount = 1;

		let pages = [1];

		for (let p = 2; p <= this._pageCount; p++)
			pages.push(p);

		this.pageList = pages;
	}
}
