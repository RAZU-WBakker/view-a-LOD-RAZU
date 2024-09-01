import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-range',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-range.component.html',
  styleUrls: ['./multi-range.component.scss']
})
export class MultiRangeSliderComponent implements OnInit {
  userMin: number = 1355;
  userMax: number = 2000;
  min: number = 1300;
  max: number = 2024;
  minthumb: number = 0;
  maxthumb: number = 0;

  ngOnInit(): void {
    this.onMinInput();
    this.onMaxInput();
  }

  onMinInput(): void {
    // Define a dynamic minimum gap based on the total range
    const minGap = (this.max - this.min) * 0.01; // 1% of the total range, or set a custom value
  
    // Ensure userMin does not exceed userMax minus the gap
    this.userMin = Math.min(this.userMin, this.userMax - minGap);
  
    // Calculate the thumb position as a percentage
    this.minthumb = ((this.userMin - this.min) / (this.max - this.min)) * 100;
  }
  
  onMaxInput(): void {
    // Define a dynamic minimum gap based on the total range
    const minGap = (this.max - this.min) * 0.01; // 1% of the total range, or set a custom value
  
    // Ensure userMax does not go below userMin plus the gap
    this.userMax = Math.max(this.userMax, this.userMin + minGap);
  
    // Calculate the thumb position as a percentage (inverted for max thumb)
    this.maxthumb = 100 - (((this.userMax - this.min) / (this.max - this.min)) * 100);
  }
  
}
