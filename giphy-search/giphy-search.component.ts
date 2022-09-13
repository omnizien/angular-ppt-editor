import { Component, OnInit } from '@angular/core';
import { GifsService } from './services/gifs/gifs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-giphy-search',
  templateUrl: './giphy-search.component.html',
  styleUrls: ['./giphy-search.component.css']
})
export class GiphySearchComponent implements OnInit {
  public searchValue: string;

  constructor(
    private gifsService: GifsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchValue = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ q }) => {
      this.searchValue = q;
    });
  }

  handleSearchGifs($event: string) {
   this.router.navigate(['/search'], { queryParams: { q: $event } });
  }
}
