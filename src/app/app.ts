import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private pokemonService = inject(PokemonService);
  totalCount = signal(0);

  ngOnInit(): void {
    this.pokemonService.getList(1, 0).subscribe((res) => {
      this.totalCount.set(res.count);
    });
  }
}
