import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsTableComponent } from "./components/products-table/products-table.component";
import { MaterialModule } from './material/Material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsTableComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Evoltis-Challenge-Front';
}
