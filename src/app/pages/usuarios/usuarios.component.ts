import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getUsers().toPromise().then(res => {
      console.log(res.data);
      this.usuarios = res.data;
    });
  }

}
