import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolApiService, Teacher } from '../../services/school-api.service';

@Component({
  selector: 'app-teachers',
  imports: [FormsModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.css',
})
export class Teachers implements OnInit {
  protected searchTerm = '';
  protected editingTeacherId: number | null = null;
  protected errorMessage = '';

  protected teacherForm: Teacher = this.createEmptyForm();
  protected teachers: Teacher[] = [];

  constructor(private readonly api: SchoolApiService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  protected get totalSalary(): number {
    return this.teachers.reduce((total, teacher) => total + Number(teacher.salary || 0), 0);
  }

  protected get filteredTeachers(): Teacher[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.teachers;
    }

    return this.teachers.filter((teacher) =>
      [teacher.name, teacher.subject, teacher.phone, teacher.salary]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }

  protected saveTeacher(): void {
    const form = {
      ...this.teacherForm,
      name: this.teacherForm.name.trim(),
      subject: this.teacherForm.subject.trim(),
      phone: this.teacherForm.phone.trim(),
      salary: Number(this.teacherForm.salary),
    };

    if (!form.name || !form.subject || !form.phone) {
      return;
    }

    const request: Observable<unknown> = this.editingTeacherId
      ? this.api.updateTeacher({ ...form, id: this.editingTeacherId })
      : this.api.addTeacher({ ...form, id: 0 });

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadTeachers();
      },
      error: () => {
        this.errorMessage = 'Teacher save nahi hua.';
      },
    });
  }

  protected editTeacher(teacher: Teacher): void {
    this.editingTeacherId = teacher.id;
    this.teacherForm = { ...teacher };
  }

  protected deleteTeacher(teacherId: number): void {
    this.api.deleteTeacher(teacherId).subscribe({
      next: () => {
        this.loadTeachers();

        if (this.editingTeacherId === teacherId) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Teacher delete nahi hua.';
      },
    });
  }

  protected resetForm(): void {
    this.editingTeacherId = null;
    this.errorMessage = '';
    this.teacherForm = this.createEmptyForm();
  }

  private loadTeachers(): void {
    this.api.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: () => {
        this.errorMessage = 'Teachers API se load nahi huay.';
      },
    });
  }

  private createEmptyForm(): Teacher {
    return {
      id: 0,
      name: '',
      subject: '',
      phone: '',
      salary: 0,
    };
  }
}
