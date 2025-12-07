import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = { fullName: '', email: '', password: '' };

  constructor(private router: Router,
              private http: HttpClient) {}

  onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    event.preventDefault();
    this.http.post(`http://localhost:3001/auth/register`, data).subscribe({
      next: (res: any) => {
        const {token} = res;
        localStorage.setItem('token', token)
        console.log('Registered!', res);
        this.router.navigate(['/events']);
      },
      error: err => console.error('Error:', err)
    });
  }
}
