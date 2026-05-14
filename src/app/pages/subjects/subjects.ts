import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolApiService, Subject, Teacher } from '../../services/school-api.service';

@Component({
  selector: 'app-subjects',
  imports: [FormsModule],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects implements OnInit {
  protected searchTerm = '';
  protected editingSubjectId: number | null = null;
  protected errorMessage = '';

  protected subjectForm: Subject = this.createEmptyForm();
  protected subjects: Subject[] = [];
  protected teachers: Teacher[] = [];

  constructor(private readonly api: SchoolApiService) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadTeachers();
  }

  protected get filteredSubjects(): Subject[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.subjects;
    }

    return this.subjects.filter((subject) =>
      [subject.subjectName, subject.subjectCode, subject.className, subject.teacherId]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }

  protected getTeacherName(teacherId: number): string {
    return this.teachers.find((teacher) => teacher.id === teacherId)?.name ?? `Teacher ID ${teacherId}`;
  }

  protected saveSubject(): void {
    const form = {
      ...this.subjectForm,
      subjectName: this.subjectForm.subjectName.trim(),
      subjectCode: this.subjectForm.subjectCode.trim(),
      className: this.subjectForm.className.trim(),
      teacherId: Number(this.subjectForm.teacherId),
    };

    if (!form.subjectName || !form.subjectCode || !form.className || !form.teacherId) {
      return;
    }

    const request: Observable<unknown> = this.editingSubjectId
      ? this.api.updateSubject({ ...form, subjectId: this.editingSubjectId })
      : this.api.addSubject({ ...form, subjectId: 0 });

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadSubjects();
      },
      error: () => {
        this.errorMessage = 'Subject save nahi hua.';
      },
    });
  }

  protected editSubject(subject: Subject): void {
    this.editingSubjectId = subject.subjectId;
    this.subjectForm = { ...subject };
  }

  protected deleteSubject(subjectId: number): void {
    this.api.deleteSubject(subjectId).subscribe({
      next: () => {
        this.loadSubjects();

        if (this.editingSubjectId === subjectId) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Subject delete nahi hua.';
      },
    });
  }

  protected resetForm(): void {
    this.editingSubjectId = null;
    this.errorMessage = '';
    this.subjectForm = this.createEmptyForm();
  }

  private loadSubjects(): void {
    this.api.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: () => {
        this.errorMessage = 'Subjects API se load nahi huay.';
      },
    });
  }

  private loadTeachers(): void {
    this.api.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.subjectForm.teacherId = teachers[0]?.id ?? 0;
      },
    });
  }

  private createEmptyForm(): Subject {
    return {
      subjectId: 0,
      subjectName: '',
      subjectCode: '',
      className: '',
      teacherId: 0,
    };
  }
}
