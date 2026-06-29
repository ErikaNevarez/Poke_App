import { Routes } from '@angular/router';
import { PokemonList } from './components/pokemon-list/pokemon-list';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  { path: 'pokemon', component: PokemonList },
];
