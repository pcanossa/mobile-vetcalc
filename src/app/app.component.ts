// src/app/app.component.ts

// CORREÇÃO 1: Adicionar os imports que faltavam
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'; // <-- Import do Platform que estava faltando
import { AdMob } from '@capacitor-community/admob';

// CORREÇÃO 2: O decorador @Component que havia sumido
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // A injeção do Platform agora vai funcionar, pois ele foi importado
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    // Espera a plataforma estar pronta
    await this.platform.ready();

    // Inicializa o AdMob
    AdMob.initialize({
      // CORREÇÃO 3: A opção 'requestTrackingAuthorization' foi removida
      // pois não é reconhecida pela sua versão do plugin, causando o erro.
      // É uma opção específica para iOS que podemos deixar de fora por enquanto.
      initializeForTesting: true,
    });
  }
}
