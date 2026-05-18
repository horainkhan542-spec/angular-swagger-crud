import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
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

type DbClass = { Id: number; ClassName: string; Section: string };
type DbStudent = { Id: number; Name: string; SchoolClassId: number };
type DbTeacher = { Id: number; Name: string; Subject: string; Phone: string; Salary: number };
type DbSubject = {
  SubjectId: number;
  SubjectName: string;
  SubjectCode: string;
  ClassName: string;
  TeacherId: number;
};
type DbAttendance = {
  AttendanceId: number;
  StudentId: number;
  AttendanceDate: string;
  Status: string;
};
type DbFee = {
  Id: number;
  StudentId: number;
  Amount: number;
  DueDate: string;
  PaidDate: string | null;
  Status: string;
};
type DbResult = {
  Id: number;
  StudentId: number;
  ExamId: number;
  MarksObtained: number;
  Grade: string;
  Remarks: string;
};

@Injectable({ providedIn: 'root' })
export class SchoolApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  private readonly supabaseUrl = environment.supabaseUrl.replace(/\/$/, '');
  private readonly useSupabase = Boolean(this.supabaseUrl && environment.supabaseAnonKey);

  constructor(private readonly http: HttpClient) {}

  getClasses(): Observable<SchoolClass[]> {
    if (this.useSupabase) {
      return this.supabaseGet<DbClass>('SchoolClasses').pipe(
        map((rows) => rows.map((row) => this.fromClass(row))),
      );
    }

    return this.http.get<SchoolClass[]>(this.api('/api/Class'));
  }

  addClass(item: SchoolClass): Observable<SchoolClass> {
    if (this.useSupabase) {
      return this.supabasePost<DbClass>('SchoolClasses', {
        ClassName: item.className,
        Section: item.section,
      }).pipe(map(([row]) => this.fromClass(row)));
    }

    return this.http.post<SchoolClass>(this.api('/api/Class'), item);
  }

  updateClass(item: SchoolClass): Observable<void> {
    if (this.useSupabase) {
      return this.supabasePatch('SchoolClasses', `Id=eq.${item.id}`, {
        ClassName: item.className,
        Section: item.section,
      });
    }

    return this.http.put<void>(this.api(`/api/Class/${item.id}`), item);
  }

  deleteClass(id: number): Observable<void> {
    if (this.useSupabase) {
      return this.supabaseDelete('SchoolClasses', `Id=eq.${id}`);
    }

    return this.http.delete<void>(this.api(`/api/Class/${id}`));
  }

  getStudents(): Observable<Student[]> {
    if (this.useSupabase) {
      return forkJoin({
        students: this.supabaseGet<DbStudent>('Students'),
        classes: this.getClasses(),
      }).pipe(
        map(({ students, classes }) =>
          students.map((row) => {
            const student = this.fromStudent(row);
            return {
              ...student,
              schoolClass: classes.find((item) => item.id === student.schoolClassId) ?? null,
            };
          }),
        ),
      );
    }

    return this.http.get<Student[]>(this.api('/api/Student'));
  }

  addStudent(item: Student): Observable<Student> {
    if (this.useSupabase) {
      return this.supabasePost<DbStudent>('Students', {
        Name: item.name,
        SchoolClassId: item.schoolClassId,
      }).pipe(map(([row]) => this.fromStudent(row)));
    }

    return this.http.post<Student>(this.api('/api/Student'), item);
  }

  updateStudent(item: Student): Observable<void> {
    if (this.useSupabase) {
      return this.supabasePatch('Students', `Id=eq.${item.id}`, {
        Name: item.name,
        SchoolClassId: item.schoolClassId,
      });
    }

    return this.http.put<void>(this.api(`/api/Student/${item.id}`), item);
  }

  deleteStudent(id: number): Observable<void> {
    if (this.useSupabase) {
      return this.supabaseDelete('Students', `Id=eq.${id}`);
    }

    return this.http.delete<void>(this.api(`/api/Student/${id}`));
  }

  getTeachers(): Observable<Teacher[]> {
    if (this.useSupabase) {
      return this.supabaseGet<DbTeacher>('Teachers').pipe(
        map((rows) => rows.map((row) => this.fromTeacher(row))),
      );
    }

    return this.http.get<Teacher[]>(this.api('/api/Teacher'));
  }

  addTeacher(item: Teacher): Observable<Teacher> {
    if (this.useSupabase) {
      return this.supabasePost<DbTeacher>('Teachers', {
        Name: item.name,
        Subject: item.subject,
        Phone: item.phone,
        Salary: item.salary,
      }).pipe(map(([row]) => this.fromTeacher(row)));
    }

    return this.http.post<Teacher>(this.api('/api/Teacher'), item);
  }

  updateTeacher(item: Teacher): Observable<void> {
    if (this.useSupabase) {
      return this.supabasePatch('Teachers', `Id=eq.${item.id}`, {
        Name: item.name,
        Subject: item.subject,
        Phone: item.phone,
        Salary: item.salary,
      });
    }

    return this.http.put<void>(this.api(`/api/Teacher/${item.id}`), item);
  }

  deleteTeacher(id: number): Observable<void> {
    if (this.useSupabase) {
      return this.supabaseDelete('Teachers', `Id=eq.${id}`);
    }

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
    if (this.useSupabase) {
      return this.supabaseGet<DbSubject>('Subjects').pipe(
        map((rows) => rows.map((row) => this.fromSubject(row))),
      );
    }

    return this.http.get<Subject[]>(this.api('/api/Subject'));
  }

  addSubject(item: Subject): Observable<Subject> {
    if (this.useSupabase) {
      return this.supabasePost<DbSubject>('Subjects', {
        SubjectName: item.subjectName,
        SubjectCode: item.subjectCode,
        ClassName: item.className,
        TeacherId: item.teacherId,
      }).pipe(map(([row]) => this.fromSubject(row)));
    }

    return this.http.post<Subject>(this.api('/api/Subject'), item);
  }

  updateSubject(item: Subject): Observable<void> {
    if (this.useSupabase) {
      return this.supabasePatch('Subjects', `SubjectId=eq.${item.subjectId}`, {
        SubjectName: item.subjectName,
        SubjectCode: item.subjectCode,
        ClassName: item.className,
        TeacherId: item.teacherId,
      });
    }

    return this.http.put<void>(this.api(`/api/Subject/${item.subjectId}`), item);
  }

  deleteSubject(id: number): Observable<void> {
    if (this.useSupabase) {
      return this.supabaseDelete('Subjects', `SubjectId=eq.${id}`);
    }

    return this.http.delete<void>(this.api(`/api/Subject/${id}`));
  }

  getAttendance(): Observable<Attendance[]> {
    if (this.useSupabase) {
      return this.supabaseGet<DbAttendance>('Attendances').pipe(
        map((rows) => rows.map((row) => this.fromAttendance(row))),
      );
    }

    return this.http.get<Attendance[]>(this.api('/api/Attendance'));
  }

  addAttendance(item: Attendance): Observable<Attendance> {
    if (this.useSupabase) {
      return this.supabasePost<DbAttendance>('Attendances', {
        StudentId: item.studentId,
        AttendanceDate: item.attendanceDate,
        Status: item.status,
      }).pipe(map(([row]) => this.fromAttendance(row)));
    }

    return this.http.post<Attendance>(this.api('/api/Attendance'), item);
  }

  updateAttendance(item: Attendance): Observable<void> {
    if (this.useSupabase) {
      return this.supabasePatch('Attendances', `AttendanceId=eq.${item.attendanceId}`, {
        StudentId: item.studentId,
        AttendanceDate: item.attendanceDate,
        Status: item.status,
      });
    }

    return this.http.put<void>(this.api(`/api/Attendance/${item.attendanceId}`), item);
  }

  deleteAttendance(id: number): Observable<void> {
    if (this.useSupabase) {
      return this.supabaseDelete('Attendances', `AttendanceId=eq.${id}`);
    }

    return this.http.delete<void>(this.api(`/api/Attendance/${id}`));
  }

  getFees(): Observable<Fee[]> {
    if (this.useSupabase) {
      return this.supabaseGet<DbFee>('Fees').pipe(map((rows) => rows.map((row) => this.fromFee(row))));
    }

    return this.http.get<Fee[]>(this.api('/api/Fee'));
  }

  addFee(item: Fee): Observable<Fee> {
    if (this.useSupabase) {
      return this.supabasePost<DbFee>('Fees', {
        StudentId: item.studentId,
        Amount: item.amount,
        DueDate: item.dueDate,
        PaidDate: item.paidDate,
        Status: item.status,
      }).pipe(map(([row]) => this.fromFee(row)));
    }

    return this.http.post<Fee>(this.api('/api/Fee'), item);
  }

  updateFee(item: Fee): Observable<void> {
    if (this.useSupabase) {
      return this.supabasePatch('Fees', `Id=eq.${item.id}`, {
        StudentId: item.studentId,
        Amount: item.amount,
        DueDate: item.dueDate,
        PaidDate: item.paidDate,
        Status: item.status,
      });
    }

    return this.http.put<void>(this.api(`/api/Fee/${item.id}`), item);
  }

  deleteFee(id: number): Observable<void> {
    if (this.useSupabase) {
      return this.supabaseDelete('Fees', `Id=eq.${id}`);
    }

    return this.http.delete<void>(this.api(`/api/Fee/${id}`));
  }

  getResults(): Observable<Result[]> {
    if (this.useSupabase) {
      return this.supabaseGet<DbResult>('Results').pipe(
        map((rows) => rows.map((row) => this.fromResult(row))),
      );
    }

    return this.http.get<Result[]>(this.api('/api/Result'));
  }

  addResult(item: Result): Observable<Result> {
    if (this.useSupabase) {
      return this.supabasePost<DbResult>('Results', {
        StudentId: item.studentId,
        ExamId: item.examId,
        MarksObtained: item.marksObtained,
        Grade: item.grade,
        Remarks: item.remarks,
      }).pipe(map(([row]) => this.fromResult(row)));
    }

    return this.http.post<Result>(this.api('/api/Result'), item);
  }

  updateResult(item: Result): Observable<void> {
    if (this.useSupabase) {
      return this.supabasePatch('Results', `Id=eq.${item.id}`, {
        StudentId: item.studentId,
        ExamId: item.examId,
        MarksObtained: item.marksObtained,
        Grade: item.grade,
        Remarks: item.remarks,
      });
    }

    return this.http.put<void>(this.api(`/api/Result/${item.id}`), item);
  }

  deleteResult(id: number): Observable<void> {
    if (this.useSupabase) {
      return this.supabaseDelete('Results', `Id=eq.${id}`);
    }

    return this.http.delete<void>(this.api(`/api/Result/${id}`));
  }

  private api(path: string): string {
    return `${this.apiBaseUrl}${path}`;
  }

  private supabaseEndpoint(table: string, query = 'select=*'): string {
    return `${this.supabaseUrl}/rest/v1/${table}?${query}`;
  }

  private supabaseHeaders(prefer?: string): HttpHeaders {
    let headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${environment.supabaseAnonKey}`,
    });

    if (prefer) {
      headers = headers.set('Prefer', prefer);
    }

    return headers;
  }

  private supabaseGet<T>(table: string): Observable<T[]> {
    return this.http.get<T[]>(this.supabaseEndpoint(table), {
      headers: this.supabaseHeaders(),
    });
  }

  private supabasePost<T>(table: string, body: object): Observable<T[]> {
    return this.http.post<T[]>(this.supabaseEndpoint(table), body, {
      headers: this.supabaseHeaders('return=representation'),
    });
  }

  private supabasePatch(table: string, filter: string, body: object): Observable<void> {
    return this.http.patch<void>(this.supabaseEndpoint(table, filter), body, {
      headers: this.supabaseHeaders(),
    });
  }

  private supabaseDelete(table: string, filter: string): Observable<void> {
    return this.http.delete<void>(this.supabaseEndpoint(table, filter), {
      headers: this.supabaseHeaders(),
    });
  }

  private fromClass(row: DbClass): SchoolClass {
    return { id: row.Id, className: row.ClassName, section: row.Section };
  }

  private fromStudent(row: DbStudent): Student {
    return { id: row.Id, name: row.Name, schoolClassId: row.SchoolClassId };
  }

  private fromTeacher(row: DbTeacher): Teacher {
    return {
      id: row.Id,
      name: row.Name,
      subject: row.Subject,
      phone: row.Phone,
      salary: row.Salary,
    };
  }

  private fromSubject(row: DbSubject): Subject {
    return {
      subjectId: row.SubjectId,
      subjectName: row.SubjectName,
      subjectCode: row.SubjectCode,
      className: row.ClassName,
      teacherId: row.TeacherId,
    };
  }

  private fromAttendance(row: DbAttendance): Attendance {
    return {
      attendanceId: row.AttendanceId,
      studentId: row.StudentId,
      attendanceDate: row.AttendanceDate,
      status: row.Status,
    };
  }

  private fromFee(row: DbFee): Fee {
    return {
      id: row.Id,
      studentId: row.StudentId,
      amount: row.Amount,
      dueDate: row.DueDate,
      paidDate: row.PaidDate,
      status: row.Status,
    };
  }

  private fromResult(row: DbResult): Result {
    return {
      id: row.Id,
      studentId: row.StudentId,
      examId: row.ExamId,
      marksObtained: row.MarksObtained,
      grade: row.Grade,
      remarks: row.Remarks,
    };
  }
}
