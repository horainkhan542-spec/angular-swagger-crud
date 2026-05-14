import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SchoolClass {
  id: number;
  className: string;
  section: string;
}

export interface Student {
  id: number;
  name: string;
  schoolClassId: number;
  schoolClass?: SchoolClass | null;
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  phone: string;
  salary: number;
}

export interface Subject {
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  className: string;
  teacherId: number;
}

export interface Attendance {
  attendanceId: number;
  studentId: number;
  attendanceDate: string;
  status: string;
}

export interface Fee {
  id: number;
  studentId: number;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: string;
}

export interface Result {
  id: number;
  studentId: number;
  examId: number;
  marksObtained: number;
  grade: string;
  remarks: string;
}

@Injectable({ providedIn: 'root' })
export class SchoolApiService {
  constructor(private readonly http: HttpClient) {}

  getClasses(): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>('/api/Class');
  }

  addClass(item: SchoolClass): Observable<SchoolClass> {
    return this.http.post<SchoolClass>('/api/Class', item);
  }

  updateClass(item: SchoolClass): Observable<void> {
    return this.http.put<void>(`/api/Class/${item.id}`, item);
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Class/${id}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/Student');
  }

  addStudent(item: Student): Observable<Student> {
    return this.http.post<Student>('/api/Student', item);
  }

  updateStudent(item: Student): Observable<void> {
    return this.http.put<void>(`/api/Student/${item.id}`, item);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Student/${id}`);
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>('/api/Teacher');
  }

  addTeacher(item: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>('/api/Teacher', item);
  }

  updateTeacher(item: Teacher): Observable<void> {
    return this.http.put<void>(`/api/Teacher/${item.id}`, item);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Teacher/${id}`);
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>('/api/Subject');
  }

  addSubject(item: Subject): Observable<Subject> {
    return this.http.post<Subject>('/api/Subject', item);
  }

  updateSubject(item: Subject): Observable<void> {
    return this.http.put<void>(`/api/Subject/${item.subjectId}`, item);
  }

  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Subject/${id}`);
  }

  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>('/api/Attendance');
  }

  addAttendance(item: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>('/api/Attendance', item);
  }

  updateAttendance(item: Attendance): Observable<void> {
    return this.http.put<void>(`/api/Attendance/${item.attendanceId}`, item);
  }

  deleteAttendance(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Attendance/${id}`);
  }

  getFees(): Observable<Fee[]> {
    return this.http.get<Fee[]>('/api/Fee');
  }

  addFee(item: Fee): Observable<Fee> {
    return this.http.post<Fee>('/api/Fee', item);
  }

  updateFee(item: Fee): Observable<void> {
    return this.http.put<void>(`/api/Fee/${item.id}`, item);
  }

  deleteFee(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Fee/${id}`);
  }

  getResults(): Observable<Result[]> {
    return this.http.get<Result[]>('/api/Result');
  }

  addResult(item: Result): Observable<Result> {
    return this.http.post<Result>('/api/Result', item);
  }

  updateResult(item: Result): Observable<void> {
    return this.http.put<void>(`/api/Result/${item.id}`, item);
  }

  deleteResult(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Result/${id}`);
  }
}
