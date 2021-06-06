import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userLoggedIn: boolean;
  userAuthdSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userLoggedIn = this.authService.getIsUserLoggedIn();
    this.userAuthdSub = this.authService.getUserAuthd()
    .subscribe((value) => {
      this.userLoggedIn = value;
    });
  }

  userLogOut(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userAuthdSub.unsubscribe();
  }

}
