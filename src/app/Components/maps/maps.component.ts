import {Component, Input} from '@angular/core';
import {SharedDataService} from "../../Services/shared-data.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  standalone: false
})
export class MapsComponent {

  @Input() landName: string = 'name of your land';
  public safeMapUrl: SafeResourceUrl;
  private defaultCoords = { lat: 12.5, lng: -5.5 };

  constructor(
    private sharedDataService: SharedDataService,
    private sanitizer: DomSanitizer
  ) {
    this.safeMapUrl = this.generateSafeUrl(this.defaultCoords.lat, this.defaultCoords.lng);
  }

  ngOnInit(): void {
    this.sharedDataService.currentLandData$.subscribe(data => {
      if (data?.land) {
        this.landName = data?.land.name;
        const lat = data.land.centerX ?? this.defaultCoords.lat;
        const lng = data.land.centerY ?? this.defaultCoords.lng;
        this.safeMapUrl = this.generateSafeUrl(lat, lng);
      }
    });
  }

  private generateSafeUrl(lat: number, lng: number): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
