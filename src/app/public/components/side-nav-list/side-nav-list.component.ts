import {Component, computed, input, InputSignal, output, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatAnchor} from "@angular/material/button";
import {animate, style, transition, trigger} from "@angular/animations";

export interface SideNavOption {
  icon: string;
  path?: string;
  title: string;
  subOptions?: SideNavOption[];
}

@Component({
  selector: 'app-side-nav-list',
  standalone: true,
  animations: [
    trigger('openSubOption', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('500ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('500ms ease-in-out', style({ height: '0', opacity: 0 }))
      ])
    ])
  ],
  imports: [RouterLink, MatIconModule, MatSidenavModule, MatDividerModule, MatListModule, MatAnchor, RouterLinkActive],
  templateUrl: './side-nav-list.component.html',
  styleUrl: './side-nav-list.component.css'
})
export class SideNavListComponent {

  // Input Signals
  sidenav: InputSignal<MatSidenav>  = input.required<MatSidenav>();
  sidenavCollapsed: InputSignal<boolean> = input.required();
  // Computed Signals
  imgSize = computed(() => this.sidenavCollapsed() ? '32px' : '100px');
  // Output Signals
  onChangeModeSidenavFromList = output();
  // Signals
  optionOpened = signal(false);

  options = signal<SideNavOption[]>([
    { icon: 'home', path: '/home', title: 'Home'},
    { icon: 'dashboard', path: '/dashboard', title: 'Dashboard'},
    { icon: 'info', path: '/ubigeo', title: 'Ubigeo',
      subOptions: [
        { icon: 'flag', path: '/ubigeo/countries', title: 'Countries'},
        { icon: 'location_city', path: '/ubigeo/locations', title: 'Locations'}
      ] },
    { icon: 'info', path:'/about', title: 'About'}
  ]);

  onChangeModeSidenav(): void {
    this.onChangeModeSidenavFromList.emit();
  }

  onOpenAndCloseSubOption(option: SideNavOption): void {
    if (option.subOptions) {
      this.optionOpened.set(!this.optionOpened());
    }
  }
}
