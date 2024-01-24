import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { MyServiceService } from './firestore.service';

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
    LoginComponent,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  isSmallScreen = false;
  logIn: boolean = false;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public service: MyServiceService
  ) {
    
  }
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map((result: { matches: any }) => result.matches),
        shareReplay()
      )
      .subscribe((matches) => {
        this.isSmallScreen = matches;
      });
  }

  @HostListener('window:resize', ['$event'])
  isLinkActive(route: string) {
    return this.router.url.startsWith(route);
  }

  sidenavToggle() {
    const width = document.documentElement.clientWidth;
    if (width < 780) {
      this.drawer.close();
    }
  }
}
