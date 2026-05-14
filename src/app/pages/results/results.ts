import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Result, SchoolApiService, Student } from '../../services/school-api.service';

@Component({
  selector: 'app-results',
  imports: [FormsModule],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results implements OnInit {
  protected searchTerm = '';
  protected editingResultId: number | null = null;
  protected errorMessage = '';

  protected resultForm: Result = this.createEmptyForm();
  protected results: Result[] = [];
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
    this.loadResults();
  }

  protected get passedResults(): number {
    return this.results.filter((result) => result.grade !== 'F').length;
  }

  protected get failedResults(): number {
    return this.results.filter((result) => result.grade === 'F').length;
  }

  protected get averageMarks(): number {
    if (!this.results.length) {
      return 0;
    }

    const total = this.results.reduce((sum, result) => sum + Number(result.marksObtained || 0), 0);
    return Math.round(total / this.results.length);
  }

  protected get filteredResults(): Result[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.results;
    }

    return this.results.filter((result) =>
      [result.studentId, this.getStudentName(result.studentId), result.examId, result.marksObtained, result.grade]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }

  protected getStudentName(studentId: number): string {
    return this.students.find((student) => student.id === studentId)?.name ?? `Student ID ${studentId}`;
  }

  protected saveResult(): void {
    const form = {
      ...this.resultForm,
      studentId: Number(this.resultForm.studentId),
      examId: Number(this.resultForm.examId),
      marksObtained: Number(this.resultForm.marksObtained),
      grade: this.resultForm.grade.trim(),
      remarks: this.resultForm.remarks.trim(),
    };

    if (!form.studentId || !form.examId || !form.grade) {
      return;
    }

    const request: Observable<unknown> = this.editingResultId
      ? this.api.updateResult({ ...form, id: this.editingResultId })
      : this.api.addResult({ ...form, id: 0 });

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadResults();
      },
      error: () => {
        this.errorMessage = 'Result save nahi hua.';
      },
    });
  }

  protected editResult(result: Result): void {
    this.editingResultId = result.id;
    this.resultForm = { ...result };
  }

  protected deleteResult(resultId: number): void {
    this.api.deleteResult(resultId).subscribe({
      next: () => {
        this.loadResults();

        if (this.editingResultId === resultId) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Result delete nahi hua.';
      },
    });
  }

  protected resetForm(): void {
    this.editingResultId = null;
    this.errorMessage = '';
    this.resultForm = this.createEmptyForm();
    this.resultForm.studentId = this.students[0]?.id ?? 0;
  }

  private loadResults(): void {
    this.api.getResults().subscribe({
      next: (results) => {
        this.results = results;
      },
      error: () => {
        this.errorMessage = 'Results API se load nahi huay.';
      },
    });
  }

  private loadStudents(): void {
    this.api.ensureStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.resultForm.studentId = students[0]?.id ?? 0;
      },
    });
  }

  private createEmptyForm(): Result {
    return {
      id: 0,
      studentId: 1,
      examId: 1,
      marksObtained: 0,
      grade: 'A',
      remarks: '',
    };
  }
}
