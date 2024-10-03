import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule, FormsModule] // Agrega FormsModule aquí
})
export class CalendarComponent implements OnInit {
  days: any[] = [];
  selectedDay: any = null;
  selectedHour: string | null = null;
  reservationDetails: { name?: string; email?: string; phone?: string } = {};
  reservedHours: { [date: string]: string[] } = {};

  ngOnInit() {
    this.generateDays();
  }

  generateDays() {
    const date = new Date(2024, 8, 1); // Septiembre 2024
    for (let i = 0; i < 30; i++) {
      this.days.push({ date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i) });
    }
  }

  selectDay(day: any) {
    this.selectedDay = day;
    this.selectedHour = null;
  }

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  isOccupied(hour: string): boolean {
    const dateKey = this.selectedDay?.date.toISOString().split('T')[0];
    return this.reservedHours[dateKey]?.includes(hour) || false;
  }

  confirmReservation() {
    if (this.selectedHour && this.selectedDay) {
      const dateKey = this.selectedDay.date.toISOString().split('T')[0];
      if (!this.reservedHours[dateKey]) {
        this.reservedHours[dateKey] = [];
      }
      this.reservedHours[dateKey].push(this.selectedHour);
      alert(`Reserva confirmada para ${this.selectedHour} el ${this.selectedDay.date.toDateString()}`);
      this.resetReservation();
    }
  }

  resetReservation() {
    this.selectedHour = null;
    this.reservationDetails = {};
  }
}
