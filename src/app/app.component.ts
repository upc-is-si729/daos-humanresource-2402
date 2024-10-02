import {Component, computed, signal, Signal, viewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from "@angular/cdk/layout";
import { TranslateService } from "@ngx-translate/core";
import { HeaderComponent} from "./public/components/header/header.component";
import { SideNavListComponent } from "./public/components/side-nav-list/side-nav-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatSidenavModule, HeaderComponent, SideNavListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'Human Resource';
  // MatSidenav
  sidenav: Signal<MatSidenav> = viewChild.required(MatSidenav);
  // Signals
  sidenavCollapsed = signal(false);  // Expanded by default
  // Computed Signals
  sidenavWith = computed(() => this.sidenavCollapsed() ? '55px' : '200px');

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)']) // Observ the width of the screen
      .subscribe((response) => {  // Subscribe to the response
        if (response.matches) { // If the screen is less than 1280px
          this.sidenavCollapsed.set(true); // Colapse the sidenav
        } else {
          this.sidenavCollapsed.set(false); // Expand the sidenav
          this.sidenav().mode = 'side'; // Set the mode to side
        }
      });
  }

  // UI Event Handlers
  onChangeModeSidenavFromHeader(): void {
    this.sidenav().open();  // Open the sidenav
    if(this.sidenav().mode === 'over') {  // If the mode is over
      this.sidenavCollapsed.set(true);  // Collapse the sidenav
      this.sidenav().mode = 'side';   // Set the mode to side
    } else {    // If the mode is side
      this.sidenavCollapsed.set(false); // Expand the sidenav
      this.sidenav().mode = 'over'; // Set the mode to over
    }
  }

  onChangeModeSidenavFromList(): void {
    this.sidenav().open();  // Open the sidenav
    // If Not collapsed (expanded) and the mode is over
    if(!this.sidenavCollapsed() && this.sidenav().mode === 'over') {
      this.sidenavCollapsed.set(true);  // Collapse the sidenav
      this.sidenav().mode = 'side'; // Set the mode to side
    }
  }
}
