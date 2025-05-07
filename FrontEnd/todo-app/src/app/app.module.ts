// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TodoModule } from './features/todo/todo.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
// ייבוא שירותים, מודולים, רכיבים אחרים

@NgModule({
    declarations: [
        AppComponent,
        // רכיבים אחרים
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TodoModule,
        // מודולים אחרים (למשל RouterModule.forRoot(...))
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
