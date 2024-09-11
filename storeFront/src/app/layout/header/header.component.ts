import { Component } from '@angular/core';
import { AboutUsRoutingModule } from '../../modules/about-us/about-us-routing.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AboutUsRoutingModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
