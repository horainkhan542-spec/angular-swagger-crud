import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolApiService, SchoolClass, Student } from '../../services/school-api.service';

type StudentForm = Omit<Student, 'schoolClass'>;

@Component({
  selector: 'app-students',
  imports: [FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  protected searchTerm = '';
  protected editingStudentId: number | null = null;
  protected errorMessage = '';

  protected studentForm: StudentForm = this.createEmptyForm();
  protected students: Student[] = [];
  protected classes: SchoolClass[] = [];

  constructor(private readonly api: SchoolApiService) {}

  ngOnInit(): void {
    this.loadClasses();
    this.loadStudents();
  }

  protected get filteredStudents(): Student[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.students;
    }

    return this.students.filter((student) =>
      [student.name, student.schoolClassId, student.schoolClass?.className, student.schoolClass?.section]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }

  protected getClassLabel(student: Student): string {
    const item = student.schoolClass ?? this.classes.find((schoolClass) => schoolClass.id === student.schoolClassId);
    return item ? `${item.className} - ${item.section}` : `Class ID ${student.schoolClassId}`;
  }

  protected saveStudent(): void {
    const form = {
      ...this.studentForm,
      name: this.studentForm.name.trim(),
      schoolClassId: Number(this.studentForm.schoolClassId),
    };

    if (!form.name || !form.schoolClassId) {
      return;
    }

    const request: Observable<unknown> = this.editingStudentId
      ? this.api.updateStudent({ ...form, id: this.editingStudentId })
      : this.api.addStudent({ ...form, id: 0 });

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadStudents();
      },
      error: () => {
        this.errorMessage = 'Student save nahi hua. Pehle class create/check karo.';
      },
    });
  }

  protected editStudent(student: Student): void {
    this.editingStudentId = student.id;
    this.studentForm = {
      id: student.id,
      name: student.name,
      schoolClassId: student.schoolClassId,
    };
  }

  protected deleteStudent(studentId: number): void {
    this.api.deleteStudent(studentId).subscribe({
      next: () => {
        this.loadStudents();

        if (this.editingStudentId === studentId) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Student delete nahi hua.';
      },
    });
  }

  protected resetForm(): void {
    this.editingStudentId = null;
    this.errorMessage = '';
    this.studentForm = this.createEmptyForm();
  }

  private loadStudents(): void {
    this.api.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: () => {
        this.errorMessage = 'Students API se load nahi huay.';
      },
    });
  }

  private loadClasses(): void {
    this.api.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
        this.studentForm.schoolClassId = classes[0]?.id ?? 0;
      },
    });
  }

  private createEmptyForm(): StudentForm {
    return {
      id: 0,
      name: '',
      schoolClassId: 0,
    };
  }
}
