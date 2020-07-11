import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [AppComponent, SignUpComponent, SignUpFormComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
