import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolApiService, SchoolClass } from '../../services/school-api.service';

@Component({
  selector: 'app-classes',
  imports: [FormsModule],
  templateUrl: './Classes.html',
  styleUrl: './Classes.css',
})
export class Classes implements OnInit {
  protected searchTerm = '';
  protected editingClassId: number | null = null;
  protected errorMessage = '';

  protected classForm: SchoolClass = this.createEmptyForm();
  protected classes: SchoolClass[] = [];

  constructor(private readonly api: SchoolApiService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  protected get filteredClasses(): SchoolClass[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.classes;
    }

    return this.classes.filter((item) =>
      [item.id, item.className, item.section].join(' ').toLowerCase().includes(term),
    );
  }

  protected saveClass(): void {
    const form = {
      ...this.classForm,
      className: this.classForm.className.trim(),
      section: this.classForm.section.trim(),
    };

    if (!form.className || !form.section) {
      return;
    }

    const request: Observable<unknown> = this.editingClassId
      ? this.api.updateClass({ ...form, id: this.editingClassId })
      : this.api.addClass({ ...form, id: 0 });

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadClasses();
      },
      error: () => {
        this.errorMessage = 'Class save nahi hui.';
      },
    });
  }

  protected editClass(item: SchoolClass): void {
    this.editingClassId = item.id;
    this.classForm = { ...item };
  }

  protected deleteClass(classId: number): void {
    this.api.deleteClass(classId).subscribe({
      next: () => {
        this.loadClasses();

        if (this.editingClassId === classId) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Class delete nahi hui.';
      },
    });
  }

  protected resetForm(): void {
    this.editingClassId = null;
    this.errorMessage = '';
    this.classForm = this.createEmptyForm();
  }

  private loadClasses(): void {
    this.api.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: () => {
        this.errorMessage = 'Classes API se load nahi hui.';
      },
    });
  }

  private createEmptyForm(): SchoolClass {
    return {
      id: 0,
      className: '',
      section: '',
    };
  }
}
