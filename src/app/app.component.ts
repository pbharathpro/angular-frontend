import { Component } from '@angular/core';
import { SearchService } from './Services/search.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private searchService: SearchService) {}
  title = 'online-retail';
  onSearch(searchTerm: string) {
    this.searchService.updateSearchTerm(searchTerm.trim());
  } 
}
