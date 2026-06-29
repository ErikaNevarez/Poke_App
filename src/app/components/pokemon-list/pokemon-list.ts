import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListItem } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList implements OnInit {
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  pokemons = signal<PokemonListItem[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = 20;
  loading = signal(false);

  get totalPages(): number {
    return Math.ceil(this.totalCount() / this.pageSize);
  }

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    const offset = (page - 1) * this.pageSize;

    this.pokemonService.getList(this.pageSize, offset).subscribe({
      next: (response) => {
        this.pokemons.set(response.results);
        this.totalCount.set(response.count);
        this.currentPage.set(page);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  getPokemonId(url: string): number {
    const segments = url.split('/').filter(Boolean);
    return Number(segments[segments.length - 1]);
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  goToDetail(url: string): void {
    const id = this.getPokemonId(url);
    this.router.navigate(['/pokemon', id]);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.loadPage(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages) {
      this.loadPage(this.currentPage() + 1);
    }
  }
}
