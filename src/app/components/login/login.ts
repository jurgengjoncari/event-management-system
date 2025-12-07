import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = { email: '', password: '' };

  constructor(private router: Router,
              private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/login`, {
      withCredentials: true
    }).subscribe({
      next: res => console.log('Response:', res),
      error: err => console.error('Error:', err)
    })
  }

  onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    event.preventDefault();
    this.http.post(`${environment.apiUrl}/auth/login`, data).subscribe({
      next: (res: any) => {
        const {token} = res;
        localStorage.setItem('token', token)
        console.log('Logged in!', res);
        this.router.navigate(['/events']); // redirect inside Angular
      },
      error: err => console.error('Error:', err)
    });
  }
}
