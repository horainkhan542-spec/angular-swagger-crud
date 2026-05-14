import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Attendance as AttendanceModel, SchoolApiService, Student } from '../../services/school-api.service';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance implements OnInit {
  protected searchTerm = '';
  protected editingAttendanceId: number | null = null;
  protected errorMessage = '';

  protected attendanceForm: AttendanceModel = this.createEmptyForm();
  protected attendanceRecords: AttendanceModel[] = [];
  protected students: Student[] = [
    {
      id: 1,
      name: 'Default Student',
      schoolClassId: 1,
    },
  ];

  constructor(private readonly api: SchoolApiService) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadAttendance();
  }

  protected get presentCount(): number {
    return this.attendanceRecords.filter((record) => record.status === 'Present').length;
  }

  protected get absentCount(): number {
    return this.attendanceRecords.filter((record) => record.status === 'Absent').length;
  }

  protected get filteredAttendanceRecords(): AttendanceModel[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.attendanceRecords;
    }

    return this.attendanceRecords.filter((record) =>
      [record.studentId, this.getStudentName(record.studentId), record.attendanceDate, record.status]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }

  protected getStudentName(studentId: number): string {
    return this.students.find((student) => student.id === studentId)?.name ?? `Student ID ${studentId}`;
  }

  protected saveAttendance(): void {
    const form = {
      ...this.attendanceForm,
      studentId: Number(this.attendanceForm.studentId),
      attendanceDate: this.attendanceForm.attendanceDate,
      status: this.attendanceForm.status.trim(),
    };

    if (!form.studentId || !form.attendanceDate || !form.status) {
      return;
    }

    const request: Observable<unknown> = this.editingAttendanceId
      ? this.api.updateAttendance({ ...form, attendanceId: this.editingAttendanceId })
      : this.api.addAttendance({ ...form, attendanceId: 0 });

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadAttendance();
      },
      error: () => {
        this.errorMessage = 'Attendance save nahi hui.';
      },
    });
  }

  protected editAttendance(record: AttendanceModel): void {
    this.editingAttendanceId = record.attendanceId;
    this.attendanceForm = {
      ...record,
      attendanceDate: record.attendanceDate.slice(0, 10),
    };
  }

  protected deleteAttendance(attendanceId: number): void {
    this.api.deleteAttendance(attendanceId).subscribe({
      next: () => {
        this.loadAttendance();

        if (this.editingAttendanceId === attendanceId) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Attendance delete nahi hui.';
      },
    });
  }

  protected resetForm(): void {
    this.editingAttendanceId = null;
    this.errorMessage = '';
    this.attendanceForm = this.createEmptyForm();
    this.attendanceForm.studentId = this.students[0]?.id ?? 0;
  }

  private loadAttendance(): void {
    this.api.getAttendance().subscribe({
      next: (records) => {
        this.attendanceRecords = records;
      },
      error: () => {
        this.errorMessage = 'Attendance API se load nahi hui.';
      },
    });
  }

  private loadStudents(): void {
    this.api.ensureStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.attendanceForm.studentId = students[0]?.id ?? 0;
      },
    });
  }

  private createEmptyForm(): AttendanceModel {
    return {
      attendanceId: 0,
      studentId: 1,
      attendanceDate: new Date().toISOString().slice(0, 10),
      status: 'Present',
    };
  }
}
