import { Routes } from '@angular/router';
import {Register} from "./components/register/register";
import {Events} from "./components/events/events";
import {Event} from "./components/events/event/event"
import {Login} from "./components/login/login";
import {Homepage} from "./components/homepage/homepage";

export const routes: Routes = [
    {path: '', component: Homepage},
    {path: 'auth/register', component: Register},
    {path: 'auth/login', component: Login},
    {path: 'events', component: Events},
    {path: 'events/new', component: Event},
    {path: 'events/:id', component: Event},
];
