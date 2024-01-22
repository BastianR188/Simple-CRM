import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
    RouterModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private router: Router) {}

  isLinkActive(route: string) {
    return this.router.url === route;
  }
  onResize(event: any) {
    if (event.target.innerWidth < 780) {
      this.drawer.close();
    }
  }
  sidenavToggle() {
    const width = document.documentElement.clientWidth;
    if (width < 780) {
      this.drawer.close();
    }
  }
}
