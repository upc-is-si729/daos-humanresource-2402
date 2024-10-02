import {Component, input, InputSignal, output, signal} from '@angular/core';
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenav } from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

export interface HeaderOption {
  icon: string;
  path: string;
  title: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, LanguageSwitcherComponent, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Human Resource';
  // Input Signals
  sidenav: InputSignal<MatSidenav>  = input.required<MatSidenav>();
  sidenavCollapsed: InputSignal<boolean> = input.required();
  // Output Signals
  onChangeModeSidenavFromHeader = output();

  options = signal<HeaderOption[]>([
    { icon: 'home', path: '/home', title: 'Home'},
    { icon: 'info', path:'/about', title: 'About'}
  ]);

  changeModeSidenav(): void {
    this.onChangeModeSidenavFromHeader.emit();
  }
}
