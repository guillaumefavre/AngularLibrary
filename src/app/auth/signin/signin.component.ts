import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
  			  private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm() {
  	this.signInForm = this.formBuilder.group({
  		emailForm: ['', [Validators.required, Validators.email]],
  		passwordForm: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
  	});
  }

  onSubmit() {
  	const email = this.signInForm.get('emailForm').value;
  	const password = this.signInForm.get('passwordForm').value;
  	this.authService.signInUser(email, password).then(
  		() => {
  			this.router.navigate(['/books']);
  		},
  		(error) => {
  			this.errorMessage = error;
  		}
	);
  }

}
