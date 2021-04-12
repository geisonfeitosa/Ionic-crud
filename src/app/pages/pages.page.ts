import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  title: String;

  public appPages = [
    { title: 'Perfil', url: '/pages/perfil', icon: 'person-circle' },
    { title: 'Salas', url: '/pages/sala', icon: 'pricetag' },
    { title: 'Embarcados', url: '/pages/embarcado', icon: 'hardware-chip' },
    { title: 'Sair', url: '/authentication/login', icon: 'exit' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.title = this.activatedRoute.snapshot.routeConfig.children.filter(i => i.path == this.router.url.replace("/pages/", "")).map(i => i.data.title)[0];
    });
  }

}
