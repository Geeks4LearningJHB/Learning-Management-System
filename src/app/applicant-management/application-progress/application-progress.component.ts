import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-progress',
  templateUrl: './application-progress.component.html',
  styleUrls: ['./application-progress.component.css']
})
export class ApplicationProgressComponent implements OnInit {

  totalFields = 7;
  filledFields = 0;
  progressPercentage = 0;

  ngOnInit(): void {
    this.updateProgressBar();
  }

  onFieldInput(fieldNumber: number) {
    this.updateProgressBar();
  }

  updateProgressBar() {
    this.filledFields = 0;

    for (let i = 1; i <= this.totalFields; i++) {
      const field = document.getElementById('field' + i) as HTMLInputElement;
      if (field.value.trim() !== '') {
        this.filledFields++;
      }
    }

    this.progressPercentage = (this.filledFields / this.totalFields) * 100;
  }
}
