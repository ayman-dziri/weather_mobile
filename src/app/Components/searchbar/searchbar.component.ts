import {Component, EventEmitter, Output} from '@angular/core';
import {Farm, WeatherData} from "../../Models/weather.interfaces";
import {DataService} from "../../Services/data.service";
import {SharedDataService} from "../../Services/shared-data.service";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  standalone: false,
})
export class SearchbarComponent {
  @Output() weatherDataSelected = new EventEmitter<WeatherData>();

  allFarms: Farm[] = [];
  filteredFarms: Farm[] = [];
  searchText: string = '';
  showList: boolean = false;
  isLoading: boolean = false;

  constructor(private dataService: DataService, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.loadUserFarms();
  }
  onSearchFocus() {
    this.showList = true;
    if (this.allFarms.length === 0) {
      this.isLoading = true;
    }
  }

  loadUserFarms() {
    this.isLoading = true; // Activer le loading au début du chargement
    this.dataService.getWeatherData().subscribe({
      next: (data) => {
        if (data.users && data.users.length > 0) {
          this.allFarms = data.users[0].farms;
          this.filteredFarms = [...this.allFarms];
        }
        this.isLoading = false; // Désactiver le loading une fois chargé
      },
      error: (err) => {
        console.error('Erreur chargement fermes:', err);
        this.isLoading = false; // Désactiver le loading en cas d'erreur
      }
    });
  }

  filterItems() {
    const query = this.searchText.toLowerCase().trim();
    this.filteredFarms = this.allFarms.filter(farm =>
      farm.name.toLowerCase().includes(query)
    );
  }

  onItemSelected(farm: Farm) {
    this.sharedDataService.setCurrentLand(farm);
    this.showList = false;
    this.searchText = farm.name;
  }

  closeList() {
    this.showList = false;
  }

}
