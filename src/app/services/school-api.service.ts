import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  private readonly apiBaseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  constructor(private readonly http: HttpClient) {}

  private api(path: string): string {
    return `${this.apiBaseUrl}${path}`;
  }

  getClasses(): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>(this.api('/api/Class'));
  }

  addClass(item: SchoolClass): Observable<SchoolClass> {
    return this.http.post<SchoolClass>(this.api('/api/Class'), item);
  }

  updateClass(item: SchoolClass): Observable<void> {
    return this.http.put<void>(this.api(`/api/Class/${item.id}`), item);
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(this.api(`/api/Class/${id}`));
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.api('/api/Student'));
  }

  addStudent(item: Student): Observable<Student> {
    return this.http.post<Student>(this.api('/api/Student'), item);
  }

  updateStudent(item: Student): Observable<void> {
    return this.http.put<void>(this.api(`/api/Student/${item.id}`), item);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(this.api(`/api/Student/${id}`));
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.api('/api/Teacher'));
  }

  addTeacher(item: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.api('/api/Teacher'), item);
  }

  updateTeacher(item: Teacher): Observable<void> {
    return this.http.put<void>(this.api(`/api/Teacher/${item.id}`), item);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(this.api(`/api/Teacher/${id}`));
  }

  ensureTeachers(): Observable<Teacher[]> {
    return this.getTeachers().pipe(
      switchMap((teachers) => {
        if (teachers.length) {
          return of(teachers);
        }

        return this.addTeacher({
          id: 0,
          name: 'Default Teacher',
          subject: 'General',
          phone: '0300-0000000',
          salary: 0,
        }).pipe(map((teacher) => [teacher]));
      }),
    );
  }

  ensureStudents(): Observable<Student[]> {
    return this.getStudents().pipe(
      switchMap((students) => {
        if (students.length) {
          return of(students);
        }

        return this.getClasses().pipe(
          switchMap((classes) => {
            const classRequest: Observable<SchoolClass> = classes.length
              ? of(classes[0])
              : this.addClass({ id: 0, className: 'Default Class', section: 'A' });

            return classRequest.pipe(
              switchMap((schoolClass) =>
                this.addStudent({
                  id: 0,
                  name: 'Default Student',
                  schoolClassId: schoolClass.id,
                }),
              ),
              map((student) => [student]),
            );
          }),
        );
      }),
    );
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.api('/api/Subject'));
  }

  addSubject(item: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.api('/api/Subject'), item);
  }

  updateSubject(item: Subject): Observable<void> {
    return this.http.put<void>(this.api(`/api/Subject/${item.subjectId}`), item);
  }

  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(this.api(`/api/Subject/${id}`));
  }

  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.api('/api/Attendance'));
  }

  addAttendance(item: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.api('/api/Attendance'), item);
  }

  updateAttendance(item: Attendance): Observable<void> {
    return this.http.put<void>(this.api(`/api/Attendance/${item.attendanceId}`), item);
  }

  deleteAttendance(id: number): Observable<void> {
    return this.http.delete<void>(this.api(`/api/Attendance/${id}`));
  }

  getFees(): Observable<Fee[]> {
    return this.http.get<Fee[]>(this.api('/api/Fee'));
  }

  addFee(item: Fee): Observable<Fee> {
    return this.http.post<Fee>(this.api('/api/Fee'), item);
  }

  updateFee(item: Fee): Observable<void> {
    return this.http.put<void>(this.api(`/api/Fee/${item.id}`), item);
  }

  deleteFee(id: number): Observable<void> {
    return this.http.delete<void>(this.api(`/api/Fee/${id}`));
  }

  getResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.api('/api/Result'));
  }

  addResult(item: Result): Observable<Result> {
    return this.http.post<Result>(this.api('/api/Result'), item);
  }

  updateResult(item: Result): Observable<void> {
    return this.http.put<void>(this.api(`/api/Result/${item.id}`), item);
  }

  deleteResult(id: number): Observable<void> {
    return this.http.delete<void>(this.api(`/api/Result/${id}`));
  }
}
