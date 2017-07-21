import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        let text: string = args[0];
        if (!text || !text.length) {
            return value;
        }

        let property: string = args[1];
        let filteredElements: any[] = [];

        (value as Array<any>).forEach((el: any) => {
            if (this.matches(el[property], text)) {
                filteredElements.push(el);
            }
        });

        return filteredElements;
    }

    private matches(text1: string, text2: string): boolean {
        return text1.toLocaleLowerCase().trim().indexOf(text2.toLocaleLowerCase().trim()) >= 0;
    }
}
