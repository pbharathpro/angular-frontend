import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//*****<this is for filtering product dynamically it refresh UI After every letter searched>*****
export class SearchService {
  private searchTerm = new BehaviorSubject<string>(''); 
  currentSearchTerm = this.searchTerm.asObservable(); //encapsulation 

  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}