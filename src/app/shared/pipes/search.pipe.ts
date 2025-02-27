import { Pipe, PipeTransform } from '@angular/core';
import { INotes } from '../interfaces/inotes';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(allNotes: INotes[], term: string): INotes[] {
    return allNotes.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
