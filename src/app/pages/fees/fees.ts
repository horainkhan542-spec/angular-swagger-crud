import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Fee, SchoolApiService, Student } from '../../services/school-api.service';

@Component({
  selector: 'app-fees',
  imports: [FormsModule],
  templateUrl: './fees.html',
  styleUrl: './fees.css',
})
export class Fees implements OnInit {
  protected searchTerm = '';
  protected editingFeeId: number | null = null;
  protected errorMessage = '';

  protected feeForm: Fee = this.createEmptyForm();
  protected fees: Fee[] = [];
  protected students: Student[] = [];

  constructor(private readonly api: SchoolApiService) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadFees();
  }

  protected get paidFees(): number {
    return this.fees.filter((fee) => fee.status === 'Paid').length;
  }

  protected get pendingFees(): number {
    return this.fees.filter((fee) => fee.status === 'Pending').length;
  }

  protected get totalAmount(): number {
    return this.fees.reduce((total, fee) => total + Number(fee.amount || 0), 0);
  }

  protected get filteredFees(): Fee[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.fees;
    }

    return this.fees.filter((fee) =>
      [fee.studentId, this.getStudentName(fee.studentId), fee.amount, fee.dueDate, fee.status]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }

  protected getStudentName(studentId: number): string {
    return this.students.find((student) => student.id === studentId)?.name ?? `Student ID ${studentId}`;
  }

  protected saveFee(): void {
    const form = {
      ...this.feeForm,
      studentId: Number(this.feeForm.studentId),
      amount: Number(this.feeForm.amount),
      dueDate: this.feeForm.dueDate,
      paidDate: this.feeForm.status === 'Paid' ? this.feeForm.paidDate || this.feeForm.dueDate : null,
      status: this.feeForm.status.trim(),
    };

    if (!form.studentId || !form.amount || !form.dueDate || !form.status) {
      return;
    }

    const request: Observable<unknown> = this.editingFeeId
      ? this.api.updateFee({ ...form, id: this.editingFeeId })
      : this.api.addFee({ ...form, id: 0 });

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadFees();
      },
      error: () => {
        this.errorMessage = 'Fee save nahi hui.';
      },
    });
  }

  protected editFee(fee: Fee): void {
    this.editingFeeId = fee.id;
    this.feeForm = {
      ...fee,
      dueDate: fee.dueDate.slice(0, 10),
      paidDate: fee.paidDate?.slice(0, 10) ?? null,
    };
  }

  protected deleteFee(feeId: number): void {
    this.api.deleteFee(feeId).subscribe({
      next: () => {
        this.loadFees();

        if (this.editingFeeId === feeId) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Fee delete nahi hui.';
      },
    });
  }

  protected resetForm(): void {
    this.editingFeeId = null;
    this.errorMessage = '';
    this.feeForm = this.createEmptyForm();
    this.feeForm.studentId = this.students[0]?.id ?? 0;
  }

  private loadFees(): void {
    this.api.getFees().subscribe({
      next: (fees) => {
        this.fees = fees;
      },
      error: () => {
        this.errorMessage = 'Fees API se load nahi hui.';
      },
    });
  }

  private loadStudents(): void {
    this.api.ensureStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.feeForm.studentId = students[0]?.id ?? 0;
      },
    });
  }

  private createEmptyForm(): Fee {
    return {
      id: 0,
      studentId: 0,
      amount: 0,
      dueDate: new Date().toISOString().slice(0, 10),
      paidDate: null,
      status: 'Pending',
    };
  }
}
