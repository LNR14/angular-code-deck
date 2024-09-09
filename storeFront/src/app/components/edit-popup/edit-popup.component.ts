import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Input() product: Product = {
    price: '',
    name: '',
    image: '',
    rating: 0,
  };

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.confirm.emit(this.product);
  }

  onCancel() {
    // this.cancel.emit();
    this.displayChange.emit(this.display);
    this.display = false;
  }
}
