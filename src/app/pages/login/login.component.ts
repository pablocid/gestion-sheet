import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SessionService } from 'src/app/store/session';
import { AlertDialogComponent, IAlertDialogData } from 'src/app/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private sessionS: SessionService,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  openDialog(): void {
    const data: IAlertDialogData = {};
    data.header = 'Error de autenticación';
    data.message = 'El usuario o contraseña son inválidos';
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  public async onSubmit(values: Object) {
    if (this.form.valid) {
      const email = this.form.get(['email']).value;
      const password = this.form.get(['password']).value;
      try {
        const user = await this.sessionS.auth({ email, password });
        console.log('user', user);
        this.router.navigate(['/']);
      } catch (error) {
        console.log('error', error);
        this.openDialog();
      }
    }
  }

}
