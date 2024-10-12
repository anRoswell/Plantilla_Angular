import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search', standalone: true })
export class SearchPipe implements PipeTransform {
  transform(items: any[], search: string): any[] {
    if (!search) {
      return items;
    }

    return items.filter((item) => {
      return Object.values(item).some((value) => {
        const strValue = String(value);
        return strValue.toLowerCase().includes(search.toLowerCase());
      });
    });
  }
}
