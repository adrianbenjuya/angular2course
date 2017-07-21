import { Directive, ElementRef, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';

@Directive({ selector: '[mark]' })
export class MarkDirective implements AfterViewInit, OnChanges {

    private value: String;
    @Input('mark') match: string = "";

    constructor(private el: ElementRef) {
        if (!this.el.nativeElement.classList.contains("marked_text")) {
            this.el.nativeElement.classList.add("marked_text");
        }
    }

    ngAfterViewInit(): void {
        this.value = new String(this.el.nativeElement.innerHTML);
        this.doMatch();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.doMatch();
    }

    private doMatch(): void {
        if (this.value && this.value.length && this.match && this.match.length) {
            this.el.nativeElement.innerHTML = this.value.replace(new RegExp("(" + this.pregQuote(this.match) + ")", 'gi'), '<mark>$1</mark>');
        }
        else if (this.value && this.value.length) {
            this.el.nativeElement.innerHTML = this.value;
        }
    }

    // http://stackoverflow.com/questions/280793/case-insensitive-string-replacement-in-javascript
    private pregQuote(str: string): string {
        return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
    }
}