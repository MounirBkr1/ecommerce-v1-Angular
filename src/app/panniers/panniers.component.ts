import { Component, OnInit } from '@angular/core';
import {PannierService} from "../services/pannier.service";

@Component({
  selector: 'app-panniers',
  templateUrl: './panniers.component.html',
  styleUrls: ['./panniers.component.css']
})
export class PanniersComponent implements OnInit {

  constructor(public pannierService:PannierService) { }

  ngOnInit(): void {
  }

}
