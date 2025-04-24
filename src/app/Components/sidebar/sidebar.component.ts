import {Component} from '@angular/core';
import {SharedDataService} from "../../Services/shared-data.service";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent   {

  public appPages = [
    { title: 'Current', url: 'current', icon: 'today' },
    { title: 'Hourly', url: 'hourly', icon: 'time' },
    { title: 'Daily', url: 'daily', icon: 'calendar' },
    { title: 'Sunrise/Sunset', url: 'sun-rise-set', icon: 'sunny' },
    { title: 'Maps', url: 'maps', icon: 'map' },
  ];

  constructor(public sharedDataService: SharedDataService, private authService : AuthService, private router : Router) {}

  navigateTo(component: string) {
    this.sharedDataService.setActiveComponent(component);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
